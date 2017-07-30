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
    } else {
        homeDiv.style.display = 'none';
    } 
}

var showDistance = function(result){
  var distanceDiv = document.getElementById("total-distance");


  var monthDistance = ((result.recent_run_totals.distance)/1000).toFixed(2);
  var monthDistanceDiv = document.createElement("div");
  monthDistanceDiv.innerHTML = "This month: " + monthDistance + "km";

  var yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(2);
  var yearDistanceDiv = document.createElement("div");
  yearDistanceDiv.innerHTML = "This year: " + yearDistance + "km";

  var totalDistance = ((result.all_run_totals.distance)/1000).toFixed(2);
  var totalDistanceDiv = document.createElement("div");
  totalDistanceDiv.innerHTML = "All time: " + totalDistance + "km";

  distanceDiv.appendChild(monthDistanceDiv);
  distanceDiv.appendChild(yearDistanceDiv);
  distanceDiv.appendChild(totalDistanceDiv);

}


makeRequest(totalStatsUrl, showDistance);
