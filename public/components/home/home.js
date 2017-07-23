var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=100&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"


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

  var totalDistanceRaw = result.reduce(function(sum, value) {
    return sum + value.distance;
  }, 0);

  var totalDistance = (totalDistanceRaw/1000).toFixed(2);

  console.log("DISTANCE", (totalDistance/1000).toFixed(2));
  distanceDiv.innerText = "this year: " +  totalDistance + "km";
}


makeRequest(urlRuns, showDistance);
