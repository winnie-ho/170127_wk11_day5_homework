let weatherNow = Vue.component('weather-now', {
  template: `
  <div id="weather-now">
    <div class='data'>
      <img src='./resources/icon_forecast.png' class='icon'/>
      <span id='weather-now-forecast' ></span>
    </div>
    <div class='data'>
      <img src='./resources/icon_thermometer.png' class='icon'/>
      <span id='weather-now-temperature'></span>
    </div>
    <div class='data'>
      <img src='./resources/icon_wind_sock.png' class='icon'/>
      <span id='weather-now-wind' class='p'></span>
    </div>
    <div id='weather-option' class='option-more' onclick='page.$refs.weatherForecast.moreWeather()'>+</div>
  </div>
  `,
  name: "weather-now",

  data: () => {
    return {
    }
  },

  methods: {
    showWeather: (resultWeather) => {
      const forecast = document.querySelector("#weather-now-forecast");
      forecast.innerText = resultWeather.weather[0].description;  
      
      const temperature = document.querySelector("#weather-now-temperature");
      temperature.innerText = (resultWeather.main.temp-273).toFixed(0) + "°C"
        
      const wind = document.querySelector("#weather-now-wind");
      const mphWind = (2.2369362920544 * resultWeather.wind.speed).toFixed(0) + "mph";
      wind.innerText = mphWind
    },
  }
});
