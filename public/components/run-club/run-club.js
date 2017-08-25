const computeRunClubRuns = (responseRuns) => {
  const runClubRuns = responseRuns.filter(run => (55.94 < run.start_latitude < 55.95 && (run.start_longitude === -3.21 || run.start_longitude === -3.20) && (new Date (run.start_date_local)).getDay() === 1));

  let runClubDiv = document.querySelector("#run-club");
  runClubDiv.innerHTML = "";

  runClubRuns.forEach(run => {
    let activitySummary = createActivitySummary(run.start_date, run.name, run.distance, run.moving_time, run.id); 
    runClubDiv.appendChild(activitySummary);
  });
}