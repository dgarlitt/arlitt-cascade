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
	{ id: 111, name: 'Austin', county_id: 15 },
	{ id: 112, name: 'Lago Vista', county_id: 15 },
	{ id: 113, name: 'Fredericksburg', county_id: 15 }
]

var people = [
	{ id: 1000, name: 'David Griner', city_id: 100 } ,
	{ id: 1001, name: 'David Wright', city_id: 100 } ,
	{ id: 1002, name: 'Evan Keller', city_id: 101 } ,
	{ id: 1003, name: 'Beth Keller', city_id: 102 } ,
	{ id: 1004, name: 'John from Space Phx', city_id: 102 } ,
	{ id: 1005, name: 'Hilary Buccholz', city_id: 102 } ,
	{ id: 1006, name: 'Marty Karabin', city_id: 102 } ,
	{ id: 1007, name: 'Jaime Gange', city_id: 103 } ,
	{ id: 1008, name: 'Dennis Dague', city_id: 103 } ,
	{ id: 1009, name: 'Steve Dison', city_id: 103 } ,
	{ id: 1010, name: 'Holly Dison', city_id: 103 } ,
	{ id: 1011, name: 'Andrew Schwartzberg', city_id: 103 } ,
	{ id: 1012, name: 'Phoenix Rock Gym', city_id: 103 } ,
	{ id: 1013, name: 'Steve', city_id: 104 } ,
	{ id: 1014, name: 'AZ on the Rocks', city_id: 104 } ,
	{ id: 1015, name: 'Phyllis Mulhollan', city_id: 104 } ,
	{ id: 1016, name: 'Jerrell Mulhollan', city_id: 104 } ,
	{ id: 1017, name: 'AZ on the Rocks', city_id: 104 } ,
	{ id: 1018, name: 'Pat Wilson', city_id: 105 } ,
	{ id: 1019, name: 'Pam Wilson', city_id: 105 } ,
	{ id: 1020, name: 'Daniel Arlitt', city_id: 106 } ,
	{ id: 1021, name: 'Helen Palmaira', city_id: 106 } ,
	{ id: 1022, name: 'Walt Kimbrough', city_id: 107 } ,
	{ id: 1023, name: 'Alex Kimbrough', city_id: 107 } ,
	{ id: 1024, name: 'Patrick Kimbrough', city_id: 107 } ,
	{ id: 1025, name: 'Eddie Espinosa', city_id: 107 } ,
	{ id: 1026, name: 'Michelle Marchesano-Brown', city_id: 107 } ,
	{ id: 1027, name: 'Ryan Harris', city_id: 108 } ,
	{ id: 1028, name: 'Betsy Harris', city_id: 108 } ,
	{ id: 1029, name: 'Pat Wilson', city_id: 109 } ,
	{ id: 1030, name: 'Bud Arlitt', city_id: 109 } ,
	{ id: 1031, name: 'Nicole Arlitt', city_id: 109 } ,
	{ id: 1032, name: 'Ken Billings', city_id: 109 } ,
	{ id: 1033, name: 'Lacey Hart', city_id: 110 } ,
	{ id: 1034, name: 'Meredith Hart', city_id: 110 } ,
	{ id: 1035, name: 'Kris Billings', city_id: 111 } ,
	{ id: 1036, name: 'Travis Huber', city_id: 111 } ,
	{ id: 1037, name: 'Juan Ramirez', city_id: 111 } ,
	{ id: 1038, name: 'Jenny Reed', city_id: 113 } ,
	{ id: 1039, name: 'Bevel James', city_id: 113 } ,
	{ id: 1040, name: 'Colonol Nesbitt', city_id: 113 } ,
	{ id: 1041, name: 'Opa\'s Sausage', city_id: 113 } ,
]

var reduce = function(id_arr, el_arr, match_property) {
	var output = [];
	
	if ( id_arr.length == 0 ) {
		output = el_arr;
	} else {
		for ( var i = 0; i < el_arr.length; i++ ) {
			for ( var j = 0; j < id_arr.length; j++ ) {
				if ( el_arr[i][match_property] == id_arr[j] ) {
					output.push( el_arr[i] );
				}
			}
		}
	}
	
	if ( output.length == 0 ) {
		console.log( output );
		return output;
	}
	
	return output.sort( function(a, b) {
			var name_a = a.name.toLowerCase() ,
				name_b = b.name.toLowerCase()
			;
			
			if ( name_a > name_b ) {
				return 1;
			} else if ( name_a < name_b ) {
				return -1;
			} else {
				if ( a.id > b.id ) {
					return 1;
				} else if ( a.id < b.id ) {
					return -1;
				}
				return 0;
			}
			
		} );
}

var jsonResponse = function( response, output ) {
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.write( JSON.stringify(output) );
	response.end();
}

var htmlResponse = function( response, output ) {
	response.writeHead(200, {
		"Content-Type": "text/html"
	});
	response.write( output );
	response.end();
}

function upload(response, postData, query) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.write("Hello Upload");
	response.end();
}

function getStates( request, response, params ) {
	jsonResponse( response, states );
}

function getCounties( request, response, params ) {
	var query = params.URL.query;
	var output = [];
	var id_arr = [];
	
	if ( query.ids && query.ids != "" ) {
		var id_arr = query.ids.split(',');
	}
	
	jsonResponse( response, reduce( id_arr, counties, 'state_id' ) );
}

function getCities( request, response, params ) {
	var query = params.URL.query;
	var output = [];
	var id_arr = [];
	
	if ( query.ids && query.ids != "" ) {
		var id_arr = query.ids.split(',');
	}
	
	jsonResponse( response, reduce( id_arr, cities, 'county_id' ) );
}

function getPeople( request, response, params ) {
	var query = params.URL.query;
	var output = [];
	var id_arr = [];
	
	if ( query.ids && query.ids != "" ) {
		var id_arr = query.ids.split(',');
	}
	
	jsonResponse( response, reduce( id_arr, people, 'city_id' ) );
}

exports.upload = upload;
exports.getStates = getStates;
exports.getCounties = getCounties;
exports.getCities = getCities;
exports.getPeople = getPeople;