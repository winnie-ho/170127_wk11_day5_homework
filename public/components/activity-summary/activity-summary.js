const append = (container, childrenArray) => childrenArray.forEach(child => container.appendChild(child));

const createActivityDateTitle = (rawDate, rawTitle) => {
  const dateTitle = document.createElement("div");
  const date = document.createElement("div");
  const title = document.createElement("h4");
  dateTitle.classList.add("run-box__detail");

  date.innerHTML = rawDate.substr(8,2) + "-" + rawDate.substr(5,2) + "-"+ rawDate.substr(0,4);
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
  
  distanceValue.innerHTML = ((rawDistance)/1000).toFixed(2) + "km";

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

const createActivitySummary = (rawDate, rawTitle, rawDistance, rawTime) => {
  const activitySummary = document.createElement("div");
  activitySummary.id = "run-box";

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