// Totals and stats per athlete
const totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

const renderYearTotals = result => {
  showDistance(result);
  showTime(result);
  showRuns(result);
}

const showDistance = result => {
  const yearDistanceDiv = document.getElementById("year-distance");
  const yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(0);
  yearDistanceDiv.innerHTML = yearDistance + " km";
}

const showTime = result => {
  const yearTimeDiv = document.getElementById("year-time");
  const yearTime = ((result.ytd_run_totals.moving_time)/3600).toFixed();
  yearTimeDiv.innerHTML = yearTime + " hours";
}

const showRuns = result => {
  const yearRunsDiv = document.getElementById("year-runs");
  const yearRuns = result.ytd_run_totals.count;
  yearRunsDiv.innerHTML = yearRuns + " runs";
}

// Last week of runs
const urlLast7 = "https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

const renderWeek = weekRuns => {
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

const computeWeek = result => {
  let weekRuns = [];

  let monIndex = result.findIndex(run=>(new Date(run.start_date).getDay() === 1));

  for (let i=0; i<=monIndex; i++){
    weekRuns.push(result[i]);
  }

  renderWeek(weekRuns); 
}
