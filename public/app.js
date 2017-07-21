//Running the app
var app = function(){
  var url = "https://www.strava.com/api/v3/athlete/activities?per_page=10&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  makeRequest(urlRuns, requestComplete)

  makeRequest(urlWeatherNow, weatherNowResponse);

  makeRequest(urlWeatherForecast, weatherForecastResponse);

  makeRequest(urlRuns, requestParkRunsComplete);

//weather from strava api
  // var url = "https://www.strava.com/api/v3/activities/123"
  // makeRequest(url, requestComplete)
}

window.onload = app;


// Methods
var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}
