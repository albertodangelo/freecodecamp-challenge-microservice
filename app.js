var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/:unixOrDate', function (req,res,next) {
	
	var unixOrDate = req.params.unixOrDate;

	if(isNaN(unixOrDate)) {

		var dateNormal = formatDateGerman(new Date(unixOrDate).toLocaleDateString("en-us"));
		var dateUnix = new Date(unixOrDate).getTime()/1000;

	} else {

		var dateUnix = unixOrDate
		var dateNormal = formatDateGerman(new Date(unixOrDate*1000).toLocaleDateString("en-us"));

	}
	

	function formatDateGerman(date) {
		var split = date.split('/');

		if(split[0] === undefined ||split[1] === undefined ||split[2] === undefined ){

			res.end(JSON.stringify({"unix":null, "natural":null}));
			
		}
		var months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
		return split[1] + ". " + months[split[0]-1] + " " +split[2]; 
	}
	
	res.end(JSON.stringify({"unix":dateUnix, "natural":dateNormal}));
});



app.listen(3000, function () {
	console.log("gestartet");
});

