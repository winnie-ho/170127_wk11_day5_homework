var createNav = function(){
  const home = document.querySelector("#home");
  home.innerText = "Home";
  
  const temperature = document.querySelector("#weather-now-temperature");
  temperature.innerText = (resultWeather.main.temp-273).toFixed(0) + "°C"
  
  const wind = document.querySelector("#weather-now-wind");
  let msWind = resultWeather.wind.speed; 
  let mphWind = (2.2369362920544*msWind).toFixed(0);
  wind.innerText = mphWind + "mph"
}

var handleLongButton = function(){
    console.log("Long button clicked");
}