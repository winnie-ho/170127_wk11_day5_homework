// Totals and stats per athlete
const totalStatsUrl = "https://www.strava.com/api/v3/athletes/3752965/stats\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

let weekInViewIndex = 0;
let weekSets = [];

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

    let weekInViewDiv = document.getElementById("dateInView");

    if (weekInViewIndex === 0) {
      weekInViewDiv.innerHTML = "THIS WEEK";
    } else {
      weekInViewDiv.innerHTML = "WC: " + renderDate(activity.start_date);
    }

    let rawTime = activity.moving_time;
    let rawDistance = activity.distance;
    let dayDiv = document.getElementById(dayLookUp[new Date(activity.start_date).getDay()]);

    dayDiv.activity_id = activity.id;    
    dayDiv.classList.add("day-title--active");
    dayDiv.onclick = viewRun;
    
    if (activity.distance === 0) {
      dayDiv.innerHTML = activity.name + "<br>" + renderTime(rawTime);
    } else {
    dayDiv.innerHTML = activity.name + "<br>" + (activity.distance/1000).toFixed(2) + "km,  " + renderTime(rawTime) + ", " + renderPace(rawTime, rawDistance);
    }
  }
}

const computeWeek = (responseRuns) => {
  let monIndexArray = responseRuns.filter(run => (new Date (run.start_date).getDay()===1));
  
  let firstIndex = 0;
  monIndexArray.forEach(monRun => {
    let secondIndex = responseRuns.findIndex(run => (run.id === monRun.id));
    
    let weekRuns = responseRuns.filter(run => {
      if (firstIndex === 0) {
        return (firstIndex <= responseRuns.indexOf(run) && responseRuns.indexOf(run) <= secondIndex);
      }
      return (firstIndex < responseRuns.indexOf(run) && responseRuns.indexOf(run) <= secondIndex);
    });
    weekSets.push(weekRuns);
    firstIndex = secondIndex;
  })
  let weekInView = weekSets[weekInViewIndex];
  renderWeek(weekInView);
}


const changeWeek = (num) => {
  weekInViewIndex += num;
  if (weekInViewIndex < 0) {
    weekInViewIndex = 0;
  }
  let mon = document.querySelector("#MON");
  let tue = document.querySelector("#TUE");
  let wed = document.querySelector("#WED");
  let thu = document.querySelector("#THU");
  let fri = document.querySelector("#FRI");
  let sat = document.querySelector("#SAT");
  let sun = document.querySelector("#SUN");

  mon.innerHTML = "";  
  tue.innerHTML = "";
  wed.innerHTML = "";
  thu.innerHTML = "";
  fri.innerHTML = "";
  sat.innerHTML = "";
  sun.innerHTML = "";
  mon.classList.remove("day-title--active");
  tue.classList.remove("day-title--active");
  wed.classList.remove("day-title--active");
  thu.classList.remove("day-title--active");
  fri.classList.remove("day-title--active");
  sat.classList.remove("day-title--active");
  sun.classList.remove("day-title--active");
  
  renderWeek(weekSets[weekInViewIndex]);
}

