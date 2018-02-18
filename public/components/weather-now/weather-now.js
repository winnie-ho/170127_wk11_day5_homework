let weatherNow = Vue.component('weather-now', {
  template: `
  <div id="weather-now">
    <div class='data'>
      <img src='./resources/icon_forecast.png' class='icon'/>
      <span id='weather-now-forecast'>{{ description }}</span>
    </div>
    <div class='data'>
      <img src='./resources/icon_thermometer.png' class='icon'/>
      <span id='weather-now-temperature'>{{ temperature }}</span>
    </div>
    <div class='data'>
      <img src='./resources/icon_wind_sock.png' class='icon'/>
      <span id='weather-now-wind' class='p'>{{ wind }}</span>
    </div>
    <div id='weather-option' class='option-more' onclick='page.$refs.weatherForecast.moreWeather()'>+</div>
  </div>
  `,
  name: "weather-now",

  data: () => {
    return {
      description: "",
      temperature: "",
      wind: ""
    }
  },

  mounted() {
    makeRequest(config.urlWeatherNow, (response => {
      this.description = response.weather[0].description;
      this.temperature = (response.main.temp-273).toFixed(0) + "°C";
      this.wind = (2.2369362920544 * response.wind.speed).toFixed(0) + "mph";
    }));
  },

  methods: {
  },

  computed: {
  }
});
