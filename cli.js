#!/usr/bin/env node

//Grab provided args
const [,, ...args] = process.argv

const c = require('./index');
const allowArray = ['create:component', 'create:page', 'create:layout','create:route', 'create:config', 'update:routes', 'setup', 'reset'];
if( typeof args['0'] !== 'undefined'){
	switch (args['0']){
		case 'create:page': 
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				if( typeof args['1'] !== 'undefined'){
					c.createComponent('src/pages/', args['1']);
					c.createPageContent('src/layouts/', args['1']);
				}
				else{
					console.log('Error!');
					return false;
				}
				c.createRoute(args['1']);
				return true;
			}
			break;
		case 'create:component': 
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				if( typeof args['1'] !== 'undefined'){
					if( typeof args['2'] !== 'undefined'){
						c.createComponent(args['2'], args['1']);
					}
					else{
						c.createComponent('src/components/', args['1']);
					}
				}
				else{
					console.log('Error!');
					return false;
				}
				return true;
			}

		 break;
		case 'create:layout' :
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				if( typeof args['1'] !== 'undefined'){
					c.createLayout('src/layouts/', args['1']);
				}
				else{
					console.log('Error!');
					return false;
				}
				return true;
			}
		break;
		case 'create:route' :
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				if( typeof args['1'] !== 'undefined'){
					c.createRoute(args['1']);
				}
				else{
					console.log('Error!');
					return false;
				}
				return true;
			}
		break;
		case 'create:config' :
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				if( typeof args['1'] !== 'undefined'){
					c.createConfig(args['1']);
				}
				else{
					console.log('Error!');
					return false;
				}
				return true;
			}
		break;
		case 'update:routes' :
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				
				c.updateRoutes();
				
				return true;
			}
		break;
		case 'setup' :
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				
				c.setup();
				`npm install node-sass`;
				return true;
			}
		break;
		case 'reset' :
			if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
				
				c.resetAll();
				return true;
			}
		break;
		default: 
			console.log('Invalid syntax!');
			return false;
	}
}
console.log('Invalid command!');
return false;