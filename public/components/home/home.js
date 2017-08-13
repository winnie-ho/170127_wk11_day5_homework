// Totals and stats per athlete
var totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var handleHomeButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var parkRunsDiv = document.getElementById('park-runs');
  var runsDiv = document.getElementById('runs');
  var homeDiv = document.getElementById('home');
  var weatherForecast = document.getElementById('weather-forecast');
    if (homeDiv.style.display === 'none') {
        parkRunsDiv.style.display = 'none';
        runClubDiv.style.display = 'none';
        runsDiv.style.display = 'none';
        homeDiv.style.display = 'flex';
    }
}

var renderYearTotals = function(result){
  showDistance(result);
  showTime(result);
  showRuns(result);
}

var showDistance = function(result){
  var yearDistanceDiv = document.getElementById("year-distance");
  var yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(0);
  yearDistanceDiv.innerHTML = yearDistance + " km";
}

var showTime = function(result){
  var yearTimeDiv = document.getElementById("year-time");
  var yearTime = ((result.ytd_run_totals.moving_time)/3600).toFixed();
  yearTimeDiv.innerHTML = yearTime + " hours";
}

var showRuns = function(result){
  var yearRunsDiv = document.getElementById("year-runs");
  var yearRuns = result.ytd_run_totals.count;
  yearRunsDiv.innerHTML = yearRuns + " runs";
}

// Last week of runs
var urlLast7 = "https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var renderWeek = function(weekRuns){
  for (let activity of weekRuns){
    let activityDiv = document.createElement("div");
    activityDiv.classList.add("day-activity");
    
    activityDiv.innerHTML = activity.name + "  " + (activity.distance/1000).toFixed(2) + "km  " ;

    let dayIndex = new Date(activity.start_date).getDay();
    
    let dayLookUp = {
      1: "mon",
      2: "tue",
      3: "wed",
      4: "thu",
      5: "fri",
      6: "sat",
      0: "sun"
    }
    let dayDiv = document.getElementById(dayLookUp[dayIndex]);
    dayDiv.appendChild(activityDiv);

    dayDiv.style.width = "100%";
  }
}

var computeWeek = function(result){
  let weekRuns = [];
  let mon = result.find(run=>(new Date(run.start_date).getDay() === 1));
  let monIndex = result.findIndex(run=>(new Date(run.start_date).getDay() === 1));

  for (let i=0; i<=monIndex; i++){
    weekRuns.push(result[i]);
  }
  renderWeek(weekRuns); 
}




makeRequest(urlLast7, computeWeek);
