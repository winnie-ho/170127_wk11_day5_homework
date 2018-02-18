let weatherForecast = Vue.component('weather-forecast', {
  template: `
  <div id="weather-forecast">
    <div id="date-time"></div>
  </div>
  `,
  name: "weather-forecast",

  data: () => {
    return {
    }
  },

  methods: {
    showWeekWeatherForecast: (resultWeekWeatherForecast) => {
      const weatherForecast = document.querySelector("#weather-forecast");
      for (const slot of resultWeekWeatherForecast.list) {
        const dateTime = document.createElement("div");
        dateTime.id = "date-time";
        const timeSnap = document.createElement("div");
        timeSnap.id = "time-snap";
        
        if (parseInt((slot.dt_txt).substr(8,2)) % 2 === 0) {
          timeSnap.classList.add("even");
        } else {
          timeSnap.classList.add("odd");
        }
        
        const time = document.createElement("span");
        const forecast = document.createElement("span");
        const icon = document.createElement("img");
        const temperature = document.createElement("span");
        const wind = document.createElement("span");
        
        dateTime.innerText = renderDate(slot.dt_txt);
        
        time.innerText = (slot.dt_txt).substr(11,5);
        forecast.innerText = (slot.weather[0].description);
        icon.src = "http://openweathermap.org/img/w/" + (slot.weather[0].icon) + ".png";
        temperature.innerText = (slot.main.temp-273).toFixed(0) + "°C";
        wind.innerText = ((slot.wind.speed)*2.2369362920544).toFixed(0) + "mph";
        
        weatherForecast.appendChild(dateTime);
        dateTime.appendChild(timeSnap);
        append(timeSnap, [time, forecast, icon, temperature, wind])
      }
    },
    moreWeather: () => {
      const weekWeatherDiv = document.querySelector('#weather-forecast');
      const weatherOption = document.querySelector('#weather-option');
    
      if (weekWeatherDiv.style.display === 'none') {
          weekWeatherDiv.style.display = 'flex';
          makeRequest(config.urlWeatherForecast, page.$refs.weatherForecast.showWeekWeatherForecast);
          weatherOption.innerText = "–";
      } else {
          weekWeatherDiv.style.display = 'none';
          weatherOption.innerText = "+"
      }
    },
  }
});










