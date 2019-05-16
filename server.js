const express = require('express')
const app = new express()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const hostname = '127.0.0.1';
var PORT = 3000;

app.get('/', async function(req, res) {
	let data = await getPlayers()
    res.send(data);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

function getPlayers() {
	return new Promise(resolve=> {
		var data;
		var request = new XMLHttpRequest();
		request.open('GET', 'http://data.nba.net/data/10s/prod/v1/2018/teams.json', true);
		request.send();
		console.log('hello');
		request.onload = function() {
			console.log('goodbi');
			if (request.readyState == 4 && request.status == 200) {
				console.log('inside');
				theData = request.responseText;
				console.log(theData);
				data = JSON.parse(theData);
				resolve(data);
			}
		}
	});
}