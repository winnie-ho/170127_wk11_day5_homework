var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var requestRunClubRunsComplete = function (){
  if (this.status !== 200) return;
  result = JSON.parse(this.responseText);
  console.log(result);
  computeRunClubRuns(result);
}

var handleRunClubButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var runsDiv = document.getElementById('runs');
  var runsDiv = document.getElementById('park-runs');

  if (parkRunDiv.style.display === 'none') {
      runsDiv.style.display = 'none';
      parkRunDiv.style.display = 'none';
      runClubDiv.style.display = 'flex';
  } else {
      runClubDiv.style.display = 'none';
  } 
}

var computeRunClubRuns = function(result){
  var runClubRuns = [];
  for (var run of result) {
    if (run.start_latitude === 55.95 && run.start_longitude === -3.21) {
      runClubRuns.push(run);
    }
  }
  console.log("RUN CLUB RUNS ARRAY", runClubRuns);
  // displayRunClubRunsDate(runClubRuns);
  // displayRunClubRunsName(runClubRuns);
  // displayRunClubRunsTime(runClubRuns);
  // displayRunClubRunsPace(runClubRuns);
  return runClubRuns;
}