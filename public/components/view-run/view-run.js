const createMap = () => {
  const centre = { lat: 55.9533, lng:-3.1883 };
  return new MapWrapper(centre, 14);
}

const renderRunInfo = (rawName) => {
  const infoDiv = document.querySelector("#container");
  infoDiv.innerHTML = rawName;
}