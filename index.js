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
		console.log(error);
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
  var template = handlebars.compile(source, {noEscape: true});
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

const createLayout = (dir, layoutName)=>{
	createDir('/'+dir+layoutName);
	createComponent(dir+layoutName+'/', 'Body');
	createComponent(dir+layoutName+'/', 'Header');
	createComponent(dir+layoutName+'/', 'Footer');
	createComponent(dir+layoutName+'/', 'Sidebar');
}
exports.createLayout = createLayout;
const createRoute = (componentName) => {
	createDir('/src/routes');
	createFileFromTemplate(path.join(__dirname, '/templates/route.hbs'), 'src/routes/'+componentName+'s.js', componentName);
}
exports.createRoute = createRoute;

const createConfig = (configName) => {
	createDir('/src/config');
	createFileFromTemplate(path.join(__dirname, '/templates/config.hbs'), 'src/config/'+configName+'.js',configName);
}
exports.createConfig = createConfig;
const setup = () => {
	createConfig('config');
	createComponent('src/components/','Component1');
	createLayout('src/layouts/', 'default');
	createComponent('src/pages/', 'Page1');
	createRoute('Page1');
	updateRoutes();
	createMainFile();
}
exports.setup = setup;

const createMainFile = () => {
	createFileFromTemplate(path.join(__dirname, '/templates/index.hbs'), 'src/index.js', 'index');
	createFileFromTemplate(path.join(__dirname, '/templates/app.hbs'), 'src/App.js', 'App');
	createFileFromTemplate(path.join(__dirname, '/templates/configureStore.hbs'), 'src/config/configureStore.js', 'configStore');
	createDir('/src/reducers');
	createFileFromTemplate(path.join(__dirname, '/templates/reducers.hbs'), 'src/reducers/reducers.js', 'reducers');
	createFileFromTemplate(path.join(__dirname, '/templates/themeoptions.hbs'), 'src/reducers/ThemeOptions.js', 'ThemeOptions');

}
exports.createMainFile = createMainFile;
const updateRoutes = () => {
	//joining path of directory 
	const directoryPath = 'src/routes';
	//passsing directoryPath and callback function
	fs.readdir(directoryPath, function (err, files) {
	    //handling error
	    if (err) {
	        return console.log('Unable to scan directory: ' + err);
	    } 
	    var routesImport = '';
	    var routesList = '';
	    var fileE = '';
	    //listing all files using forEach
	    files.forEach(function (file) {
	        if( file !='MainRoutes.js'){
	        	 fileE = file.split('.');
	        	routesImport +=' const '+fileE[0]+ ' = lazy(() => import('+"'./"+fileE[0]+"'));\n";
	        	routesList += '<Suspense fallback={ <div className="loader-container"><div className="loader-inner">Loadding... </div></div>}> <Route path="/'+fileE[0].toLowerCase()+'" component={'+fileE[0]+'} /></Suspense>\n';
	        }
	    });
	    var jsonData = {
	    	'routesImport': routesImport,
	    	'routesList': routesList
	    }
	    var filePath = 'src/routes/MainRoutes.js';
	    fs.readFile(path.join(__dirname, '/templates/mainroutes.hbs'), function(err, data){
			  if (!err) {
			    // make the buffer into a string
			    var source = data.toString();
			    // call the render function
			    var mainContent =  renderToString(source, jsonData);
			    createFile(filePath, mainContent);
			    return true;
			  } else {
			    return false;
			  }
		});
	});
}
exports.updateRoutes = updateRoutes;
