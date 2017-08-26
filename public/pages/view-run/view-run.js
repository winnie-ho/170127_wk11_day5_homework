const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const renderRunInfo = (rawDate, rawName, rawDistance, rawTime) => {
  const dateDiv = document.querySelector("#activity-info__date");
  const titleDiv = document.querySelector("#activity-info__title");
  const distanceDiv = document.querySelector("#primary-stats__distance");
  const timeDiv = document.querySelector("#primary-stats__time");
  const paceDiv = document.querySelector("#primary-stats__pace");

  dateDiv.innerHTML = renderDate(rawDate);
  titleDiv.innerHTML = rawName;
  distanceDiv.innerHTML = renderDistance(rawDistance);
  timeDiv.innerHTML = renderTime(rawTime);
  paceDiv.innerHTML = renderPace(rawTime, rawDistance);

}