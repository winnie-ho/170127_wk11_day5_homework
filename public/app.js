//Running the app
var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=100&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var responseRuns;

const setRuns = (result) => {
  responseRuns = result;
  computeWeek(responseRuns);
}

const renderDate = (rawDate) => {
  return rawDate.substr(8,2) + "-" + rawDate.substr(5,2) + "-"+ rawDate.substr(0,4);
}

const renderDistance = (rawDistance) => {
  return ((rawDistance)/1000).toFixed(2) + "km";
}

const renderTime = (rawTime) => {
  const totalMinutes = (rawTime/60).toFixed(2);
  const hours = Math.floor(totalMinutes/60);
  const rawMinutes = (Math.floor(totalMinutes - (hours*60))).toFixed(0);
  let minutes = rawMinutes;
    if(rawMinutes < 10){
      minutes = "0" + rawMinutes;
    }
  const rawSeconds = (((totalMinutes - (hours*60))-minutes)*60).toFixed(0);
  let seconds = rawSeconds;
    if (rawSeconds < 10) {
      seconds = "0" + rawSeconds
    }
  if (hours === 0) {
    return minutes + ":" + seconds;
  } else {
    return hours + ":" + minutes + ":" + seconds;
  }
}

const renderPace = (rawTime, rawDistance) => {
  const totalMinutes = (rawTime/60).toFixed(2);
  const paceMinutes = (Math.floor(totalMinutes/(rawDistance/1000))).toFixed(0) 
  let rawPaceSeconds = (((totalMinutes/(rawDistance/1000))-paceMinutes)*60).toFixed(0);
  let paceSeconds = rawPaceSeconds;
    if(rawPaceSeconds < 10){
      paceSeconds = "0" + rawPaceSeconds;
    }
  return paceMinutes + ":" + paceSeconds + "/km";
 
}

const app = () => {
  makeRequest(urlRuns, setRuns);
  makeRequest(urlWeatherNow, showWeather);
  makeRequest(totalStatsUrl, renderYearTotals);
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