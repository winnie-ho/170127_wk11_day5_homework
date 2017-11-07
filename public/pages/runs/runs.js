const showRun = (responseRuns) => {
  let runsDiv = document.querySelector("#runs");
  runsDiv.innerHTML = "";

  responseRuns.forEach(run => {
    let activitySummary = createActivitySummary(run.id, run.start_date, run.name, run.distance, run.moving_time, run.type); 
    runsDiv.appendChild(activitySummary);
  });
}