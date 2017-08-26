const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const renderRunInfo = (rawRun) => {
  const dateDiv = document.querySelector("#activity-info__date");
  const titleDiv = document.querySelector("#activity-info__title");
  const distanceDiv = document.querySelector("#primary-stats__distance");
  const timeDiv = document.querySelector("#primary-stats__time");
  const paceDiv = document.querySelector("#primary-stats__pace");
  const kudosDiv = document.querySelector("#secondary-stats__kudos");

  dateDiv.innerHTML = renderDate(rawRun.start_date);
  titleDiv.innerHTML = rawRun.name;
  distanceDiv.innerHTML = renderDistance(rawRun.distance);
  timeDiv.innerHTML = renderTime(rawRun.moving_time);
  paceDiv.innerHTML = renderPace(rawRun.moving_time, rawRun.distance);

  kudosDiv.innerHTML = rawRun.kudos_count;
}