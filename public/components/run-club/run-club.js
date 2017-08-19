var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

const computeRunClubRuns = (result) => {

  const runClubRuns = result.filter(run => (55.94 < run.start_latitude < 55.95 && (run.start_longitude === -3.21 || run.start_longitude === -3.20) && (new Date (run.start_date_local)).getDay() === 1));

  displayRunClubRunsDate(runClubRuns);
  displayRunClubRunsName(runClubRuns);
  displayRunClubRunsDistance(runClubRuns);
  displayRunClubRunsTime(runClubRuns);
  displayRunClubRunsPace(runClubRuns);
  return runClubRuns;
}

const displayRunClubRunsDate = (runClubRuns) => {
  const runClubDiv = document.querySelector("#run-club-date");
  for (const run of runClubRuns){
    const date = document.createElement("div");
    date.classList.add("data-metric", 'data-long');
    date.innerText = run.start_date.substr(8,2) + "-" + run.start_date.substr(5,2) + "-" + run.start_date.substr(0,4);
    runClubDiv.appendChild(date);
  }
}

const displayRunClubRunsName = (runClubRuns) => {
  const runClubDiv = document.querySelector("#run-club-name");
  for (const run of runClubRuns){
    const name = document.createElement("div");
    name.classList.add("data-metric", 'data-long');
    name.innerText = run.name;
    runClubDiv.appendChild(name);
  }
}

const displayRunClubRunsDistance = (runClubRuns) => {
  const runClubDiv = document.querySelector('#run-club-distance');
  for (const run of runClubRuns){
    const distance = document.createElement("div");
    distance.classList.add("data-metric");
    const distanceIcon = document.createElement("img");
    distanceIcon.src = "./resources/icon_distance.png";
    distanceIcon.classList.add("icon-metric");
    const distanceValue = document.createElement("div");
    distanceValue.innerText = ((run.distance)/1000).toFixed(2) + "km";
    distance.appendChild(distanceIcon);
    distance.appendChild(distanceValue);

    runClubDiv.appendChild(distance); 
  }
}


const displayRunClubRunsTime = (runClubRuns) => {
  const runClubDiv = document.querySelector("#run-club-time");
  for (const run of runClubRuns){

    const time = document.createElement("div");
    time.classList.add("data-metric");
    const timeIcon = document.createElement("img");
    timeIcon.src = "./resources/icon_time.png";
    timeIcon.classList.add("icon-metric");
    const timeValue = document.createElement("div");
    const totalMinutes = ((run.moving_time)/60).toFixed(2);
    const hours = Math.floor(totalMinutes/60);
    const rawMinutes = (Math.floor(totalMinutes - (hours*60))).toFixed(0);
    const minutes = rawMinutes;
      if(rawMinutes < 10){
        minutes = "0"+rawMinutes;
      }
    const rawSeconds = (((totalMinutes - (hours*60))-minutes)*60).toFixed(0);
    let seconds = rawSeconds;
      if(rawSeconds < 10){
        seconds = "0" + rawSeconds
      }

    if (hours === 0) {
      timeValue.innerText = minutes + ":" + seconds;
    }else{
      timeValue.innerText = hours + ":" + minutes + ":" + seconds;
    }
    time.appendChild(timeIcon);
    time.appendChild(timeValue);

    runClubDiv.appendChild(time); 
  }
}

const displayRunClubRunsPace = (runClubRuns) => {
  const runClubDiv = document.getElementById("run-club-pace");
  for (const run of runClubRuns){
    const pace = document.createElement("div");
    pace.classList.add("data-metric");

    const paceIcon = document.createElement("img");
    paceIcon.src = "./resources/icon_pace.png";
    paceIcon.classList.add("icon-metric");
    const totalMinutes = ((run.moving_time)/60).toFixed(2);
    const paceValue = document.createElement("div");
    const paceMinutes = (Math.floor(totalMinutes/(run.distance/1000))).toFixed(0) 
    const rawPaceSeconds = (((totalMinutes/(run.distance/1000))-paceMinutes)*60).toFixed(0);
    let paceSeconds = rawPaceSeconds;
      if(rawPaceSeconds < 10){
        paceSeconds = "0"+rawPaceSeconds;
      }
    paceValue.innerText = paceMinutes + ":" + paceSeconds + "/km";
    pace.appendChild(paceIcon);
    pace.appendChild(paceValue);

    runClubDiv.appendChild(pace);
  }
}