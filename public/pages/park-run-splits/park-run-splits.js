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
  let orderedPRTime = fullParkRuns.sort((a,b) => a.moving_time - b.moving_time);
  
  fullParkRuns.forEach(run => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    var timeValue = document.createElement("div");
    let rawTime = run.moving_time;

    if (rawTime === orderedPRTime[0].moving_time) timeValue.classList.add("first");
    if (rawTime === orderedPRTime[1].moving_time) timeValue.classList.add("second");
    if (rawTime === orderedPRTime[2].moving_time) timeValue.classList.add("third");

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
          var time = document.createElement("div");
          time.innerHTML = renderTime(segment.moving_time);
          seg1.appendChild(time);
          break;
          
        case "Edinburgh Parkrun 2nd Kilometre":
          var time = document.createElement("div");
          time.innerHTML = renderTime(segment.moving_time);
          seg2.appendChild(time);
          break;
          
        case "Edinburgh Parkrun 3rd Kilometre":
          var time = document.createElement("div");
          time.innerHTML = renderTime(segment.moving_time);
          seg3.appendChild(time);
          break;

        case "Edinburgh Parkrun 4th Kilometre":
          var time = document.createElement("div");
          time.innerHTML = renderTime(segment.moving_time);
          seg4.appendChild(time);
          break;

        case 'Edinburgh Parkrun 5th "Kilometre"':
          var time = document.createElement("div");
          time.innerHTML = renderTime(segment.moving_time);
          seg5.appendChild(time);
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



    




