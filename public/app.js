//Running the app
var app = () => {
  // weather now snapshot
  makeRequest(urlWeatherNow, showWeather);
  makeRequest(totalStatsUrl, renderYearTotals);
  makeRequest(urlLast7, computeWeek);
}

window.onload = app;



//ACTIVITY PHOTO CALL
// var photoURL = "https://www.strava.com/api/v3/activities/1091623854/photos?photo_sources=true&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
//   var requestComplete = function(){
//     console.log("Race list");
//   }
// makeRequest(photoURL, requestComplete);


//weather from strava api
  // var url = "https://www.strava.com/api/v3/activities/123"
  // makeRequest(url, requestComplete)

//races from strava api
  // var raceListUrl = "https://www.strava.com/api/v3/running_races?year=2017&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // var requestComplete = function(){
  //   console.log("Race list");
  // }
  // makeRequest(raceListUrl, requestComplete);

  // var lapListUrl = "https://www.strava.com/api/v3/activities/1106619701/laps\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // var requestComplete = function(){
  //   console.log("Lap list");
  // }
  // makeRequest(lapListUrl, requestComplete);


//race details from strava api
  // var raceDetaillUrl = "https://www.strava.com/api/v3/running_races?id=1048&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // var requestComplete = function(){
  //   console.log("Race detail");
  // }
  // makeRequest(raceDetaillUrl, requestComplete);




// Athlete friends
  // var athleteFriendsUrl = "https://www.strava.com/api/v3/athlete/friends\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // var requestComplete = function(){
  //   console.log("List of athletes friends");
  // }
  // makeRequest(athleteFriendsUrl, requestComplete);

// Athlete by id friends
  // var athleteFriendsUrl = "https://www.strava.com/api/v3/athletes/11537738/friends\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // var requestComplete = function(){
  //   console.log("List of friends for athlete with id");
  // }
  // makeRequest(athleteFriendsUrl, requestComplete);

// Activity kudos
//   var activityKudosUrl = "https://www.strava.com/api/v3/activities/1099567918/kudos\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
//   var requestComplete = function(){
//     console.log("Kudos for a given activity");
//   }
// makeRequest(activityKudosUrl, requestComplete);