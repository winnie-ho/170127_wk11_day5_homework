// userToken
const user = "a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
const userToken = "\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";

var parkRuns = [];
var fullParkRuns = [];

const computeParkRuns = (runs) => {
  parkRuns = runs.filter(run => run.start_latitude === 55.98 && run.start_longitude === -3.29);
  computeFullParkRuns(parkRuns);
}

const pushFullPR = (run) => {
  fullParkRuns.push(run);

  if(fullParkRuns.length === parkRuns.length){
    const sortedFullPR = fullParkRuns.sort((a, b) => b.upload_id - a.upload_id);
    displayData(sortedFullPR);
  }
}

const computeFullParkRuns = (parkRuns) => {
  parkRuns.forEach(run => makeRequest(("https://www.strava.com/api/v3/activities/" + run.id + userToken), pushFullPR))
}

const displayData = (fullParkRuns) => {
  displayParkRunsDate(fullParkRuns);  
  displayParkRunsName(fullParkRuns);
  displayParkRunsTime(fullParkRuns);
  displayParkRunsPace(fullParkRuns);
  displaySeg(fullParkRuns);
}

const displayParkRunsDate = (fullParkRuns) => {
  var parkRunDiv = document.getElementById("park-run-date");
  fullParkRuns.forEach(run => {
    var date = document.createElement("div");
    date.classList.add('data-metric','data-long');
    date.innerText = renderDate(run.start_date);
    parkRunDiv.appendChild(date);
  })
}

const displayParkRunsName = (fullParkRuns) => {
  var parkRunDiv = document.getElementById("park-run-name");
  fullParkRuns.forEach(run => {
    var name = document.createElement("div");
    name.classList.add("data-metric");
    name.innerText = run.name;
    parkRunDiv.appendChild(name);
  })
}

const displayParkRunsTime = (fullParkRuns) => {
  var parkRunDiv = document.getElementById("park-run-time");
  fullParkRuns.forEach(run => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    var timeValue = document.createElement("div");
    let rawTime = run.moving_time;

    timeValue.innerHTML = renderTime(rawTime);
    time.appendChild(timeValue);
    parkRunDiv.appendChild(time); 
  })
}


const displayParkRunsPace = (fullParkRuns) => {
  var parkRunDiv = document.getElementById("park-run-pace");
  fullParkRuns.forEach(run => {
    var pace = document.createElement("div");
    pace.classList.add("data-metric");

    let rawTime = run.moving_time;
    let rawDistance = run.distance;
    var paceValue = document.createElement("div");

    paceValue.innerText = renderPace(rawTime, rawDistance);
    pace.appendChild(paceValue);
    parkRunDiv.appendChild(pace);
  })
}

const displaySeg = (fullParkRuns) => {
  var parkRunSeg1 = document.getElementById("park-run-1");
  var parkRunSeg2 = document.getElementById("park-run-2");
  var parkRunSeg3 = document.getElementById("park-run-3");
  var parkRunSeg4 = document.getElementById("park-run-4");
  var parkRunSeg5 = document.getElementById("park-run-5");
  fullParkRuns.forEach(run => {
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

          var time = document.createElement("div");
          time.innerHTML = minutes + ":" + seconds;

          var avgHR = document.createElement("div");
          avgHR.innerHTML = segment.average_heartrate;

          var avgCadence = document.createElement("div");
          avgCadence.innerHTML= segment.average_cadence;

          seg1.appendChild(time);
          // seg1.appendChild(avgHR);
          // seg1.appendChild(avgCadence);

          break;
        case "Edinburgh Parkrun 2nd Kilometre":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }

          var time = document.createElement("div");
          time.innerHTML = minutes + ":" + seconds;

          var avgHR = document.createElement("div");
          avgHR.innerHTML = segment.average_heartrate;

          var avgCadence = document.createElement("div");
          avgCadence.innerHTML= segment.average_cadence;

          seg2.appendChild(time);
          // seg2.appendChild(avgHR);
          // seg2.appendChild(avgCadence);
          break;
        case "Edinburgh Parkrun 3rd Kilometre":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }

          var time = document.createElement("div");
          time.innerHTML = minutes + ":" + seconds;

          var avgHR = document.createElement("div");
          avgHR.innerHTML = segment.average_heartrate;

          var avgCadence = document.createElement("div");
          avgCadence.innerHTML= segment.average_cadence;

          seg3.appendChild(time);
          // seg3.appendChild(avgHR);
          // seg3.appendChild(avgCadence);
          break;
        case "Edinburgh Parkrun 4th Kilometre":
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }

          var time = document.createElement("div");
          time.innerHTML = minutes + ":" + seconds;

          var avgHR = document.createElement("div");
          avgHR.innerHTML = segment.average_heartrate;

          var avgCadence = document.createElement("div");
          avgCadence.innerHTML= segment.average_cadence;

          seg4.appendChild(time);
          // seg4.appendChild(avgHR);
          // seg4.appendChild(avgCadence);
          break;
        case 'Edinburgh Parkrun 5th "Kilometre"':
          var totalSeconds = segment.moving_time;
          var minutes = Math.floor(totalSeconds/60);
          var rawSeconds = (Math.floor(totalSeconds-(minutes*60))).toFixed(0);
          var seconds = rawSeconds;
          if(rawSeconds < 10){
            seconds = "0" + rawSeconds;
          }
          
          var time = document.createElement("div");
          time.innerHTML = minutes + ":" + seconds;

          var avgHR = document.createElement("div");
          avgHR.innerHTML = segment.average_heartrate;

          var avgCadence = document.createElement("div");
          avgCadence.innerHTML= segment.average_cadence;

          seg5.appendChild(time);
          // seg5.appendChild(avgHR);
          // seg5.appendChild(avgCadence);
          break;
      }
    }
    parkRunSeg1.appendChild(seg1);
    parkRunSeg2.appendChild(seg2);
    parkRunSeg3.appendChild(seg3);
    parkRunSeg4.appendChild(seg4);
    parkRunSeg5.appendChild(seg5);
  })
}



    



