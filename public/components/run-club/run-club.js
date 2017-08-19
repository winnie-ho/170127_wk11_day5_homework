const computeRunClubRuns = (responseRuns) => {
  const runClubRuns = responseRuns.filter(run => (55.94 < run.start_latitude < 55.95 && (run.start_longitude === -3.21 || run.start_longitude === -3.20) && (new Date (run.start_date_local)).getDay() === 1));

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

    let rawTime = run.moving_time;
    let renderedTime = renderTime(rawTime);

    timeValue.innerText = renderedTime;
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

    let rawTime = run.moving_time;
    let rawDistance = run.distance;
    let renderedPace = renderPace(rawTime, rawDistance);
    const paceValue = document.createElement("div");

    paceValue.innerText = renderedPace;
    pace.appendChild(paceIcon);
    pace.appendChild(paceValue);

    runClubDiv.appendChild(pace);
  }
}