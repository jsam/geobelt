var nominatim = require("../").Nominatim;

nominatim.reverse(
	{ lat: 52.9824031826, lon: 10.2833114795, zoom: 5, addressdetail: 1}, 
	function(err, opts, results) {
		console.log(results);
	});