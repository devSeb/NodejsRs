var express = require('express');
var app = express();
var request = require('request');
var xml2js = require('xml2js');

// xml2js parser instance
var parser = new xml2js.Parser();

var tab = [];
var json;
var urls = [
	'http://www.lemonde.fr/rss/une.xml',
	'http://www.lemonde.fr/ete/rss_full.xml'
];


function parseUrl(url){
	//console.log("parse :", url, count++ );
    request.get(url, function(error, request, body) {
        // Parse XML data from body
		//console.log("request :", url);
        parser.parseString(body, function(err, parsedXml) {
            try {
                //console.log(JSON.stringify(parsedXml));
				json = JSON.stringify(parsedXml);
				//console.log("add element  :", url );
				tab.push( {press: url, data: JSON.parse(json)} );
            } catch(e) {
                //console.log('Character not found');
            }
        });
    });
}

    var max = 1;
    for ( var i = 0; i<= max-1; i++) {
        parseUrl(urls[0]);
    }
	
    app.get('/test', function(request,response){
        console.log("tab length", tab.length);
        response.render('index.ejs',{todolist: tab});
    });

    app.listen(8080);