var express = require('express');
var app = express();
var request = require('request');
var xml2js = require('xml2js');


// xml2js parser instance
var parser = new xml2js.Parser();

var tab = [];
var json;
var urls = [
    {link: 'http://www.lemonde.fr/rss/une.xml', key: 'fr' },
    {link: 'http://www.leparisien.fr/faits-divers/rss.xml', key: 'fr' },
    {link: 'http://www.lemonde.fr/m-actu/rss_full.xml', key: 'fr' },
    {link: 'http://www.leparisien.fr/actualites-a-la-une.rss.xml', key: 'fr' },
    {link: 'http://store.steampowered.com/feeds/news.xml', key: 'fr' },
    {link: 'http://www.jeuxvideo.com/rss/rss.xml', key: 'fr' },
    {link: 'http://www.nba.com/rss/nba_rss.xml', key: 'fr' },
    //{link: 'http://rss.lefigaro.fr/lefigaro/laune', key: 'fr' }
];

function parseUrl(url) {
    //console.log("parse :", url, count++ );
    request.get(url, function(error, request, body) {
        // Parse XML data from body
        //console.log("request :", url);
        parser.parseString(body, function(err, parsedXml) {
            try {
                console.log(url);
                json = JSON.parse(JSON.stringify(parsedXml));

                ////var _path_ = json.rss.channel[0];
                //
                //tab.push({
                //    press: url,
                //    desc: _path_.description[0],
                //    data: _path_.item,
                //    title: _path_.title[0]
                //});
                if ( url == "http://store.steampowered.com/feeds/news.xml") {
                    tab.push({
                        press: url,
                        data: json,
                        keys: {['actu']: {} }
                    });
                } else {
                    tab.push({
                        press: url,
                        data: json,
                        keys: {['other']: {} }
                    });
                }
                //
            } catch(e) {
                console.log('Character not found');
            }
        });
    });
}

var max = urls.length-1;
console.log("max =", max);
for ( var i = 0; i<= max; i++) {
    //console.log("urls=", urls[i].link);
    parseUrl(urls[1].link);
}



/** REST  **/
app.get('/test', function(request,response){
    console.log("tab length", tab.length);
    response.render('index.ejs',{todolist: tab});
});

app.listen(8080);
