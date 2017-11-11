const showRun = (responseRuns) => {
  let runsDiv = document.querySelector("#runs");
  runsDiv.innerHTML = "";

  for (i = 0; i < responseRuns.length; i ++) {
    let activitySummary;
    let run = responseRuns[i];
    
    if (i < responseRuns.length-1) {
      let nextRun = responseRuns[i+1];
      date1 = new Date(run.start_date).getMonth();
      date2 = new Date(nextRun.start_date).getMonth();
    } else {
      return;
    }

    if (date1 !== date2) {
      let monthSummary = document.createElement("div");
      monthSummary.classList.add("month-summary", "heading");
      monthSummary.innerHTML = monthLookUpLong[date1].toUpperCase();
      activitySummary = monthSummary;
    } else {
      activitySummary = createActivitySummary(run.id, run.start_date, run.name, run.distance, run.moving_time, run.type); 
    }

    runsDiv.appendChild(activitySummary);
  }
}