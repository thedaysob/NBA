const cors = "https://cors-anywhere.herokuapp.com/";
const nbaTeams = [
	{triCode : "ATL", city: "Atlanta", teamName: "Hawks", logo: "http://content.sportslogos.net/logos/6/220/full/9168_atlanta_hawks-primary-2016.png"},
	{triCode : "BOS", city: "Boston", teamName: "Celtics", logo: "http://content.sportslogos.net/logos/6/213/full/slhg02hbef3j1ov4lsnwyol5o.png"},
	{triCode : "BKN", city: "Brooklyn", teamName: "Nets", logo: "http://content.sportslogos.net/logos/6/3786/full/137_brooklyn-nets-primary-2013.png"},
	{triCode : "CHA", city: "Charlotte", teamName: "Hornets", logo: "http://content.sportslogos.net/logos/6/5120/full/1926_charlotte__hornets_-primary-2015.png"},
	{triCode : "CHI", city: "Chicago", teamName: "Bulls", logo: "http://content.sportslogos.net/logos/6/221/full/hj3gmh82w9hffmeh3fjm5h874.png"},
	{triCode : "CLE", city: "Cleveland", teamName: "Cavaliers", logo: "http://content.sportslogos.net/logos/6/222/full/6921_cleveland_cavaliers-primary-2018.png"},
	{triCode : "DAL", city: "Dallas", teamName: "Mavericks", logo: "http://content.sportslogos.net/logos/6/228/full/3463_dallas_mavericks-primary-2018.png"},
	{triCode : "DEN", city: "Denver", teamName: "Nuggets", logo: "http://content.sportslogos.net/logos/6/229/full/8926_denver_nuggets-primary-2019.png"},
	{triCode : "DET", city: "Detroit", teamName: "Pistons", logo: "http://content.sportslogos.net/logos/6/223/full/2164_detroit_pistons-primary-2018.png"},
	{triCode : "GSW", city: "Golden State", teamName: "Warriors", logo: "http://content.sportslogos.net/logos/6/235/full/qhhir6fj8zp30f33s7sfb4yw0.png"},
	{triCode : "HOU", city: "Houston", teamName: "Rockets", logo: "http://content.sportslogos.net/logos/6/230/full/8xe4813lzybfhfl14axgzzqeq.gif"},
	{triCode : "IND", city: "Indiana", teamName: "Pacers", logo: "http://content.sportslogos.net/logos/6/224/full/4812_indiana_pacers-primary-2018.png"},
	{triCode : "LAC", city: "Los Angeles", teamName: "Clippers", logo: "http://content.sportslogos.net/logos/6/236/full/5462_los_angeles_clippers-primary-2016.png"},
	{triCode : "LAL", city: "Los Angeles", teamName: "Lakers", logo: "http://content.sportslogos.net/logos/6/237/full/uig7aiht8jnpl1szbi57zzlsh.png"},
	{triCode : "MEM", city: "Memphis", teamName: "Grizzlies", logo: "http://content.sportslogos.net/logos/6/231/full/4373_memphis_grizzlies-primary-2019.png"},
	{triCode : "MIA", city: "Miami", teamName: "Heat", logo: "http://content.sportslogos.net/logos/6/214/full/burm5gh2wvjti3xhei5h16k8e.gif"},
	{triCode : "MIL", city: "Milwaukee", teamName: "Bucks", logo: "http://content.sportslogos.net/logos/6/225/full/8275_milwaukee_bucks-primary-2016.png"},
	{triCode : "MIN", city: "Minnesota", teamName: "Timberwolves", logo: "http://content.sportslogos.net/logos/6/232/full/9669_minnesota_timberwolves-primary-2018.png"},
	{triCode : "NOP", city: "New Orleans", teamName: "Pelicans", logo: "http://content.sportslogos.net/logos/6/4962/full/2681_new_orleans_pelicans-primary-2014.png"},
	{triCode : "NYK", city: "New York", teamName: "Knicks", logo: "http://content.sportslogos.net/logos/6/216/full/2nn48xofg0hms8k326cqdmuis.gif"},
	{triCode : "OKC", city: "Oklahoma City", teamName: "Thunder", logo: "http://content.sportslogos.net/logos/6/2687/full/khmovcnezy06c3nm05ccn0oj2.png"},
	{triCode : "ORL", city: "Orlando", teamName: "Magic", logo: "http://content.sportslogos.net/logos/6/217/full/wd9ic7qafgfb0yxs7tem7n5g4.gif"},
	{triCode : "PHI", city: "Philadelphia", teamName: "76ers", logo: "http://content.sportslogos.net/logos/6/218/full/7034_philadelphia_76ers-primary-2016.png"},
	{triCode : "PHX", city: "Phoneix", teamName: "Suns", logo: "http://content.sportslogos.net/logos/6/238/full/4370_phoenix_suns-primary-2014.png"},
	{triCode : "POR", city: "Portland", teamName: "Blazers", logo: "http://content.sportslogos.net/logos/6/239/full/9725_portland_trail_blazers-primary-2018.png"},
	{triCode : "SAC", city: "Sacramento", teamName: "Kings", logo: "http://content.sportslogos.net/logos/6/240/full/4043_sacramento_kings-primary-2017.png"},
	{triCode : "SAS", city: "San Antonio", teamName: "Spurs", logo: "http://content.sportslogos.net/logos/6/233/full/2547_san_antonio_spurs-primary-2018.png"},
	{triCode : "TOR", city: "Toronto", teamName: "Raptors", logo: "http://content.sportslogos.net/logos/6/227/full/4578_toronto_raptors-primary-2016.png"},
	{triCode : "UTA", city: "Utah", teamName: "Jazz", logo: "http://content.sportslogos.net/logos/6/234/full/6749_utah_jazz-primary-2017.png"},
	{triCode : "WAS", city: "Washington", teamName: "Wizards", logo: "http://content.sportslogos.net/logos/6/219/full/5671_washington_wizards-primary-2016.png"},
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
		} else {
			homeTeamScore = 0;
			awayTeamScore = 0;
			clock = '--';
			isLive = "Game starts at " + scores[i].startTime;
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
		document.getElementById("scoreBoard"+i).innerHTML = (isLive + "<br />" + "<img src=" + homeTeamLogo + "width=\"128\" height=\"128\">" + " " 
			+ "<img src=" + awayTeamLogo + "width=\"128\" height=\"128\">" + "<br />" + homeTeamName + ": " + homeTeamScore + "<br />" + 
			awayTeamName + ": " + awayTeamScore + "<br />" + "Quater: " + scores[i].period.current + "<br /> Game Clock: " + clock + "<br />");
	}
}