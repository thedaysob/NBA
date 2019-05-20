const cors = "https://cors-anywhere.herokuapp.com/";
const nbaTeams = [
	{triCode : "ATL", city: "Atlanta", teamName: "Hawks"},
	{triCode : "BOS", city: "Boston", teamName: "Celtics"},
	{triCode : "BKN", city: "Brooklyn", teamName: "Nets"},
	{triCode : "CHA", city: "Charlotte", teamName: "Hornets"},
	{triCode : "CHI", city: "Chicago", teamName: "Bulls"},
	{triCode : "CLE", city: "Cleveland", teamName: "Nets"},
	{triCode : "DAL", city: "Dallas", teamName: "Mavericks"},
	{triCode : "DEN", city: "Denver", teamName: "Nuggets"},
	{triCode : "DET", city: "Detroit", teamName: "Pistons"},
	{triCode : "GSW", city: "Golden State", teamName: "Warriors"},
	{triCode : "HOU", city: "Houston", teamName: "Rockets"},
	{triCode : "IND", city: "Indiana", teamName: "Pacers"},
	{triCode : "LAC", city: "Los Angeles", teamName: "Clippers"},
	{triCode : "LAL", city: "Los Angeles", teamName: "Lakers"},
	{triCode : "MEM", city: "Memphis", teamName: "Grizzlies"},
	{triCode : "MIA", city: "Miami", teamName: "Heat"},
	{triCode : "MIL", city: "Milwaukee", teamName: "Bucks"},
	{triCode : "MIN", city: "Minnesota", teamName: "Timberwolves"},
	{triCode : "NOP", city: "New Orleans", teamName: "Pelicans"},
	{triCode : "NYK", city: "New York", teamName: "Knicks"},
	{triCode : "OKC", city: "Oklahoma City", teamName: "Thunder"},
	{triCode : "ORL", city: "Orlando", teamName: "Magic"},
	{triCode : "PHI", city: "Philadelphia", teamName: "76ers"},
	{triCode : "PHX", city: "Phoneix", teamName: "Suns"},
	{triCode : "POR", city: "Portland", teamName: "Blazers"},
	{triCode : "SAC", city: "Sacramento", teamName: "Kings"},
	{triCode : "SAS", city: "San Antonio", teamName: "Spurs"},
	{triCode : "TOR", city: "Portland", teamName: "Blazers"},
	{triCode : "UTA", city: "Utah", teamName: "Jazz"},
	{triCode : "WAS", city: "Washington", teamName: "Wizards"},
]

//Gets information of the team
function getTeams() {
	return new Promise(resolve=> {
		var data;
		var request = new XMLHttpRequest();
		request.open('GET', cors + 'http://data.nba.net/data/10s/prod/v1/2018/teams.json', true);
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

async function scoreBoard() {
	console.log("new data");
	let scores = await getCurrentGames();
	displayScores(scores);
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
		var request = new XMLHttpRequest();
		request.open('GET', cors + 'http://data.nba.net/data/10s/prod/v1/'+date+'/scoreboard.json', true);
		request.send();
		request.onload = function() {
			if (request.readyState == 4 && request.status == 200) {
				theData = request.responseText;
				data = JSON.parse(theData);
				scores = gameScores(data);
				resolve(scores);
			}
		}
	})
}

//Gets stats of team that are playing live
function gameScores(data) {
	numGames = data.numGames;
	var scores = new Array();
	index = 0;
	for (i = 0; i < numGames; i++) {
		game = data.games[0];
		score = { "live":game.isGameActivated, "startTime":game.startTimeEastern, "homeTeam":game.hTeam, "awayTeam":game.vTeam
		, "clock":game.clock };
		scores.push(score);
	}
	return scores;
}

function displayScores(scores) {
	var isLive;
	var clock;
	var numTeams = nbaTeams.length;
	for (i = 0; i < scores.length; i++) {
		hTriCode = scores[i].homeTeam.triCode;
		vTriCode = scores[i].awayTeam.triCode;
		if (scores[i].live == true) {
			homeTeamScore = scores[i].homeTeam.score;
			awayTeamScore = scores[i].awayTeam.score;
			clock = scores[i].clock
			isLive = "Game is live";
		} else {
			homeTeamScore = 0;
			awayTeamScore = 0;
			clock = '--'
			isLive = "Game starts at " + scores[i].startTime;
		}
		for (j = 0; j < numTeams; j++) {
			if (hTriCode == nbaTeams[j].triCode) {
				homeTeamName = nbaTeams[j].city + " " + nbaTeams[j].teamName;
			}
			if (vTriCode == nbaTeams[j].triCode) {
				awayTeamName = nbaTeams[j].city + " " + nbaTeams[j].teamName;
			}
		}

		document.getElementById("scoreBoard").innerHTML = (isLive + "<br />" + homeTeamName + ": " + homeTeamScore + "<br />" + 
			awayTeamName + ": " + awayTeamScore + "<br />" + "Game Clock: " + clock + "<br />");
	}
}