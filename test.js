var request = require('request');
var cheerio = require('cheerio');
var Twit = require('twit');
var T = new Twit(require('./config.js'));

function tweet(){
	var linePoem = [];
	var url = 'http://poems.com/poem.php?date=';
	var randNum;
	do{
	//console.log("Reassigning");
	randNum = Math.floor((Math.random() * 16333) | 16000);
	}while(randNum > 16333); 
	console.log(randNum);
	request (url + randNum, function(error, response, body){
	if(!error && response.statusCode === 200){
		var $ = cheerio.load(body);
		var poem = $('#poem').text();
		var arrPoem = poem.split("\n");
		var i = 0;
		while ( i < 10){
			
			linePoem[i] = arrPoem[i];
		//	console.log(arrPoem[i]);
		//	console.log(linePoem[i]);
			i++;
		}
	//	console.log('Source:', url + randNum);
		//console.log(poem);
		linePoem = linePoem[4] + "\n" + linePoem[5] +"\n\n" + "Source: " + url + randNum;

	//	console.log("+++++++++++++++++");
		console.log(linePoem);

	if (linePoem.length > 140){
		console.log("Retweeting");
		tweet();
	}
	else{
		
	T.post( 'statuses/update', { status: linePoem } , function(err, reply) {
		if (err) {
			console.log('error', err);
			var check = 0;
			for (check = 0; check < 2; check++){
			console.log("Checking");
			tweet();}
		}
		else {
			console.log('reply:', reply);
		}
	});
	}
	}
	});
}

tweet();


setInterval(function () {
	try{
		tweet();
	}
	catch (e) {
		console.log(e);
	}
}, 60000 * 5);



