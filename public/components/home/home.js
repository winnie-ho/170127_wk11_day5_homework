// Totals and stats per athlete
const totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

const renderYearTotals = (result) => {
  showDistance(result);
  showTime(result);
  showRuns(result);
}

const showDistance = (result) => {
  const yearDistanceDiv = document.getElementById("year-distance");
  const yearDistance = ((result.ytd_run_totals.distance)/1000).toFixed(0);
  yearDistanceDiv.innerHTML = yearDistance + " km";
}

const showTime = (result) => {
  const yearTimeDiv = document.getElementById("year-time");
  const yearTime = ((result.ytd_run_totals.moving_time)/3600).toFixed();
  yearTimeDiv.innerHTML = yearTime + " hours";
}

const showRuns = (result) => {
  const yearRunsDiv = document.getElementById("year-runs");
  const yearRuns = result.ytd_run_totals.count;
  yearRunsDiv.innerHTML = yearRuns + " runs";
}

const renderWeek = (weekRuns) => {
  for (let activity of weekRuns){
    let dayValue = new Date(activity.start_date).getDay();
    
    let dayLookUp = {
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
      0: "SUN"
    }
    let dayDiv = document.getElementById(dayLookUp[dayValue]);
    dayDiv.innerHTML = dayLookUp[dayValue] + " " + activity.name + "  " + (activity.distance/1000).toFixed(2) + "km  " ;
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