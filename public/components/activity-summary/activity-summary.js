const append = (container, childrenArray) => childrenArray.forEach(child => container.appendChild(child));

const createActivityDateTitle = (rawDate, rawTitle) => {
  const dateTitle = document.createElement("div");
  const date = document.createElement("div");
  const title = document.createElement("h4");
  dateTitle.classList.add("run-box__detail");
  date.classList.add("date-metric")

  date.innerHTML = renderDate(rawDate);
  title.innerHTML = rawTitle;

  let children = [title, date];
  append(dateTitle, children);
  return dateTitle;
}

const createActivityDistance = (rawDistance) => {
  const distance = document.createElement("div");
  distance.classList.add("data-metric");
  const distanceValue = document.createElement("div");
  const distanceIcon = document.createElement("img");
  distanceIcon.src = "./resources/icon_distance.png";
  distanceIcon.classList.add("icon");
  
  distanceValue.innerHTML = renderDistance(rawDistance);

  let children = [distanceIcon, distanceValue];
  append(distance, children);
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

  let children = [timeIcon, timeValue];
  append(time, children);
  return time;
}

const createActivityPace = (rawTime, rawDistance) => {
  const pace = document.createElement("div");
  pace.classList.add("data-metric");
  const paceValue = document.createElement("div");
  const paceIcon = document.createElement("img");
  paceIcon.src = "./resources/icon_pace.png";
  paceIcon.classList.add("icon");

  paceValue.innerHTML = renderPace(rawTime, rawDistance);

  let children = [paceIcon, paceValue];
  append(pace, children);
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

  let children = [distance, time, pace];
  append(runBoxDetail, children);

  let children2 = [dateTitle, runBoxDetail];
  append(activitySummary, children2);
  return activitySummary;
}

const viewRun = (event) => {
  const selectedRun = responseRuns.find(run => run.id === event.target.activity_id);
  const runLine = selectedRun.map.summary_polyline;
  if(!selectedRun.summary_polyline){
    return;
  }
  const startPoint = {lat: ((selectedRun.start_latlng[0] + selectedRun.end_latlng[0])/2), lng: ((selectedRun.start_latlng[1] + selectedRun.end_latlng[1])/2)};
  handleNavButton("view-run");
  let map = createMap();


  map.addPolyline(runLine, startPoint);
  fetchRun(selectedRun.id); 
  fetchKudos(selectedRun.id);
  fetchComments(selectedRun.id);
}