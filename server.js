const express = require('express')
const app = new express()
const path = require('path')
const cors = require('cors')
app.use(cors())

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const hostname = '127.0.0.1';
var PORT = 3000;

app.use("/static", express.static(path.resolve(__dirname, 'nbaAPI')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, function() {
	var today = new Date();
	var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
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
			var month = '0' + (today.getMonth()+1);
		}
		if ((today.getDate() >= 10)) {
			var day = today.getDate();
		} else {
			var day = '0' + today.getDate();
		}
		var date = today.getFullYear()+''+month+''+day;
		console.log(date);
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
	console.log(numGames);
	var scores = new Array();
	index = 0;
	for (i = 0; i < numGames; i++) {
		game = data.games[0];
		score = { "live":game.isGameActivated, "homeTeam":game.hTeam, "awayTeam":game.vTeam };
		scores.push(score);
	}

	return scores;
}

function displayScores(scores) {
	for (i = 0; i < scores.length; i++) {
		homeTeamName = scores[i].homeTeam.triCode;
		awayTeamName = scores[i].awayTeam.triCode;
		homeTeamScore = score[i].homeTeam.score;
		awayTeamScore = score[i].awayTeam.score;
		score[i].live;
	}
}