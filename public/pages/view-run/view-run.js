let kudos;
let comments;
let photos;
let urlRoot = "https://www.strava.com/api/v3/activities/";
let rawRunGlobal;
let lapCount = [];


const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const fetchRun = (runId) => makeRequest((urlRoot + runId + userToken), renderViewRun);
const fetchKudos = (runId) => makeRequest(urlRoot + runId + "/kudos" + userToken, setKudos);
const fetchPhotos = (runId) => makeRequest((urlRoot + runId + "/photos?photo_sources=true&size=1000&access_token=" + user), setPhotos);
const fetchComments = (runId) => makeRequest(urlRoot + runId + "/comments" + userToken, setComments);

const setKudos = (rawKudos) => (kudos = rawKudos);
const setComments = (rawComments) => (comments = rawComments);
const setPhotos = (rawPhotos) => (photos = rawPhotos);

const renderViewRun = (rawRun) => {
  rawRunGlobal = rawRun;
  resetDetailsExpanded();
  renderKudosDetail(kudos);
  renderComments(rawRun, comments, kudos);
  renderRunInfo(rawRun);
  renderLaps(rawRun);
  renderPhotos(rawRun, photos);
  handleNavButton("view-run");
  renderMap(rawRun);
}

const renderMap = (rawRun) => {
  document.querySelector("#map").innerHTML = "";  
  const runLine = rawRun.map.summary_polyline;
  if(runLine){
    let map = createMap();
    const startPoint = {lat: ((rawRun.start_latlng[0] + rawRun.end_latlng[0])/2), lng: ((rawRun.start_latlng[1] + rawRun.end_latlng[1])/2)};
    map.addPolyline(runLine, startPoint);
    google.maps.event.trigger(map, 'resize');
  }
}

const resetDetailsExpanded = () => {
  document.getElementById("laps-button").classList.remove("button-active");
  document.getElementById("kudos-button").classList.remove("button-active");
  document.getElementById("photos-button").classList.remove("button-active");

  document.getElementById("laps-detail").style.display = "none";
  document.getElementById("kudos-detail").style.display = "none";
  document.getElementById("photos-detail").style.display = "none";
  document.getElementById("laps-calc-result").innerHTML = "Select laps to compute";
  document.getElementById("laps-calc-result").classList.remove("lap-result-active");
  lapCount = [];  
}

const renderRunInfo = (rawRun) => {
  const dateDiv = document.querySelector("#activity-info__date");
  const titleDiv = document.querySelector("#activity-info__title");
  const distanceDiv = document.querySelector("#primary-stats__distance");
  const timeDiv = document.querySelector("#primary-stats__time");
  const paceDiv = document.querySelector("#primary-stats__pace");
  const kudosDiv = document.querySelector("#secondary-stats__kudos");
  const commentsDiv = document.querySelector("#secondary-stats__comments");
  const heartrateDiv = document.querySelector("#secondary-stats__heartrate");
  const cadenceDiv = document.querySelector("#secondary-stats__cadence");

  dateDiv.innerHTML = renderDate(rawRun.start_date, "long");
  titleDiv.innerHTML = rawRun.name;
  timeDiv.innerHTML = renderTime(rawRun.moving_time);
  distanceDiv.innerHTML = renderDistance(rawRun.distance);
  paceDiv.innerHTML = renderPace(rawRun.moving_time, rawRun.distance);
  if (rawRun.distance === 0) {
    distanceDiv.innerHTML = rawRun.description;
    paceDiv.innerHTML = ""
  }

  kudosDiv.innerHTML = rawRun.kudos_count;
  commentsDiv.innerHTML = rawRun.comment_count;
  rawRun.average_heartrate ? heartrateDiv.innerHTML = "♡ " + rawRun.average_heartrate : heartrateDiv.innerHTML = "♡ -";
  rawRun.average_cadence ? cadenceDiv.innerHTML = "↻ " + rawRun.average_cadence : cadenceDiv.innerHTML = "↻ -";
}

const renderLaps = (rawRun) => {
  lapsDiv = document.querySelector("#laps");
  lapsDiv.innerHTML = rawRun.laps.length;
  lapsDetailDiv = document.querySelector("#laps-list");
  lapsDetailDiv.innerHTML = "";
  let counter = 1;
  rawRun.laps.forEach(lap => {
    const lapBox = document.createElement("div");
    const lapNo = document.createElement("div");
    const lapDistance = document.createElement("div");
    const lapTime = document.createElement("div");
    const lapPace = document.createElement("div");
    lapBox.classList.add("row", "sa", "lap-box");
    lapNo.classList.add("data-metric");
    lapDistance.classList.add("data-metric");
    lapTime.classList.add("data-metric");
    lapPace.classList.add("data-metric");
    lapNo.innerHTML = counter;
    lapDistance.innerHTML = renderDistance(lap.distance);
    lapTime.innerHTML = renderTime(lap.moving_time);
    lapPace.innerHTML = renderPace(lap.moving_time, lap.distance);
    if (lap.distance === 0) {
      lapDistance.innerHTML = 22.86 + "m";
      lapPace.innerHTML = (lap.moving_time/22.86).toFixed(2) + " s/m";
    }

    if((lap.moving_time/60/lap.distance*1000) < 5) {
      lapBox.classList.add("effort");
    }
    
    lapBox.id = counter;
    lapBox.rawRun = rawRun;
    lapBox.onclick = selectLap;
    append(lapBox, [lapNo, lapDistance, lapTime, lapPace]);
    lapsDetailDiv.appendChild(lapBox);
    counter ++;
  })
}

