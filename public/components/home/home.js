// Totals and stats per athlete
var totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var handleHomeButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var parkRunsDiv = document.getElementById('park-runs');
  var runsDiv = document.getElementById('runs');
  var homeDiv = document.getElementById('home');
    if (homeDiv.style.display === 'none') {
        parkRunsDiv.style.display = 'none';
        runClubDiv.style.display = 'none';
        runsDiv.style.display = 'none';
        homeDiv.style.display = 'flex';
    }
}

var showDistance = function(result){
  var distanceDiv = document.getElementById("distance");
  var monthDistanceDiv = document.getElementById("month-distance");
  var yearDistanceDiv = document.getElementById("year-distance");
  var totalDistanceDiv = document.getElementById("total-distance");


  var monthDistance = ((result.recent_run_totals.distance)/1000).toFixed(2);
  var yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(2);
  var totalDistance = ((result.all_run_totals.distance)/1000).toFixed(2);

  monthDistanceDiv.innerHTML = "This month: " + monthDistance + "km";
  yearDistanceDiv.innerHTML = "This year: " + yearDistance + "km";
  totalDistanceDiv.innerHTML = "All time: " + totalDistance + "km";
  showTime(result);
}

var showTime = function(result){
  var timeDiv = document.getElementById("time");
  var monthTimeDiv = document.getElementById("month-time");
  var yearTimeDiv = document.getElementById("year-time");
  var totalTimeDiv = document.getElementById("total-time");


  var monthTime = ((result.recent_run_totals.moving_time)/3600).toFixed();
  var yearTime = ((result.ytd_run_totals.moving_time)/3600).toFixed();
  var totalTime = ((result.all_run_totals.moving_time)/3600).toFixed();

  monthTimeDiv.innerHTML = "This month: " + monthTime + "hours";
  yearTimeDiv.innerHTML = "This year: " + yearTime + "hours";
  totalTimeDiv.innerHTML = "All time: " + totalTime + "hours";
  showRuns(result);
}

var showRuns = function(result){
  var runsDiv = document.getElementById("run-count");
  var monthRunsDiv = document.getElementById("month-runs");
  var yearRunsDiv = document.getElementById("year-runs");
  var totalRunsDiv = document.getElementById("total-runs");


  var monthRuns = result.recent_run_totals.count;
  var yearRuns = result.ytd_run_totals.count;
  var totalRuns = result.all_run_totals.count;

  monthRunsDiv.innerHTML = "This month: " + monthRuns;
  yearRunsDiv.innerHTML = "This year: " + yearRuns;
  totalRunsDiv.innerHTML = "All time: " + totalRuns;
}

makeRequest(totalStatsUrl, showDistance);
