var fs 			= require( 'fs' ) ,
	handlers 	= require( './_requestHandlers' )
;

var handle = {
	"/upload"	: handlers.upload ,
	"/states"	: handlers.getStates ,
	"/counties"	: handlers.getCounties ,
	"/cities"	: handlers.getCities ,
	"/people"	: handlers.getPeople
};

var respond = function( response, custom_options ) {
	var options = {
		response_code : 200 ,
		content_type : 'text/html' ,
		encoding : 'utf8' ,
		content : ''
	}
	
	options.extend( custom_options );
	
	response.writeHead( options.response_code, {
		'Content-Type' : options.content_type
	});
	
	response.end( options.content, options.encoding );
}

var route = function( request, response, params ) {
	
	var FILE = params.FILE;
	var URL = params.URL;
	var FORM = params.FORM;
	
	if ( typeof handle[URL.pathname] === 'function' ) {
		
		handle[URL.pathname]( request, response, params );
		
	} else {
		
		if ( FILE.ext == '' ) {
			if ( FILE.path.charAt( FILE.path.length - 1 ) != '/' ) {
				FILE.path += '/';
			}
			
			FILE.path += 'index.html';
		}
		
		fs.exists( FILE.path, function(exists) {
			
			if ( exists ) {
				
				fs.readFile( FILE.path, function( error, content ) {
					if ( error ) {
						respond( response, {
							response_code : 500 ,
							content : '500 SERVER ERROR: An error occurred while handling your request'
						});
						
					} else {
						respond( response, { content : content, custom : 'hey' } );
					}
				});
			
			} else {
				
				console.log( '404 Error: ' + FILE.request_path );
				
				respond( response, {
					response_code : 404 ,
					content : '404 ERROR: The requested page could not be found: ' + FILE.request_path
				});
				
			}
			
		});
	
	}
		
}

exports.route = route;