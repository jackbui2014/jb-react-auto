'use strict';
var handlebars = require('handlebars');
var fs = require('fs'),
	path = require('path');
const createDir = (dirPath)=>{
	fs.mkdirSync(process.cwd()+dirPath, { recursive: true}, (error)=>{
		if( error){
			console.log('error');
		}
		else{
			console.log('created a directory');
		}
	});
}
exports.createDir = createDir;
const createFile = (filePath, fileContent) => {
	fs.writeFile(filePath, fileContent, (error)=>{
		if( error){
			console.log('error');
		}
		else{
			console.log('created a file');
		}
	});
}
exports.createFile = createFile;

// this will be called after the file is read
const renderToString = (source, data) => {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}
exports.renderToString = renderToString;

const createFileFromTemplate = (templatePath, FilePath, componentName) =>{
	 var jsonData = {
	 	'name': componentName
	 };
	// read the file and use the callback to render
	fs.readFile(templatePath, function(err, data){
		console.log(err);
	  if (!err) {
	    // make the buffer into a string
	    var source = data.toString();
	    // call the render function
	    var mainContent =  renderToString(source, jsonData);
	    createFile(FilePath, mainContent);
	    return true;
	  } else {
	    return false;
	  }
	});

}
exports.createFileFromTemplate = createFileFromTemplate;

const createComponent = (dir, componentName)=>{
	createDir('/'+dir+componentName);
	createFileFromTemplate(path.join(__dirname, '/templates/maincomponentjsfile.hbs'), dir+componentName+'/'+componentName+'.jsx', componentName);
	var pckContent = '{ "main": "'+componentName+'.jsx" } ';
	createFile(dir+componentName+'/package.json', pckContent);
	createFile(dir+componentName+'/'+componentName+'.scss', '');
	createDir('/'+dir+componentName+'/__Test__');
	createFile(dir+componentName+'/__Test__/'+componentName+'.js', '');
	
}
exports.createComponent = createComponent;
const createRoute = (componentName) => {
	createDir('/src/routes');
	createFileFromTemplate(path.join(__dirname, '/templates/route.hbs'), 'src/routes/'+componentName+'s.js', componentName);
}
exports.createRoute = createRoute;
