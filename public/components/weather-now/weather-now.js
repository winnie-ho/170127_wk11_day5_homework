const urlWeatherNow = "http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=b7114aca731d927ad002d0a518f38dfe";

const showWeather = (resultWeather) => {
  const forecast = document.querySelector("#weather-now-forecast");
  forecast.innerText = resultWeather.weather[0].description;
  
  const temperature = document.querySelector("#weather-now-temperature");
  temperature.innerText = (resultWeather.main.temp-273).toFixed(0) + "°C"
  
  const wind = document.querySelector("#weather-now-wind");
  const mphWind = (2.2369362920544 * resultWeather.wind.speed).toFixed(0) + "mph";
  wind.innerText = mphWind
}

