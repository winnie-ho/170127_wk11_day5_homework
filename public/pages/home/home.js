// Totals and stats per athlete

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
    if (weekInViewIndex <= 0) {
      weekInViewDiv.innerHTML = "THIS WEEK";
    }
    if (weekInViewIndex === 1 ) {
      weekInViewDiv.innerHTML = "LAST WEEK";
    } 
    if (weekInViewIndex > 1) {
      weekInViewDiv.innerHTML = renderDate(weekRuns[0].start_date, "long");
    }

    weekRuns.forEach(activity => {
    let rawTime = activity.moving_time;
    let rawDistance = activity.distance;
    let dayDiv = document.getElementById(dayLookUp[new Date(activity.start_date).getDay()]);
    dayDiv.classList.add("day-title--active");
    
    let activityDiv = document.createElement("div");
    activityDiv.activity_id = activity.id;  
    activityDiv.onclick = viewRun;
    activityDiv.classList.add("activity-div");
    if (activity.distance === 0) {
      activityDiv.innerHTML = activity.name + "<br>" + renderTime(rawTime);
    } else {
      activityDiv.innerHTML = activity.name + "<br>" + (activity.distance/1000).toFixed(2) + "km,  " + renderTime(rawTime) + ", " + renderPace(rawTime, rawDistance);
    }
    dayDiv.appendChild(activityDiv);
  });
  computeDayNum();
}

const computeDayNum = () => {
  let dayLookUp = {
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
    0: "SUN"
  }
  for (i = 0; i < 7; i ++) {
    let dayDiv = document.getElementById(dayLookUp[i])
    dayDiv.nextSibling.innerHTML = "";
    let activityNum = dayDiv.children.length;
    if (activityNum > 1) {
      let dayNumDiv = dayDiv.nextSibling.innerHTML = ">";
    }
  }
}

const computeWeek = (responseRuns) => {
  const timeNow = new Date();
  const timeNowZeroed = timeNow.setHours(0,0,0,0);
  const msInWeek = (24 * 60 * 60 * 1000);
  
  switch(new Date().getDay()) {
    case 0:
      lastMonday = timeNowZeroed - (6 * msInWeek);
      break;
    case 1:
      lastMonday = timeNowZeroed - (7 * msInWeek);
      break;
    case 2:
      lastMonday = timeNowZeroed - (1 * msInWeek);
      break;
    case 3:
      lastMonday = timeNowZeroed - (2 * msInWeek);
      break;
    case 4:
      lastMonday = timeNowZeroed - (3 * msInWeek);
      break;    
    case 5:
      lastMonday = timeNowZeroed - (4 * msInWeek);
      break;    
    case 6:
      lastMonday = timeNowZeroed - (5 * msInWeek);
      break;
  }
  
  let marker1 = new Date().getTime();
  let marker2 = lastMonday;

  for (let i = 0; i < 60; i ++ ) {
    let weekRuns = responseRuns.filter(run => {
      return (new Date(run.start_date).getTime() < marker1) && (new Date(run.start_date).getTime() >= marker2);
    });
    
    marker1 = marker2;
    marker2 -= (7 * msInWeek);
    weekSets.push(weekRuns);
  }

  let weekInView = weekSets[weekInViewIndex];
  let renderWeekSets = weekSets.map(week => week.map(run => run.name));
  renderWeek(weekInView);
}


const changeWeek = (num) => {
  weekInViewIndex += num;
  if (weekInViewIndex < 0) {
    weekInViewIndex = 0;
  }

  let allDays = document.getElementsByClassName("day-title");

  for (let day of allDays) {
    day.innerHTML = "";
    day.classList.remove("day-title--active");
  }
  
  renderWeek(weekSets[weekInViewIndex]);
}

