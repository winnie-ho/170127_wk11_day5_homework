var urlWeatherForecast = "http://api.openweathermap.org/data/2.5/forecast?id=2650225&appid=b7114aca731d927ad002d0a518f38dfe"

var moreWeather = function(){
	var weekWeatherDiv = document.getElementById('weather-forecast');
	var weatherOption = document.getElementById('weather-option');

	if (weekWeatherDiv.style.display === 'none') {
			weekWeatherDiv.style.display = 'flex';
      makeRequest(urlWeatherForecast, showWeekWeatherForecast);
			weatherOption.innerText="–"
	} else {
			weekWeatherDiv.style.display = 'none';
			weatherOption.innerText="+"
	}
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
    var icon=document.createElement("img");
    var temperature=document.createElement("span");
    var wind=document.createElement("span");

    dateTime.innerText=(slot.dt_txt).substr(8,2) + " / " + (slot.dt_txt).substr(5,2);

    time.innerText=(slot.dt_txt).substr(11,5);
    forecast.innerText=(slot.weather[0].description);
    icon.src = "http://openweathermap.org/img/w/" + (slot.weather[0].icon) + ".png";
    temperature.innerText=(slot.main.temp-273).toFixed(0) + "°C";
    wind.innerText=((slot.wind.speed)*2.2369362920544).toFixed(0) + "mph";

    weatherForecast.appendChild(dateTime);
    dateTime.appendChild(timeSnap);
    timeSnap.appendChild(time);
    timeSnap.appendChild(forecast);
    timeSnap.appendChild(icon);
    timeSnap.appendChild(temperature);
    timeSnap.appendChild(wind);
  }
}








