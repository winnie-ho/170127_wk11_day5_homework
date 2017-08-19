// Totals and stats per athlete
const totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

const renderYearTotals = (result) => {
  showDistance(result);
  showTime(result);
  showRuns(result);
}

const showDistance = (result) => {
  const yearDistanceDiv = document.querySelector("#year-distance");
  yearDistanceDiv.innerHTML = ((result.ytd_run_totals.distance)/1000).toFixed(0) + " km";
}

const showTime = (result) => {
  const yearTimeDiv = document.querySelector("#year-time");
  yearTimeDiv.innerHTML = ((result.ytd_run_totals.moving_time)/3600).toFixed() + " hours";
}

const showRuns = (result) => {
  const yearRunsDiv = document.querySelector("#year-runs");
  yearRunsDiv.innerHTML = result.ytd_run_totals.count + " runs";
}

const renderWeek = (weekRuns) => {
  for (let activity of weekRuns){    
    let dayLookUp = {
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
      0: "SUN"
    }
    let rawTime = activity.moving_time;
    let rawDistance = activity.distance;

    let dayDiv = document.getElementById(dayLookUp[new Date(activity.start_date).getDay()]);
    dayDiv.innerHTML = activity.name + "  " + (activity.distance/1000).toFixed(2) + "km,  " + renderTime(rawTime) + ", " + renderPace(rawTime, rawDistance);
    dayDiv.style.width = "100%";
  }
}

const computeWeek = (responseRuns) => {
  let weekRuns = [];
  let monIndex = responseRuns.findIndex(run=>(new Date(run.start_date).getDay() === 1));

  for (let i=0; i<=monIndex; i++){
    weekRuns.push(responseRuns[i]);
  }
  renderWeek(weekRuns); 
}