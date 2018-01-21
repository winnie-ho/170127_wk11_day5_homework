const renderRunClubHome = (runClubRuns) => {
  const lastRC = runClubRuns[0];

  document.querySelector("#last-rc__date").innerHTML = "LAST RAN: " + renderDate(lastRC.start_date);
  document.querySelector("#last-rc__name").innerHTML = lastRC.name;
  document.querySelector("#last-rc__distance").innerHTML = renderDistance(lastRC.distance);
  document.querySelector("#last-rc__time").innerHTML = renderTime(lastRC.moving_time);
  document.querySelector("#last-rc__pace").innerHTML = renderPace(lastRC.moving_time, lastRC.distance);
}

const fetchRunClub = () => {
  const runClubId = "163071";
  makeRequest(("https://www.strava.com/api/v3/clubs/" + runClubId + userToken), renderRunClubData);
}

const fetchRunClubMembers = () => {
  const runClubId = "163071";
  makeRequest(("https://www.strava.com/api/v3/clubs/" + runClubId + "/members?per_page=200&access_token=" + user), renderRunClubMembers);
}

const renderRunClubData = (runClubData) => {
  if (!runClubData) return;

  document.getElementById("rc-name").innerHTML = (runClubData.name).toUpperCase();
  document.getElementById("rc-image").src = runClubData.cover_photo;
  document.getElementById("rc-year-runs").innerHTML = runClubRuns.length;
  document.getElementById("rc-year-distance").innerHTML = renderDistance(runClubRuns.reduce((sum, value) => {
    return sum + value.distance;
  }, 0));
  document.getElementById("rc-year-time").innerHTML = renderTime(runClubRuns.reduce((sum, value) => {
    return sum + value.moving_time;
  }, 0));
}

const renderRunClubMembers = (runClubMembers) => {
  console.log(runClubMembers);
}