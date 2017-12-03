let monthSummaries;

const showRun = (responseRuns) => {
  createMonthSummaries(responseRuns);
  renderList(responseRuns);
}

const createMonthSummaries = (responseRuns) => {
  monthSummaries = [];
  let distanceCounter = 0;
  let runCounter = 0;
  let rideCounter = 0;
  let swimCounter = 0;

  let month1;
  let month2;

  for (i = 0; i < responseRuns.length; i ++) {
    let run = responseRuns[i];
    month1 = new Date(run.start_date).getMonth();

    if (i < responseRuns.length-1) {
      let nextRun = responseRuns[i+1];
      month2 = new Date(nextRun.start_date).getMonth();
    }

    if (month1 === month2) {
      distanceCounter += run.distance;
      if (run.type === "Run") runCounter ++;
      if (run.type === "Ride") rideCounter ++;
      if (run.type === "Swim") swimCounter ++;
    }

    if (month2 !== month1) {
      let summary = {
        month: monthLookUpLong[month1+1].toUpperCase(),
        distance: renderDistance(distanceCounter),
        runs: runCounter,
        cycles: rideCounter,
        swims: swimCounter
      };
  
      distanceCounter = 0;
      runCounter = 0;
      rideCounter = 0;
      swimCounter = 0;
  
      monthSummaries.push(summary);
    }

  }
}

const renderList = (responseRuns) => {
  let runsDiv = document.querySelector("#run-list");
  runsDiv.innerHTML = "";
  let month1;
  let month2;

  let msIndex = 0;
  
  for (i = 0; i < responseRuns.length; i ++) {
    let activitySummary;
    let run = responseRuns[i];

    if (i === 0) {
      let firstMonthSummary = createMonthSummary(msIndex);
      runsDiv.appendChild(firstMonthSummary);
      msIndex ++;
    }
    
    if (i < responseRuns.length-1) {
      let nextRun = responseRuns[i+1];
      month1 = new Date(run.start_date).getMonth();
      month2 = new Date(nextRun.start_date).getMonth();
    } else {
      return;
    }
    
    if (month1 === month2) {
      activitySummary = createActivitySummary(run.id, run.start_date, run.name, run.distance, run.moving_time, run.type); 
      runsDiv.appendChild(activitySummary);
    } 
    
    if (month2 !== month1) {
      activitySummary = createActivitySummary(run.id, run.start_date, run.name, run.distance, run.moving_time, run.type); 
      runsDiv.appendChild(activitySummary);
      let otherMonthSummary = createMonthSummary(msIndex);
      runsDiv.appendChild(otherMonthSummary);
      if (msIndex < monthSummaries.length -1 ) {
        msIndex ++;
      }
    }
    
  }
}

const createMonthSummary = (msIndex) => {
  let monthSummaryData = monthSummaries[msIndex];
  
  let monthSummaryDiv = document.createElement("div");
  monthSummaryDiv.classList.add("month-summary", "heading");
  let monthTotalDistance = document.createElement("div");
  let monthTotalActivities = document.createElement("div");
  
  monthTotalDistance.innerHTML = monthSummaryData.month + ": " + monthSummaryData.distance;
  monthTotalActivities.innerHTML = "RUNS: " + (monthSummaryData.runs+1) + ", CYCLES: " + monthSummaryData.cycles + ", SWIMS: " + monthSummaryData.swims;

  append(monthSummaryDiv, [monthTotalDistance, monthTotalActivities]);
  return monthSummaryDiv;
}

// Calculate each month totals
  // Store in an array to access later.

// Display Month Totals
  // When two more are different, display the next summary.

// Display each Run
  // When two months are the same, just display run.
