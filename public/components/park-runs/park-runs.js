// userToken
var user = "a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
var userToken = "\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";

var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var parkRuns = [];
var fullParkRuns = [];

var handleParkRunButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var parkRunDiv = document.getElementById('park-runs');
  var runsDiv = document.getElementById('runs');

  if (parkRunDiv.style.display === 'none') {
      runClubDiv.style.display = 'none';
      runsDiv.style.display = 'none';
      parkRunDiv.style.display = 'flex';
      makeRequest(urlRuns, computeParkRuns);     
  } else {
      parkRunDiv.style.display = 'none';
  } 
}

var computeParkRuns = function(result){
  
  for (var run of result) {
    if (run.start_latitude === 55.98 && run.start_longitude === -3.29) {
      parkRuns.push(run);
    }
  }
  console.log("PARK RUN RUNS", parkRuns);
  computeFullParkRuns(parkRuns);
}


var pushFullPR = function(result){
  fullParkRuns.push(result);
  console.log("!!!!", fullParkRuns);
  if(fullParkRuns.length === parkRuns.length){
    displayData(fullParkRuns);
  }
}

var computeFullParkRuns = function(parkRuns){
  for(var run of parkRuns){
    var activityUrl = "https://www.strava.com/api/v3/activities/" + run.id + userToken;
    makeRequest(activityUrl, pushFullPR);
  }
}

var displayData = function(fullParkRuns){
  displayParkRunsDate(fullParkRuns);
  displayParkRunsName(fullParkRuns);
  displayParkRunsTime(fullParkRuns);
  displayParkRunsPace(fullParkRuns);
}

var displayParkRunsDate = function(parkRuns) {
  var parkRunDiv = document.getElementById("park-run-date");
  for (var run of parkRuns){
    var date = document.createElement("div");
    date.classList.add('data-metric','data-long');
    date.innerText = run.start_date.substr(8,2) + "-" + run.start_date.substr(5,2) + "-" + run.start_date.substr(0,4);
    parkRunDiv.appendChild(date);
  }
}

var displayParkRunsName = function(parkRuns) {
  var parkRunDiv = document.getElementById("park-run-name");
  for (var run of parkRuns){
    var name = document.createElement("div");
    name.classList.add("data-metric");
    name.innerText = run.name;
    parkRunDiv.appendChild(name);
  }
}

var displayParkRunsTime = function(parkRuns) {
  var parkRunDiv = document.getElementById("park-run-time");
  for (var run of parkRuns){

    var time = document.createElement("div");
    time.classList.add("data-metric");
    var timeIcon = document.createElement("img");
    timeIcon.src = "./resources/icon_time.png";
    timeIcon.classList.add("icon");
    var timeValue = document.createElement("div");
    var totalMinutes = ((run.moving_time)/60).toFixed(2);
    var hours = Math.floor(totalMinutes/60);
    var rawMinutes = (Math.floor(totalMinutes - (hours*60))).toFixed(0);
    var minutes = rawMinutes;
      if(rawMinutes < 10){
        minutes = "0"+rawMinutes;
      }
    var rawSeconds = (((totalMinutes - (hours*60))-minutes)*60).toFixed(0);
    var seconds = rawSeconds;
      if(rawSeconds < 10){
        seconds = "0"+rawSeconds
      }


    if (hours === 0) {
      timeValue.innerText = minutes + ":" + seconds;
    }else{
      timeValue.innerText = hours + ":" + minutes + ":" + seconds;
    }
    time.appendChild(timeIcon);
    time.appendChild(timeValue);

    parkRunDiv.appendChild(time); 
  }
}

var displayParkRunsPace = function(parkRuns) {
  var parkRunDiv = document.getElementById("park-run-pace");
  for (var run of parkRuns){
    var pace = document.createElement("div");
    pace.classList.add("data-metric");

    var paceIcon = document.createElement("img");
    paceIcon.src = "./resources/icon_pace.png";
    paceIcon.classList.add("icon");
    var totalMinutes = ((run.moving_time)/60).toFixed(2);
    var paceValue = document.createElement("div");
    var paceMinutes = (Math.floor(totalMinutes/(run.distance/1000))).toFixed(0) 
    var rawPaceSeconds = (((totalMinutes/(run.distance/1000))-paceMinutes)*60).toFixed(0);
    var paceSeconds = rawPaceSeconds;
      if(rawPaceSeconds < 10){
        paceSeconds = "0"+rawPaceSeconds;
      }
    paceValue.innerText = paceMinutes + ":" + paceSeconds + "/km";
    pace.appendChild(paceIcon);
    pace.appendChild(paceValue);



    parkRunDiv.appendChild(pace);
  }
}
    




