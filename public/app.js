// Methods
var ResultInfo = null;

var makeRequest = function (url, callback) {
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
  
  var handleNearMeButton = function(){
    console.log("Near Me button clicked");
    mainMap.geoLocate(resultArray);
  }

  var nearMeButton = document.querySelector("#near-me");
  nearMeButton.onclick = handleNearMeButton;

  showRun(resultArray);
  showWeather(resultWeather)


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
    console.log(run.distance);
  }
  return distanceArray;
}



var requestCompleteWeather = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  resultWeather = JSON.parse(jsonString);
  var resultArray = resultWeather;
  console.log(resultArray);
}

var showWeather = function(resultWeather){
  var weatherDiv = document.querySelector("#weather");
  var description = document.createElement("h3");
  description.innerText = resultWeather.weather[0].description;
  weatherDiv.appendChild(description);

  var temp = document.createElement("p");
  temp.innerText = "Temperature: " + (resultWeather.main.temp-273).toFixed(0) + "°C"
  weatherDiv.appendChild(temp);

  var wind = document.createElement("p");
  wind.innerText = "Wind: " + (resultWeather.wind.speed) + "m/s"
  weatherDiv.appendChild(wind);

}

var requestCompleteWeatherForecast = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  resultWeatherForecast = JSON.parse(jsonString);
  var resultArray = resultWeatherForecast;
  console.log(resultArray);
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

// var showWeatherForecast = function(resultWeatherForecast){
//   var forecastDiv = document.querySelector("#forecast");
//   forecast = document.createElement("p");
//   forecast.innerText = resultWeatherForecast.
// }

var showRun = function(resultArray){
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
    dtp.innerText = "Distance: " + ((run.distance)/1000).toFixed(2) + " km   Time: " + ((run.moving_time)/60).toFixed(2)+ "mins    Pace: " + run.average_speed;
    sectionBox.appendChild(dtp);

    // var startPoint = document.createElement("p");
    // startPoint.innerText = "Start: " + run.start_latlng[0] + ", " + run.start_latlng[1];
    // sectionBox.appendChild(startPoint);
    

    // var route = document.createElement("p");
    // route.innerText = "Route: " + run.map.summary_polyline;
    // sectionBox.appendChild(route);

    var detailButton = document.createElement("button");
    detailButton.innerHTML = "View";
    detailButton.style.color = "white";
    sectionBox.appendChild(detailButton);
    });
}




//Running the app
var app = function(){
  var url = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  makeRequest(url, requestComplete)

  var urlWeather = "http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=b7114aca731d927ad002d0a518f38dfe"
  makeRequest(urlWeather, requestCompleteWeather);

  var urlWeatherForecast = "http://api.openweathermap.org/data/2.5/forecast?id=2650225&appid=b7114aca731d927ad002d0a518f38dfe"
  makeRequest(urlWeatherForecast, requestCompleteWeatherForecast);

}

window.onload = app;





