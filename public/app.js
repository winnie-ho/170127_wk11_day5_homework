// Methods
var ResultInfo = null;

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var makeAuthRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  ResultInfo = JSON.parse(jsonString);
  var resultArray = ResultInfo;
  
    var centre = {lat: 55.9533, lng:-3.1883 };
    var mapDiv = document.querySelector("#main-map");
    mapDiv.innerHTML = "";
    var mainMap = new MapWrapper(centre, 14);


  var handleViewButton = function(){
    console.log("viewbutton clicked");
    var runSelected = JSON.parse(event.target.value);
    var runLine = runSelected.map.summary_polyline;
    var startPoint = {lat: ((runSelected.start_latlng[0] + runSelected.end_latlng[0])/2), lng: ((runSelected.start_latlng[1] + runSelected.end_latlng[1])/2)};
    mainMap.addPolyline(runLine, startPoint);
  }


  var handleNearMeButton = function(){
    console.log("Near Me button clicked");
    mainMap.geoLocate(resultArray);
  }

  var nearMeButton = document.querySelector("#near-me");
  nearMeButton.onclick = handleNearMeButton;

  showRun(resultArray, handleViewButton);


  var dayArray = popDayArray(ResultInfo);
  var distanceArray = popDistanceArray(ResultInfo);
  new ColumnChart("THE MILES SO FAR...", "Distance (km)", distanceArray, dayArray);
}

var popDayArray = function(ResultInfo){
  var dayArray = [];
  for(var run of ResultInfo){
    dayArray.push(run.start_date.substr(0,10));
  }
  return dayArray;
}

var popDistanceArray = function(ResultInfo){
  var distanceArray = [];
  for(var run of ResultInfo){
    distanceArray.push(run.distance/1000);
  }
  return distanceArray;
}



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

var requestWeekWeatherForecast = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  resultWeekWeatherForecast = JSON.parse(jsonString);
  var resultArray = resultWeekWeatherForecast;
  console.log("week weather forecast", resultArray);
  showWeekWeatherForecast(resultArray);
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



// var handleSearch = function(){
//   var searchQuery = document.getElementById("search-query");
//   var albumsDiv = document.getElementById("albums");

//   searchQuery.onkeyup = function (){
//     var url = "https://api.spotify.com/v1/search?q=" + this.value + "&type=album";
//     localStorage.setItem("urlSearch", this.value);
//     makeRequest(url, requestComplete);
//   } 
// }

// var setSearchText = function(text){
//   var searchBox = document.querySelector("#search-query");
//   searchBox.value = text;
// }



var showRun = function(resultArray, handleViewButton){
  console.log(resultArray);
  var runsDiv = document.querySelector("#runs");
    runsDiv.innerHTML = "";
    resultArray.forEach(function(run){
    var parentBox = document.createElement("div")
    parentBox.id = "parent_box"
    runsDiv.appendChild(parentBox);

    // var mapD = document.createElement("div");
    // mapD.id = "map"
    // this.googleMap = new google.maps.Map(mapD, {
    //   center: {lat: 55.9533, lng:-3.1883 },
    //   zoom: 13
    //   });

    // parentBox.appendChild(mapD);

    var sectionBox = document.createElement("div")
    sectionBox.id = "section_box"
    parentBox.appendChild(sectionBox);

    var dateTitle = document.createElement("h3");
    dateTitle.innerText = run.start_date.substr(8,2) + "/" + run.start_date.substr(5,2) + "/"+ run.start_date.substr(0,4) + "    |    " +  run.name;
    sectionBox.appendChild(dateTitle);

    var dtp = document.createElement("p");
    dtp.innerText = "Distance: " + ((run.distance)/1000).toFixed(2) + " km   Time: " + ((run.moving_time)/60).toFixed(2)+ "mins    Pace: " + run.average_speed + "m/s";
    sectionBox.appendChild(dtp);

    // var startPoint = document.createElement("p");
    // startPoint.innerText = "Start: " + run.start_latlng[0] + ", " + run.start_latlng[1];
    // sectionBox.appendChild(startPoint);
    

    // var route = document.createElement("p");
    // route.innerText = "Route: " + run.map.summary_polyline;
    // sectionBox.appendChild(route);

    var detailButton = document.createElement("button");
    detailButton.innerHTML = "View";
    detailButton.value = JSON.stringify(run);
    detailButton.style.color = "white";
    parentBox.appendChild(detailButton);
    detailButton.onclick = handleViewButton;

    
  });

}






//Running the app
var app = function(){
  var url = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  makeRequest(url, requestComplete)

//weather
  // var url = "https://www.strava.com/api/v3/activities/123"
  // makeRequest(url, requestComplete)

  var urlWeather = "http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=b7114aca731d927ad002d0a518f38dfe"
  makeRequest(urlWeather, requestCompleteWeather);

  var urlWeekWeatherForecast = "http://api.openweathermap.org/data/2.5/forecast?id=2650225&appid=b7114aca731d927ad002d0a518f38dfe"
  makeRequest(urlWeekWeatherForecast, requestWeekWeatherForecast);

}

window.onload = app;





