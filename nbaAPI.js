
function getPlayers() {
	return new Promise(resolve => {
		var request = new XMLHttpRequest();
		request.open('GET', 'http://data.nba.net/data/10s/prod/v1/2018/teams.json', true);

		request.onload = function () {
			var data = JSON.parse(this.response);
		}
		resolve(data);
	});
}