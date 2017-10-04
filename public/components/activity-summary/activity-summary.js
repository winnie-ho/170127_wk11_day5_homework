const append = (container, childrenArray) => childrenArray.forEach(child => container.appendChild(child));

const createActivityDateTitle = (rawDate, rawTitle) => {
  const dateTitle = document.createElement("div");
  const date = document.createElement("div");
  const title = document.createElement("h4");
  dateTitle.classList.add("run-box__detail");
  date.classList.add("date-metric")

  if (window.innerWidth < 375) {
    date.innerHTML = renderDate(rawDate);
  } else {
    date.innerHTML = renderDate(rawDate, "long");
  }
  title.innerHTML = rawTitle;

  append(dateTitle, [title, date]);
  return dateTitle;
}

const createActivityDistance = (rawDistance) => {
  const distance = document.createElement("div");
  distance.classList.add("data-metric");
  const distanceValue = document.createElement("div");
  const distanceIcon = document.createElement("img");
  distanceIcon.classList.add("icon");
  
  if (rawDistance) {
    distanceValue.innerHTML = renderDistance(rawDistance);
    distanceIcon.src = "./resources/icon_distance.png";
  }
  
  append(distance, [distanceIcon, distanceValue]);
  return distance;
}

const createActivityTime = (rawTime) => {
  const time = document.createElement("div");
  time.classList.add("data-metric");
  const timeValue = document.createElement("div");
  const timeIcon = document.createElement("img");
  timeIcon.src = "./resources/icon_time.png";
  timeIcon.classList.add("icon");
  
  timeValue.innerHTML = renderTime(rawTime);
  
  append(time, [timeIcon, timeValue]);
  return time;
}

const createActivityPace = (rawTime, rawDistance) => {
  const pace = document.createElement("div");
  pace.classList.add("data-metric");
  const paceValue = document.createElement("div");
  const paceIcon = document.createElement("img");
  paceIcon.classList.add("icon");
  
  if (rawDistance) {
    paceValue.innerHTML = renderPace(rawTime, rawDistance);
    paceIcon.src = "./resources/icon_pace.png";
  }

  append(pace, [paceIcon, paceValue]);
  return pace;
}

const createActivitySummary = (rawId, rawDate,rawTitle, rawDistance, rawTime) => {
  const activitySummary = document.createElement("div");
  activitySummary.id = "run-box";
  activitySummary.activity_id = rawId;
  activitySummary.onclick = viewRun;

  const runBoxDetail = document.createElement("div")
  runBoxDetail.classList.add("run-box__detail");

  let dateTitle = createActivityDateTitle(rawDate, rawTitle);
  let distance = createActivityDistance(rawDistance);
  let time = createActivityTime(rawTime);
  let pace = createActivityPace(rawTime, rawDistance);

  append(runBoxDetail, [distance, time, pace]);

  append(activitySummary, [dateTitle, runBoxDetail]);
  return activitySummary;
}

const viewRun = (event) => {
  const selectedRun = responseRuns.find(run => run.id === event.target.activity_id);
  const runLine = selectedRun.map.summary_polyline;
  handleNavButton("view-run");
  let map;
  
  fetchRun(selectedRun.id); 
  fetchKudos(selectedRun.id);
  fetchComments(selectedRun.id);
  if(selectedRun.map.summary_polyline){
    map = createMap();
    const startPoint = {lat: ((selectedRun.start_latlng[0] + selectedRun.end_latlng[0])/2), lng: ((selectedRun.start_latlng[1] + selectedRun.end_latlng[1])/2)};
    map.addPolyline(runLine, startPoint);
  } else {
    document.querySelector("#map").innerHTML = "";
  }
}