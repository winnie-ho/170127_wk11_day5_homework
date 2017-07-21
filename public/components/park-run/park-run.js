var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var requestParkRunsComplete = function (){
  if (this.status !== 200) return;
  result = JSON.parse(this.responseText);
  console.log(result);
  computeParkRuns(result);
}

var computeParkRuns = function(result){
  var parkRuns = [];
  for (var run of result) {
    if (run.start_latitude === 55.98 && run.start_longitude === -3.29) {
      parkRuns.push(run);
    }
  }
  console.log("PARK RUNS ARRAY", parkRuns);
  displayParkRuns(parkRuns);
  return parkRuns;
}

var displayParkRuns = function(parkRuns) {
  var parkRunDiv = document.getElementById("park-run");
  for (var run of parkRuns){
    var name = document.createElement("div");
    name.innerText = run.start_date + " " + run.name + ", " + (run.elapsed_time)/60 ;
    parkRunDiv.appendChild(name);
  }
}


var handleParkRunButton = function() {
    var parkRunDiv = document.getElementById('park-run');

    if (parkRunDiv.style.display === 'none') {
        parkRunDiv.style.display = 'flex';
    } else {
        parkRunDiv.style.display = 'none';
    }
    
}