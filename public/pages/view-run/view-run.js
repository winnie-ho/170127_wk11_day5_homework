let kudos;
let comments;

const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const fetchRun = (runId) => {
  makeRequest(("https://www.strava.com/api/v3/activities/" + runId + userToken), renderViewRun);
}

const fetchKudos = (runId) => {
  const activityKudosUrl = "https://www.strava.com/api/v3/activities/" + runId + "/kudos" + userToken;
  makeRequest(activityKudosUrl, setKudos);
}

const fetchComments = (runId) => {
  const commentsUrl = "https://www.strava.com/api/v3/activities/" + runId + "/comments" + userToken;
  makeRequest(commentsUrl, setComments);
}

const setKudos = (rawKudos) => (kudos = rawKudos);

const setComments = (rawComments) => (comments = rawComments);

const renderViewRun = (rawRun) => {
  renderKudosDetail(kudos);
  renderComments(comments, kudos);
  renderRunInfo(rawRun);
  renderLaps(rawRun);
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

  dateDiv.innerHTML = renderDate(rawRun.start_date);
  titleDiv.innerHTML = rawRun.name;
  distanceDiv.innerHTML = renderDistance(rawRun.distance);
  timeDiv.innerHTML = renderTime(rawRun.moving_time);
  paceDiv.innerHTML = renderPace(rawRun.moving_time, rawRun.distance);

  kudosDiv.innerHTML = rawRun.kudos_count;
  heartrateDiv.innerHTML = "♡ " + rawRun.average_heartrate;
  cadenceDiv.innerHTML = "↻ " + rawRun.average_cadence;
}

const renderLaps = (rawRun) => {
  lapsDiv = document.querySelector("#laps");
  lapsDiv.innerHTML = rawRun.laps.length;

  lapsDetailDiv = document.querySelector("#laps-detail");
  lapsDetailDiv.innerHTML = "";
  rawRun.laps.forEach(lap => {
    const lapBox = document.createElement("div");
    const lapNo = document.createElement("div");
    const lapTime = document.createElement("div");
    const lapPace = document.createElement("div");
    lapBox.classList.add("row", "sa", "lap-box");
    lapNo.classList.add("data-metric");
    lapTime.classList.add("data-metric");
    lapPace.classList.add("data-metric");
    lapNo.innerHTML = lap.lap_index;
    lapTime.innerHTML = renderTime(lap.moving_time);
    lapPace.innerHTML = renderPace(lap.moving_time, lap.distance);
    
    lapBox.appendChild(lapNo);
    lapBox.appendChild(lapTime);
    lapBox.appendChild(lapPace);
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
    kudoserPerson.appendChild(kudoserImage);
    kudoserPerson.appendChild(kudoserName);
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