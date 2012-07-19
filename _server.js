var http 	= require( 'http' ) ,
	url 	= require( 'url' ) ,
	path 	= require( 'path' ) ,
	router 	= require( './_router.js' ) ,
	utils 	= require( './_utils' )
;

var requestCount = 0;

// this will fire up the server
var start = function( port ) {
	
	// handle the server requests - set up routing
	var on_request = function( request, response ) {
		
		var FILE = '.' + path.normalize(decodeURI(url.parse(request.url).pathname));
		var params = {
				FILE 	: {} ,
				URL 	: url.parse(request.url, true) , // query string accessible via params.URL.query
				FORM 	: "",
			};
		
		params.FILE.web_root = './public';
		params.FILE.request_path = path.normalize(decodeURI(url.parse(request.url).pathname))
		params.FILE.path = params.FILE.web_root + params.FILE.request_path;
		params.FILE.ext = path.extname( params.FILE.path );
		params.FILE.contentType = utils.getContentTypeByFileExtension( FILE.ext );
		
		request.addListener( "data", function(postDataChunk) {
			params.FORM += postDataChunk;
		});
		
		request.addListener( "end", function() {
			console.log( 'Handling request ' + ++requestCount );
			router.route( request, response, params );
		});
		
	}
	
	http.createServer( on_request ).listen( port );
	console.log( 'Server has started on port ' + port );
}

exports.start = start;