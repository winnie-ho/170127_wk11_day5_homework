//Running the app


let responseRuns;

const setRuns = (result) => {
  responseRuns = result;
  computeWeek(responseRuns);
}

const app = () => {
  authProcess();
}


window.onload = app;


//activity stream from strava api
// const urlFollowing = "https://www.strava.com/api/v3/activities/following"+userToken;
// const followingComplete = () => {
//   console.log("FINISHING following");  
// }
// makeRequest(urlFollowing, followingComplete);


//activity stream from strava api
// const urlStream = "https://www.strava.com/api/v3/activities/1310865546/streams/latlng,time,heartrate"+userToken;
// const streamComplete = () => {
//   console.log("FINISHING STREAM");  
// }
// makeRequest(urlStream, streamComplete);



//activities from those user follows from strava api
// const urlFollowing = "https://www.strava.com/api/v3/activities/following?per_page=100&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
// makeRequest(urlFollowing, followingComplete)
// const followingComplete = () => {
//   console.log("FINISHING FOLLOWING");  
// }

//weather from strava api
  // const url = "https://www.strava.com/api/v3/activities/123"
  // makeRequest(url, requestComplete)

//races from strava api
  // const raceListUrl = "https://www.strava.com/api/v3/running_races?year=2017&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // const requestComplete = function(){
  //   console.log("Race list");
  // }
  // makeRequest(raceListUrl, requestComplete);

  // const lapListUrl = "https://www.strava.com/api/v3/activities/1106619701/laps\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // const requestComplete = function(){
  //   console.log("Lap list");
  // }
  // makeRequest(lapListUrl, requestComplete);


//race details from strava api
  // const raceDetaillUrl = "https://www.strava.com/api/v3/running_races?id=1048&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // const requestComplete = function(){
  //   console.log("Race detail");
  // }
  // makeRequest(raceDetaillUrl, requestComplete);




// Athlete friends
  // const athleteFriendsUrl = "https://www.strava.com/api/v3/athlete/friends\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // const requestComplete = function(){
  //   console.log("List of athletes friends");
  // }
  // makeRequest(athleteFriendsUrl, requestComplete);

// Athlete by id friends
  // const athleteFriendsUrl = "https://www.strava.com/api/v3/athletes/11537738/friends\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  // const requestComplete = function(){
  //   console.log("List of friends for athlete with id");
  // }
  // makeRequest(athleteFriendsUrl, requestComplete);