// Totals and stats per athlete
var totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var handleHomeButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var parkRunsDiv = document.getElementById('park-runs');
  var runsDiv = document.getElementById('runs');
  var homeDiv = document.getElementById('home');
  var title = document.getElementById('title');
  var weatherForecast = document.getElementById('weather-forecast');
    if (homeDiv.style.display === 'none') {
        parkRunsDiv.style.display = 'none';
        runClubDiv.style.display = 'none';
        runsDiv.style.display = 'none';
        homeDiv.style.display = 'flex';
        title.style.display = 'block';
    }else if (weatherForecast === 'flex' && homeDiv === 'flex'){
      title.style.display = 'none';
    }
}

var renderYearTotals = function(result){
  showDistance(result);
  showTime(result);
  showRuns(result);
}

var showDistance = function(result){
  var yearDistanceDiv = document.getElementById("year-distance");
  var yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(0);
  yearDistanceDiv.innerHTML = yearDistance + " km";
}

var showTime = function(result){
  var yearTimeDiv = document.getElementById("year-time");
  var yearTime = ((result.ytd_run_totals.moving_time)/3600).toFixed();
  yearTimeDiv.innerHTML = yearTime + " hours";
}

var showRuns = function(result){
  var yearRunsDiv = document.getElementById("year-runs");
  var yearRuns = result.ytd_run_totals.count;
  yearRunsDiv.innerHTML = yearRuns + " runs";
}