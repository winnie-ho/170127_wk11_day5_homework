let pb = (22 * 60) + 54;

const renderParkRunHome = (parkRuns) => {

  let clone = parkRuns.slice();
	let distanceCheck = clone.filter(run => run.distance > 5000);

  const lastPR = parkRuns[0];
  const finishTimes = distanceCheck.map(run => run.moving_time);
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
  const orderedPRTimes = parkRuns.slice().sort((a,b) => a.moving_time - b.moving_time);
  const lastPRRank = orderedPRTimes.indexOf(lastPR);

  if (lastPRRank === 0 && lastPR.distance >= 5000) {
    return "Fastest this year!";
  }

  if (lastPR.distance < 5000) {
    return "RUN INCOMPLETE! " + renderDistance(lastPR.distance) + " of 5km in " + renderTime(lastPR.moving_time);
  }
  
  return ordinalSuffixOf(lastPRRank) + " fastest this year";
}

const showParkRunSplits = () => {
  handleNavButton("park-run-splits");
}

const showParkRunGraphs = () => {
  handleNavButton("park-run-graphs");
}

const computePBContext = (lastPR) => {
  if (lastPR.moving_time < pb && lastPR.distance >= 5000) {
    pb = lastPR.moving_time;
    return "NEW PB! " + renderTime(lastPR.moving_time);
  }
  return "PB remains at " + renderTime(pb);
}

const computeYBContext = (lastPR, yearBest) => {
  if (lastPR.moving_time < yearBest && lastPR.distance >= 5000) {
    return "Fastest time this year! " + renderTime(lastPR.moving_time);
  }
  return "Year best " + renderTime(yearBest);
}
