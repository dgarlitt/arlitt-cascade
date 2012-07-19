var exec = require("child_process").exec ,
	querystring = require("querystring") ,
	fs = require('fs');

var states = [
	{ id: 1, name: 'Alabama' },
	{ id: 2, name: 'Arizona' },
	{ id: 3, name: 'California' },
	{ id: 4, name: 'Texas' }
]

var counties = [
	{ id: 10, name: 'Jefferson', state_id: 1 },
	{ id: 11, name: 'Maricopa', state_id: 2 },
	{ id: 12, name: 'Los Angeles', state_id: 3 },
	{ id: 13, name: 'Ventura', state_id: 3 },
	{ id: 14, name: 'Midland', state_id: 4 },
	{ id: 15, name: 'Travis', state_id: 4 }
]

var cities = [
	{ id: 100, name: 'Birmingham', county_id: 10 },
	{ id: 101, name: 'Leeds', county_id: 10 },
	{ id: 102, name: 'Phoenix', county_id: 11 },
	{ id: 103, name: 'Tempe', county_id: 11 },
	{ id: 104, name: 'Scottsdale', county_id: 11 },
	{ id: 105, name: 'Canoga Park', county_id: 12 },
	{ id: 106, name: 'West Hills', county_id: 12 },
	{ id: 107, name: 'Thousand Oaks', county_id: 13 },
	{ id: 108, name: 'Agoura Hills', county_id: 13 },
	{ id: 109, name: 'Midland', county_id: 14 },
	{ id: 110, name: 'Greenwood', county_id: 14 },
	{ id: 109, name: 'Austin', county_id: 15 },
	{ id: 110, name: 'Lago Vista', county_id: 15 },
	{ id: 109, name: 'Fredericksburg', county_id: 15 }
]

var reduce = function(id_arr, el_arr, match_property) {
	var output = [];
	
	if ( id_arr.length == 0 ) {
		return el_arr;
	} else {
		for ( var i = 0; i < el_arr.length; i++ ) {
			for ( var j = 0; j < id_arr.length; j++ ) {
				if ( el_arr[i][match_property] == id_arr[j] ) {
					output.push( el_arr[i] );
				}
			}
		}
		
		return output;
	}
}

var jsonResponse = function(response, output) {
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.write( JSON.stringify(output) );
	response.end();
}

var htmlResponse = function(response, output) {
	response.writeHead(200, {
		"Content-Type": "text/html"
	});
	response.write( output );
	response.end();
}

var index = function(response) {
	fs.readFile('./index.html', function( err, data ) {
		if ( err ) {
			throw err;
		}
		htmlResponse(response, data);
	});
}

function start(response, postData, query) {
	console.log("Request handler 'start' was called.");

	exec("find /", {
		timeout: 10000,
		maxBuffer: 20000 * 1024
	}, function(error, stdout, stderr) {
		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.write(stdout);
		response.end();
	});
}

function upload(response, postData, query) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.write("Hello Upload");
	response.end();
}

function getStates(response, postData, query) {
	jsonResponse( response, states );
}

function getCounties(response, postData, query) {
	var output = [];
	var id_arr = [];
	
	if ( query.state_ids && query.ids != "" ) {
		var id_arr = query.state_ids.split(',');
	}
	
	jsonResponse( response, reduce( id_arr, counties, 'state_id' ) );
}

function getCities(response, postData, query) {
	var output = [];
	var id_arr = [];
	
	if ( query.county_ids && query.county_ids != "" ) {
		var id_arr = query.ids.split(',');
	}
	
	jsonResponse( response, reduce( id_arr, cities, 'county_id' ) );
}

function getPeople(response, postData, query) {
	var output = [];
	var id_arr = [];
	
	if ( query.city_ids && query.city_ids != "" ) {
		var id_arr = query.ids.split(',');
	}
	
	jsonResponse( response, reduce( id_arr, people, 'city_id' ) );
}

exports.index = index;
exports.start = start;
exports.upload = upload;
exports.getStates = getStates;
exports.getCounties = getCounties;
exports.getCities = getCities;
exports.getPeople = getPeople;