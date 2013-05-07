var querystring = require("querystring");
var fs = require("fs");
var sys = require('sys');
var formidable = require("formidable");

function start(response){
	console.log("Request handler 'start' was called");
        var body = '<html>'+
                    '<head>'+
                            '<meta http-equiv="Content-Type" content="text/html; '+
                            'charset=UTF-8" />'+
                    '</head>'+
                    '<body>'+
                    '<form action="/upload" enctype="multipart/form-data" method="post">'+
			'<input type="file" name="upload">'+
			'<input type="submit" value="Upload file" />'+
			'</body>'+
	               '</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}
function upload(response,request){
	console.log("Request handler 'upload' was called");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
	    /* Possible error on Windows systems:tried to rename to an already existing file */
	   /*response.writeHead(200, {'content-type': 'text/plain'});
           response.write('received upload:\n\n');
	   response.end(sys.inspect({fields: fields, files: files}));*/
	   fs.rename(files.upload.path, "/tmp/test.png", function(err) {
	      if (err) {
	        fs.unlink("/tmp/test.png");
	        fs.rename(files.upload.path, "/tmp/test.png");
	      }
	    });
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
	});
	return;
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start	=	start;
exports.upload	=	upload;
exports.show	=	show;

