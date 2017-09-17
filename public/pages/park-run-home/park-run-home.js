const renderParkRunHome = (parkRuns) => {
  const lastPR = parkRuns[0];
  const finishTimes = parkRuns.map(run => run.moving_time);
  const orderedFinishTimes = finishTimes.sort((a, b) => a - b);
  const yearBest = orderedFinishTimes[0];

  document.querySelector("#last-pr__date").innerHTML = "LAST RAN: " + renderDate(lastPR.start_date);
  document.querySelector("#last-pr__name").innerHTML = lastPR.name;
  document.querySelector("#last-pr__time").innerHTML = renderTime(lastPR.moving_time);
  document.querySelector("#last-pr__pace").innerHTML = renderPace(lastPR.moving_time, lastPR.distance);
  document.querySelector("#last-pr__context").innerHTML = computeLastPRContext(parkRuns);
  document.querySelector("#pb").innerHTML = computePBContext(lastPR);
  document.querySelector("#year-best").innerHTML = computeYBContext(lastPR, yearBest);
}

const computeLastPRContext = (parkRuns) => {
  const lastPR = parkRuns[0];
  const orderedPR = parkRuns.sort((a, b) => a.moving_time - b.moving_time);
  
  const lastPRRank = orderedPR.indexOf(lastPR)+1;
  return ordinalSuffixOf(lastPRRank) + " fastest this year";
}

const showParkRunSplits = () => {
  handleNavButton("park-run-splits");
}

const computePBContext = (lastPR) => {
  const pb = (22 * 60) + 54;
  if (lastPR.moving_time < pb) return "New PB! " + renderTime(lastPR.moving_time);
  return "PB remains at " + renderTime(pb);
}

const computeYBContext = (lastPR, yearBest) => {
  if (lastPR.moving_time < yearBest) return "Fastest time this year! " + renderTime(lastPR.moving_time);
  return "Year best remains at " + renderTime(yearBest);
}
