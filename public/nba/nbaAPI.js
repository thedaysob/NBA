const cors = "https://cors-anywhere.herokuapp.com/";
const nbaTeams = [
	{triCode : "ATL", city: "Atlanta", teamName: "Hawks", logo: "/static/logos/ATL.gif"},
	{triCode : "BOS", city: "Boston", teamName: "Celtics", logo: "/static/logos/BOS.gif"},
	{triCode : "BKN", city: "Brooklyn", teamName: "Nets", logo: "/static/logos/BKN.gif"},
	{triCode : "CHA", city: "Charlotte", teamName: "Hornets", logo: "/static/logos/CHA.gif"},
	{triCode : "CHI", city: "Chicago", teamName: "Bulls", logo: "/static/logos/CHI.gif"},
	{triCode : "CLE", city: "Cleveland", teamName: "Cavaliers", logo: "/static/logos/CLE.gif"},
	{triCode : "DAL", city: "Dallas", teamName: "Mavericks", logo: "/static/logos/DAL.gif"},
	{triCode : "DEN", city: "Denver", teamName: "Nuggets", logo: "/static/logos/DEN.gif"},
	{triCode : "DET", city: "Detroit", teamName: "Pistons", logo: "/static/logos/DET.gif"},
	{triCode : "GSW", city: "Golden State", teamName: "Warriors", logo: "/static/logos/GSW.gif"},
	{triCode : "HOU", city: "Houston", teamName: "Rockets", logo: "/static/logos/HOU.gif"},
	{triCode : "IND", city: "Indiana", teamName: "Pacers", logo: "/static/logos/IND.gif"},
	{triCode : "LAC", city: "Los Angeles", teamName: "Clippers", logo: "/static/logos/LAC.gif"},
	{triCode : "LAL", city: "Los Angeles", teamName: "Lakers", logo: "/static/logos/LAL.gif"},
	{triCode : "MEM", city: "Memphis", teamName: "Grizzlies", logo: "/static/logos/MEM.gif"},
	{triCode : "MIA", city: "Miami", teamName: "Heat", logo: "/static/logos/MIA.gif"},
	{triCode : "MIL", city: "Milwaukee", teamName: "Bucks", logo: "/static/logos/MIL.gif"},
	{triCode : "MIN", city: "Minnesota", teamName: "Timberwolves", logo: "/static/logos/MIN.gif"},
	{triCode : "NOP", city: "New Orleans", teamName: "Pelicans", logo: "/static/logos/NOP.gif"},
	{triCode : "NYK", city: "New York", teamName: "Knicks", logo: "/static/logos/NYK.gif"},
	{triCode : "OKC", city: "Oklahoma City", teamName: "Thunder", logo: "/static/logos/OKC.gif"},
	{triCode : "ORL", city: "Orlando", teamName: "Magic", logo: "/static/logos/ORL.gif"},
	{triCode : "PHI", city: "Philadelphia", teamName: "76ers", logo: "/static/logos/PHI.gif"},
	{triCode : "PHX", city: "Phoneix", teamName: "Suns", logo: "/static/logos/PHX.gif"},
	{triCode : "POR", city: "Portland", teamName: "Blazers", logo: "/static/logos/POR.gif"},
	{triCode : "SAC", city: "Sacramento", teamName: "Kings", logo: "/static/logos/SAC.gif"},
	{triCode : "SAS", city: "San Antonio", teamName: "Spurs", logo: "/static/logos/SAS.gif"},
	{triCode : "TOR", city: "Toronto", teamName: "Raptors", logo: "/static/logos/TOR.gif"},
	{triCode : "UTA", city: "Utah", teamName: "Jazz", logo: "/static/logos/UTA.gif"},
	{triCode : "WAS", city: "Washington", teamName: "Wizards", logo: "/static/logos/WAS.gif"},
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
		score = { "status": game.statusNum, "live":game.isGameActivated, "startTime":game.startTimeEastern, "homeTeam":game.hTeam, "awayTeam":game.vTeam
		, "clock":game.clock, "period":game.period };
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
		} else if (scores[i].status == 1) {
			homeTeamScore = 0;
			awayTeamScore = 0;
			clock = '--';
			isLive = "Game starts at " + scores[i].startTime;
		} else if (scores[i].status == 3) {
			homeTeamScore = scores[i].homeTeam.score;
			awayTeamScore = scores[i].awayTeam.score;
			clock = '--'
			isLive = "Game is over"
		}
		for (j = 0; j < numTeams; j++) {
			if (hTriCode == nbaTeams[j].triCode) {
				homeTeamName = nbaTeams[j].city + " " + nbaTeams[j].teamName;
				homeTeamLogo = nbaTeams[j].logo;
			}
			if (vTriCode == nbaTeams[j].triCode) {
				awayTeamName = nbaTeams[j].city + " " + nbaTeams[j].teamName;
				awayTeamLogo = nbaTeams[j].logo;
			}
		}

		if (scores[i].live == true || scores[i].status == 3) {
			document.getElementById("scoreBoard"+i).innerHTML = (isLive + "<br />" + "<img src=" + homeTeamLogo + " style=\"width:100px;height:72px;\">" + " " 
				+ "<img src=" + awayTeamLogo + " style=\"width:100px;height:72px;\"><br />" + homeTeamName + ": " + homeTeamScore + "<br />" + 
				awayTeamName + ": " + awayTeamScore + "<br />" + "Quater: " + scores[i].period.current + "<br /> Game Clock: " + clock + "<br />" + 
				"<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"collapse\" data-target=\"#bscore" + i + "\">Box Score</button><div id=\"bscore" + i + "\" class=\"collapse\">" +
				"<div class=\"table=responsive\"><table class=\"table table-bordered\"><thead><tr><th>Team Name</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr></thead>" + 
				"<tbody><tr><td>" + homeTeamName + "</td><td>" + scores[i].homeTeam.linescore[0].score + "</td><td>" + scores[i].homeTeam.linescore[1].score + "</td><td>" + scores[i].homeTeam.linescore[2].score + "</td><td>" + scores[i].homeTeam.linescore[3].score + "</td></tr>" + 
				"<tr><td>" + awayTeamName + "</td><td>" + scores[i].awayTeam.linescore[0].score + "</td><td>" + scores[i].awayTeam.linescore[1].score + "</td><td>" + scores[i].awayTeam.linescore[2].score + "</td><td>" + scores[i].awayTeam.linescore[3].score + "</td></tr></tbody></table></div>");
		} else {
			document.getElementById("scoreBoard"+i).innerHTML = (isLive + "<br />" + "<img src=" + homeTeamLogo + " style=\"width:100px;height:72px;\">" + " " 
				+ "<img src=" + awayTeamLogo + " style=\"width:100px;height:72px;\"><br />" + homeTeamName + ": " + homeTeamScore + "<br />" + 
				awayTeamName + ": " + awayTeamScore + "<br />" + "Quater: " + scores[i].period.current + "<br /> Game Clock: " + clock + "<br />" + 
				"<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"collapse\" data-target=\"#bscore" + i + "\">Box Score</button><div id=\"bscore" + i + "\" class=\"collapse\">" +
				"<div class=\"table=responsive\"><table class=\"table table-bordered\"><thead><tr><th>Team Name</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr></thead>" + 
				"<tbody><tr><td>" + homeTeamName + "</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>" + awayTeamName + "</td><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>");
		}
	}
}