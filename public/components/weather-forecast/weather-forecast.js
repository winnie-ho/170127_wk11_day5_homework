var urlWeatherForecast = "http://api.openweathermap.org/data/2.5/forecast?id=2650225&appid=b7114aca731d927ad002d0a518f38dfe"

var weatherForecastResponse= function (){
  if (this.status !== 200) return;
  result = JSON.parse(this.responseText);
  console.log("week weather forecast", result);
  showWeekWeatherForecast(result);
}

var showWeekWeatherForecast = function(resultWeekWeatherForecast){
  var weatherForecast=document.querySelector("#weather-forecast");
  for(var slot of resultWeekWeatherForecast.list){
    var dateTime=document.createElement("div");
    dateTime.id="date-time";
    var timeSnap=document.createElement("div");
    timeSnap.id="time-snap";
    
    if(parseInt((slot.dt_txt).substr(8,2)) % 2 === 0 ) {
      timeSnap.classList.add("even");
    } else {
      timeSnap.classList.add("odd");
    }

    var time=document.createElement("span");
    var forecast=document.createElement("span");
    var temperature=document.createElement("span");
    var wind=document.createElement("span");

    dateTime.innerText=(slot.dt_txt).substr(8,2) + " / " + (slot.dt_txt).substr(5,2);

    time.innerText=(slot.dt_txt).substr(11,5);
    forecast.innerText=(slot.weather[0].description);
    temperature.innerText=(slot.main.temp-273).toFixed(0) + "°C";
    wind.innerText=((slot.wind.speed)*2.2369362920544).toFixed(0) + "mph";

    weatherForecast.appendChild(dateTime);
    dateTime.appendChild(timeSnap);
    timeSnap.appendChild(time);
    timeSnap.appendChild(forecast);
    timeSnap.appendChild(temperature);
    timeSnap.appendChild(wind);
  }
}


