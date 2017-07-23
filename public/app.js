//Running the app
var app = function(){
  // weather now snapshot
  makeRequest(urlWeatherNow, showWeather);
}

window.onload = app;



//ACTIVITY PHOTO CALL
// var photoURL = "https://www.strava.com/api/v3/activities/1091623854/photos?photo_sources=true&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
// makeRequest(photoURL, requestTestComplete);


//weather from strava api
  // var url = "https://www.strava.com/api/v3/activities/123"
  // makeRequest(url, requestComplete)