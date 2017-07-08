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
    var dateTime = document.querySelector("#date-time");
    var time = document.querySelector("#time");
    var forecast = document.querySelector("#forecast");
    var temperature = document.querySelector("#temperature");
    var wind = document.querySelector("#wind");
    // var dateTime = document.createElement("div");
    // dateTime.id = "date-time"
    // var time = document.createElement("p");
    // var description=document.createElement("div");
    // description.id="parent_box";
    // var forecast=document.createElement("p");
    // var temperature=document.createElement("p");
    // var wind=document.createElement("p");



    dateTime.innerHTML=(slot.dt_txt).substr(0,10);
    time.innerText=(slot.dt_txt).substr(11,16);
    forecast.innerText=(slot.weather[0].description);
    temperature.innerText=(slot.main.temp-273).toFixed(0) + "°C";
    wind.innerText=((slot.wind.speed)*2.2369362920544).toFixed(0) + "mph";


    // description.appendChild(time);
    // description.appendChild(forecast);
    // description.appendChild(temperature);
    // description.appendChild(wind);
    // dateTime.appendChild(description);
    // weekWeatherDiv.appendChild(dateTime);
  }
}


