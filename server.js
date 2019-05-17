const express = require('express')
const app = new express()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const hostname = '127.0.0.1';
var PORT = 3000;

app.get('/', async function(req, res) {
	let scores = await getCurrentGames();
    res.send(scores);
});

app.listen(PORT, function() {
	var today = new Date();
	var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
	console.log(date);
    console.log('Server is running on PORT:',PORT);
});

//Gets information of the team
function getPlayers() {
	return new Promise(resolve=> {
		var data;
		var request = new XMLHttpRequest();
		request.open('GET', 'http://data.nba.net/data/10s/prod/v1/2018/teams.json', true);
		request.send();
		request.onload = function() {
			if (request.readyState == 4 && request.status == 200) {
				theData = request.responseText;
				data = JSON.parse(theData);
				resolve(data);
			}
		}
	});
}

function getCurrentGames() {
	return new Promise(resolve=> {
		var today = new Date();
		if ((today.getMonth()+1) >= 10) {
			var month = today.getMonth()+1;
		} else {
			var month = '0' + today.getMonth();
		}
		if ((today.getDate() >= 10)) {
			var day = today.getDate();
		} else {
			var day = '0' + today.getDate();
		}
		var date = today.getFullYear()+''+month+''+day;
		var request = new XMLHttpRequest();
		request.open('GET', 'http://data.nba.net/data/10s/prod/v1/'+date+'/scoreboard.json', true);
		request.send();
		request.onload = function() {
			if (request.readyState == 4 && request.status == 200) {
				theData = request.responseText;
				data = JSON.parse(theData);
				scores = liveGameTeam(data);
				resolve(scores);
			}
		}
	})
}

//Gets stats of team that are playing live
function liveGameTeam(data) {
	numGames = data.numGames;
	scores[numGames];
	score;
	index = 0;

	for game in data.games {
		score.live = game.isGameActivated;
		score.homeTeam = game.hTeam;
		score.awayTeam = game.vTeam;
		scores[index] = score;
		index++;
	}

	return scores;
}