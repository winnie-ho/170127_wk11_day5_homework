var urlWeatherForecast = "http://api.openweathermap.org/data/2.5/forecast?id=2650225&appid=b7114aca731d927ad002d0a518f38dfe"

var weatherForecastResponse= function (){
  if (this.status !== 200) return;
  result = JSON.parse(this.responseText);
  console.log("week weather forecast", result);
  showWeekWeatherForecast(result);
}

var showWeekWeatherForecast = function(resultWeekWeatherForecast){
  console.log("WEEK WEATHER", resultWeekWeatherForecast.list);

  for(var slot of resultWeekWeatherForecast.list){
    var weekWeatherDiv = document.querySelector("#week-forecast");
    var dateTime = document.createElement("div");
    dateTime.id = "date-time"
    var time = document.createElement("p");
    var description=document.createElement("div");
    description.id="parent_box";
    var forecast=document.createElement("p");
    var temperature=document.createElement("p");
    var wind=document.createElement("p");



    dateTime.innerHTML=(slot.dt_txt).substr(0,10);
    time.innerText=(slot.dt_txt).substr(11,16);
    forecast.innerText=(slot.weather[0].description);
    temperature.innerText=(slot.main.temp-273).toFixed(0) + "°C";
    wind.innerText=((slot.wind.speed)*2.2369362920544).toFixed(0) + "mph";


    description.appendChild(time);
    description.appendChild(forecast);
    description.appendChild(temperature);
    description.appendChild(wind);
    dateTime.appendChild(description);
    weekWeatherDiv.appendChild(dateTime);
  }
}


var moreWeather = function(){
    var weekWeatherDiv = document.getElementById('week-forecast');
    var weatherOption = document.getElementById('weather-option');

    if (weekWeatherDiv.style.display === 'none') {
        weekWeatherDiv.style.display = 'flex';
        weatherOption.innerText="–"
    } else {
        weekWeatherDiv.style.display = 'none';
        weatherOption.innerText="+"
    }
}