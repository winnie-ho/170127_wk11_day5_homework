let kudos;
let comments;
let urlRoot = "https://www.strava.com/api/v3/activities/";
let rawRunGlobal;

const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const fetchRun = (runId) => makeRequest((urlRoot + runId + userToken), renderViewRun);
const fetchKudos = (runId) => makeRequest(urlRoot + runId + "/kudos" + userToken, setKudos);
const fetchComments = (runId) => makeRequest(urlRoot + runId + "/comments" + userToken, setComments);

const setKudos = (rawKudos) => (kudos = rawKudos);
const setComments = (rawComments) => (comments = rawComments);

const renderViewRun = (rawRun) => {
  rawRunGlobal = rawRun;
  resetDetailsExpanded();
  renderKudosDetail(kudos);
  renderComments(comments, kudos);
  renderRunInfo(rawRun);
  renderLaps(rawRun);
  renderPhotos(rawRun);
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

  document.getElementById("start-lap").value = "";
  document.getElementById("end-lap").value = "";
  document.getElementById("laps-calc-result").innerHTML = "Lap Calculator";
  
}

const renderRunInfo = (rawRun) => {
  const dateDiv = document.querySelector("#activity-info__date");
  const titleDiv = document.querySelector("#activity-info__title");
  const distanceDiv = document.querySelector("#primary-stats__distance");
  const timeDiv = document.querySelector("#primary-stats__time");
  const paceDiv = document.querySelector("#primary-stats__pace");
  const kudosDiv = document.querySelector("#secondary-stats__kudos");
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
  rawRun.average_heartrate ? heartrateDiv.innerHTML = "♡ " + rawRun.average_heartrate : heartrateDiv.innerHTML = "♡ -";
  rawRun.average_cadence ? cadenceDiv.innerHTML = "↻ " + rawRun.average_cadence : cadenceDiv.innerHTML = "↻ -";
}

const renderLaps = (rawRun) => {
  lapsDiv = document.querySelector("#laps");
  lapsDiv.innerHTML = rawRun.laps.length;

  lapsDetailDiv = document.querySelector("#laps-list");
  lapsDetailDiv.innerHTML = "";
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
    lapNo.innerHTML = lap.lap_index;
    lapDistance.innerHTML = renderDistance(lap.distance);
    lapTime.innerHTML = renderTime(lap.moving_time);
    lapPace.innerHTML = renderPace(lap.moving_time, lap.distance);
    if (lap.distance === 0) {
      lapDistance.innerHTML = 22.86 + "m";
      lapPace.innerHTML = (lap.moving_time/22.86).toFixed(2) + " s/m";
    }

    append(lapBox, [lapNo, lapDistance, lapTime, lapPace]);
    lapsDetailDiv.appendChild(lapBox);
  })
}

const renderKudosDetail = (rawKudos) => {
  kudosDetailDiv = document.querySelector("#kudos-detail");
  kudosDetailDiv.innerHTML = "";
  rawKudos.forEach(kudoser => {
    const kudoserPerson = document.createElement("div");
    const kudoserName = document.createElement("span");
    const kudoserImage = document.createElement("img");
    kudoserPerson.classList.add("row");
    kudoserName.classList.add("data-metric");
    kudoserName.id = kudoser.id;
    kudoserImage.src = kudoser.profile_medium;
    kudoserImage.classList.add("small-avatar");
    kudoserName.innerHTML = kudoser.firstname;
    append(kudoserPerson, [kudoserImage, kudoserName]);
    kudosDetailDiv.appendChild(kudoserPerson);
  });
}

const renderComments = (comments, kudos) => {
  comments.find(comment => {
    return kudos.find(kudoser => {
      if (kudoser.id === comment.athlete.id) {
        let kudoserId = kudoser.id.toString();
        let targetKudoser = document.getElementById(kudoserId);
        targetKudoser.innerHTML = kudoser.firstname + ":  " + comment.text;
      };
    })
  })
}

const renderPhotos = (rawRun) => {
  let photoDetailDiv = document.getElementById("photos-detail");
  let photos = document.getElementById("photos");
  let photosButton = document.getElementById("photos-button");
  photoDetailDiv.innerHTML = "";
  photos.innerHTML = rawRun.photos.count;
  
  if (rawRun.photos.count === 0){
    document.getElementById("photos-button").style.display = "none";
  } else if (rawRun.photos.count > 0) {
    document.getElementById("photos-button").style.display = "flex";
    let photo = document.createElement("img");
    photo.classList.add("photo");
    photo.src = rawRun.photos.primary.urls["600"];
    photoDetailDiv.appendChild(photo);
  }
}

const calcLapResult = () => {
  let start = document.getElementById("start-lap").value;
  let end = document.getElementById("end-lap").value;

  let laps = rawRunGlobal.laps;
  let counter = 0;
  for (i = start; i <= end; i ++) {
    counter += laps[i-1].moving_time;
  }
  document.getElementById("laps-calc-result").innerText = "Total Time: " + renderTime(counter);
}