const selectLap = (event) => {
  numOfLaps = event.target.rawRun.laps.length;
  for (i = 1; i <= numOfLaps; i ++ ) {
    let lapDivShow = document.getElementById(i);
    document.getElementById(i).classList.remove("lap-selected");
  }
  
  lapCount.push(event.target.id);
  if (lapCount.length > 2) lapCount.splice(0,1);
  if (lapCount.length == 2) calcLapResult(event);
  lapCount.forEach(lap => {
    document.getElementById(lap).classList.add("lap-selected");
  });
}

const calcLapResult = (event) => {
  let largest;
  let smallest;

  if (lapCount[0] > lapCount[1]) {
    largest = lapCount[0];
    smallest = lapCount[1];
  } else {
    largest = lapCount[1];
    smallest = lapCount[0];
  }

  let laps = event.target.rawRun.laps;
  let counterLaps = 0;
  let counterTime = 0;
  let counterDistance = 0;
  for (i = smallest; i <= largest; i ++) {
    counterLaps ++;
    counterTime += laps [i-1].moving_time;
    counterDistance += laps [i-1].distance;
  }
  let counterLapsDiv = document.createElement("div");
  counterLapsDiv.innerHTML = counterLaps;
  let counterDistanceDiv = createActivityDistance(counterDistance);
  let counterTimeDiv = createActivityTime(counterTime);
  let counterPaceDiv = createActivityPace(counterTime, counterDistance);
  let container = document.getElementById("laps-calc-result");
  container.classList.add("lap-result-active");
  container.innerHTML = '';
  append(container, [counterLapsDiv, counterDistanceDiv, counterTimeDiv, counterPaceDiv]);
}

const renderKudosDetail = (rawKudos) => {
  kudosDetailDiv = document.querySelector("#kudos-detail");
  kudosDetailDiv.innerHTML = "";
  if (rawKudos.length === 0) {
    document.getElementById("kudos-button").style.display = "none";
  } else if (rawKudos.length > 0) {
    rawKudos.forEach(kudoser => {
      document.getElementById("kudos-button").style.display = "flex";
      const kudoserPerson = document.createElement("div");
      const kudoserName = document.createElement("span");
      const kudoserImage = document.createElement("img");
      kudoserPerson.classList.add("centre");
      kudoserName.classList.add("data-metric", "centre");
      kudoserName.id = kudoser.id;
      kudoserImage.src = kudoser.profile_medium;
      kudoserImage.classList.add("small-avatar");
      kudoserName.innerHTML = kudoser.firstname;
      append(kudoserPerson, [kudoserImage, kudoserName]);
      kudosDetailDiv.appendChild(kudoserPerson);
    });
  }
}

const renderComments = (rawRun, comments, kudos) => {
  commentsDetailDiv = document.getElementById("comments-detail");
  commentsDetailDiv.innerHTML = "";
  if (rawRun.comment_count === 0){
    document.getElementById("comments-button").style.display = "none";
  } else if (rawRun.comment_count > 0) {
    document.getElementById("comments-button").style.display = "flex";    
    comments.forEach(comment => {
      const commenter = document.createElement("div");
      const commenterName = document.createElement("span");
      const commenterImage = document.createElement("img");
      commenter.classList.add("row");
      commenterName.classList.add("data-metric", "comment-text");
      commenter.id = comment.id;
      commenterImage.src = comment.athlete.profile_medium;
      commenterImage.classList.add("v-small-avatar");
      commenterName.innerHTML = comment.athlete.firstname + ": " + comment.text;
      append(commenter, [commenterImage, commenterName]);
      commentsDetailDiv.appendChild(commenter);
    });
  }
}

const renderPhotos = (rawRun, photos) => {
  let photoDetailDiv = document.getElementById("photos-detail");
  let photosDiv = document.getElementById("photos");
  let photosButton = document.getElementById("photos-button");
  photoDetailDiv.innerHTML = "";
  photosDiv.innerHTML = rawRun.photos.count;
  if (rawRun.photos.count === 0){
    document.getElementById("photos-button").style.display = "none";
  } else if (rawRun.photos.count > 0) {
    document.getElementById("photos-button").style.display = "flex";
    photos.forEach(photo => {
      let img = document.createElement("img");
      img.classList.add("photo");
      img.src = photo.urls["1000"];
      photoDetailDiv.appendChild(img);
    });
  }
}