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





