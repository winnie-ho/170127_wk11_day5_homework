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
      parkRuns = [];
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

  if(fullParkRuns.length === parkRuns.length){
    var sortedFullPR = fullParkRuns.sort(function(a,b){
      return b.upload_id - a.upload_id;
    });
    displayData(sortedFullPR);
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
  displaySeg(fullParkRuns);
}

var displayParkRunsDate = function(fullParkRuns) {
  var parkRunDiv = document.getElementById("park-run-date");
  for (var run of fullParkRuns){
    var date = document.createElement("div");
    date.classList.add('data-metric','data-long');
    date.innerText = run.start_date.substr(8,2) + "-" + run.start_date.substr(5,2) + "-" + run.start_date.substr(0,4);
    parkRunDiv.appendChild(date);
  }
}

var displayParkRunsName = function(fullParkRuns) {
  var parkRunDiv = document.getElementById("park-run-name");
  for (var run of fullParkRuns){
    var name = document.createElement("div");
    name.classList.add("data-metric");
    name.innerText = run.name;
    parkRunDiv.appendChild(name);
  }
}

var displayParkRunsTime = function(fullParkRuns) {
  var parkRunDiv = document.getElementById("park-run-time");
  for (var run of fullParkRuns){

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

var displayParkRunsPace = function(fullParkRuns) {
  var parkRunDiv = document.getElementById("park-run-pace");
  for (var run of fullParkRuns){
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

var displaySeg = function(fullParkRuns) {
  var parkRunSeg1 = document.getElementById("park-run-1");
  var parkRunSeg2 = document.getElementById("park-run-2");
  var parkRunSeg3= document.getElementById("park-run-3");
  var parkRunSeg4= document.getElementById("park-run-4");
  var parkRunSeg5= document.getElementById("park-run-5");
  for (var run of fullParkRuns){
    var seg1 = document.createElement("div");
    var seg2 = document.createElement("div");
    var seg3 = document.createElement("div");
    var seg4 = document.createElement("div");
    var seg5 = document.createElement("div");
    seg1.classList.add("data-metric");
    seg2.classList.add("data-metric");
    seg3.classList.add("data-metric");
    seg4.classList.add("data-metric");
    seg5.classList.add("data-metric");
    for(var segment of run.segment_efforts){
      switch (segment.name){
        case "Edinburgh park run first km":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }
          seg1.innerText = minutes + ":" + seconds;
          break;
        case "Edinburgh Parkrun 2nd Kilometre":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }
          seg2.innerText = minutes + ":" + seconds;
          break;
        case "Edinburgh Parkrun 3rd Kilometre":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }
          seg3.innerText = minutes + ":" + seconds;
          break;
        case "Edinburgh Parkrun 4th Kilometre":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }
          seg4.innerText = minutes + ":" + seconds;
          break;
        case 'Edinburgh Parkrun 5th "Kilometre"':
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }
          seg5.innerText = minutes + ":" + seconds;
          break;
      }
    }
    parkRunSeg1.appendChild(seg1);
    parkRunSeg2.appendChild(seg2);
    parkRunSeg3.appendChild(seg3);
    parkRunSeg4.appendChild(seg4);
    parkRunSeg5.appendChild(seg5);
  }
}



    




