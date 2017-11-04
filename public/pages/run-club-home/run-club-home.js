const renderRunClubHome = (runClubRuns) => {
  const lastRC = runClubRuns[0];

  document.querySelector("#last-rc__date").innerHTML = "LAST RAN: " + renderDate(lastRC.start_date);
  document.querySelector("#last-rc__name").innerHTML = lastRC.name;
  document.querySelector("#last-rc__time").innerHTML = renderTime(lastRC.moving_time);
  document.querySelector("#last-rc__pace").innerHTML = renderPace(lastRC.moving_time, lastRC.distance);
}

