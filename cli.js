#!/usr/bin/env node

//Grab provided args
const [,, ...args] = process.argv

const c = require('./index');
const allowArray = ['component', 'page', 'layout','route'];
if( typeof args['0'] !== 'undefined'){
	if( allowArray.indexOf(args['0'].toLowerCase()) != -1 ){
		if( typeof args['1'] !== 'undefined'){
			if( args['0'].toLowerCase() == 'route'){
				c.createRoute(args['1']);
			}
			else{
				c.createComponent('src/'+args['0']+'s'+'/', args['1']);
			}
		}
		else{
			console.log('Error!');
			return false;
		}
		if( args['0'].toLowerCase() == 'page'){
			c.createRoute(args['1']);
		}
		return true;
	}
}
console.log('Error!');
return false;