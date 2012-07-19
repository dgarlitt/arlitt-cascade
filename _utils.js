var getContentTypeByFileExtension = function( ext ) {
	
	var contentType = 'text/html';
	
	switch ( ext ) {
		case '.js':
			contentType = 'text/javascript';
			break;
			
		case '.json':
			contentType = 'application/json';
			break;
			
		case '.css':
			contentType = 'text/css';
			break;
			
		case '.jpg':
		case '.jpeg':
		case '.jpe':
			contentType = 'image/jpeg';
			break;
			
		case '.gif':
			contentType = 'image/gif';
			break;
			
		case '.png':
			contentType = 'image/x-png';
			break;
			
		case '.tif':
		case '.tiff':
			contentType = 'image/tiff';
			break;
		
		case '.pdf':
			contentType = 'application/pdf';
			break;
			
		case '.ico':
			contentType = 'image/x-icon';
			break;
			
		case '.txt':
			contentType = 'text/plain';
			break;
	}
	
	return contentType;
}

exports.getContentTypeByFileExtension = getContentTypeByFileExtension;