var requestCompleteWeather = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  resultWeather = JSON.parse(jsonString);
  var resultArray = resultWeather;
  console.log("complete weather", resultArray);
  showWeather(resultWeather);
}



var showWeather = function(resultWeather){
  const temperature = document.querySelector("#temperature");
  temperature.innerText = (resultWeather.main.temp-273).toFixed(0) + "°C"
  
  const wind = document.querySelector("#wind");
  let msWind = resultWeather.wind.speed; 
  let mphWind = (2.2369362920544*msWind).toFixed(0);
  wind.innerText = mphWind + "mph"

  
  const forecast = document.querySelector("#forecast");
  forecast.innerText = resultWeather.weather[0].description;
}