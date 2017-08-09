// Totals and stats per athlete
var totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "Aprill",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}

let currentMonth = new Date().getMonth();
let currentMonthWord = months[currentMonth];


var handleHomeButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var parkRunsDiv = document.getElementById('park-runs');
  var runsDiv = document.getElementById('runs');
  var homeDiv = document.getElementById('home');
  var title = document.getElementById('title');
    if (homeDiv.style.display === 'none') {
        parkRunsDiv.style.display = 'none';
        runClubDiv.style.display = 'none';
        runsDiv.style.display = 'none';
        homeDiv.style.display = 'flex';
        title.style.display = 'block';
    }
}

var showDistance = function(result){
  console.log("STATS CALL", result);
  var distanceDiv = document.getElementById("distance");
  var monthDistanceDiv = document.getElementById("month-distance");
  var yearDistanceDiv = document.getElementById("year-distance");
  var totalDistanceDiv = document.getElementById("total-distance");


  var monthDistance = ((result.recent_run_totals.distance)/1000).toFixed(0);
  var yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(0);
  var totalDistance = ((result.all_run_totals.distance)/1000).toFixed(0);


  monthDistanceDiv.innerHTML = currentMonthWord + ": " + monthDistance + " km";
  yearDistanceDiv.innerHTML = "This year: " + yearDistance + " km";
  totalDistanceDiv.innerHTML = "All time: " + totalDistance + " km";
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

  monthTimeDiv.innerHTML = currentMonthWord + ": " + monthTime + " hours";
  yearTimeDiv.innerHTML = "This year: " + yearTime + " hours";
  totalTimeDiv.innerHTML = "All time: " + totalTime + " hours";
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

  monthRunsDiv.innerHTML = currentMonthWord + ": "+ monthRuns;
  yearRunsDiv.innerHTML = "This year: " + yearRuns;
  totalRunsDiv.innerHTML = "All time: " + totalRuns;
}

makeRequest(totalStatsUrl, showDistance);
