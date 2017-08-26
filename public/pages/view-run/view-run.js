const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const fetchKudos = (runId) => {
  const activityKudosUrl = "https://www.strava.com/api/v3/activities/" + runId + "/kudos" + userToken;
  makeRequest(activityKudosUrl, renderKudosDetail);
}

const fetchRun = (runId) => {
  makeRequest(("https://www.strava.com/api/v3/activities/" + runId + userToken), renderRunInfo);
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
  heartrateDiv.innerHTML = "♡" + rawRun.average_heartrate;
  cadenceDiv.innerHTML = "↻" + rawRun.average_cadence;
}

const renderKudosDetail = (rawKudos) => {
  kudosDetailDiv = document.querySelector("#kudos-detail");
  rawKudos.forEach(kudoser => {
    let kudoserPerson = document.createElement("div");
    let kudoserImage = document.createElement("img");
    kudoserImage.src = kudoser.profile_medium;
    kudoserImage.classList.add("small-avatar");
    kudoserPerson.innerHTML = kudoser.firstname;
    kudosDetailDiv.appendChild(kudoserImage);
    kudosDetailDiv.appendChild(kudoserPerson);
  });
}