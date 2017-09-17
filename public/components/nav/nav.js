const handleNavButton = (page) => {
  const home = document.querySelector('#home');
  const weatherNow = document.querySelector('#weather-now');
  const runClub = document.querySelector('#run-club');
  const parkRunHome = document.querySelector('#park-run-home');
  const parkRunSplits = document.querySelector('#park-run-splits');
  const runs = document.querySelector('#runs');
  const weatherForecast = document.querySelector('#weather-forecast');
  const viewRun = document.querySelector('#view-run');
  const kudosDetail = document.querySelector('#kudos-detail');
  const lapsDetail = document.querySelector('#laps-detail');

   
  switch (page) {
    case "home-button":
      home.style.display = 'flex';
      weatherNow.style.display = 'flex';
      runClub.style.display = 'none';
      parkRunHome.style.display = 'none';
      parkRunSplits.style.display = 'none';
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      kudosDetail.style.display = 'none';
      lapsDetail.style.display = 'none';
      break;
      
      case "run-club-button":
      home.style.display = 'none';
      weatherNow.style.display = 'none';
      runClub.style.display = 'flex';
      parkRunHome.style.display = 'none';
      parkRunSplits.style.display = 'none';
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      kudosDetail.style.display = 'none';
      lapsDetail.style.display = 'none';
      computeRunClubRuns(responseRuns);
      break;
      
      case "park-run-home-button":
      home.style.display = 'none';
      weatherNow.style.display = 'none';
      runClub.style.display = 'none';
      parkRuns = [];
      parkRunHome.style.display = 'flex';
      parkRunSplits.style.display = 'none';      
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      kudosDetail.style.display = 'none';
      lapsDetail.style.display = 'none';
      computeParkRuns(responseRuns);
      renderParkRunHome(parkRuns);
      scatterChart("Park Run Matrix", "Park Runs", parkRuns);
      break;
      
      case "park-run-splits":
      home.style.display = 'none';
      weatherNow.style.display = 'none';
      runClub.style.display = 'none';
      parkRunHome.style.display = 'none';
      parkRunSplits.style.display = 'flex';
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      kudosDetail.style.display = 'none';
      lapsDetail.style.display = 'none';
      break;
      
      case "runs-button":
      home.style.display = 'none';
      weatherNow.style.display = 'none';
      runClub.style.display = 'none';
      parkRunHome.style.display = 'none';
      parkRunSplits.style.display = 'none';
      runs.style.display = 'flex';
      viewRun.style.display = 'none';
      kudosDetail.style.display = 'none';
      lapsDetail.style.display = 'none';
      showRun(responseRuns);  
      break;
      
      
      case "view-run":
      home.style.display = 'none';
      weatherNow.style.display = 'none';
      runClub.style.display = 'none';
      parkRunHome.style.display = 'none';
      parkRunSplits.style.display = 'none';
      runs.style.display = 'none';
      viewRun.style.display = 'flex';
      kudosDetail.style.display = 'none';
      lapsDetail.style.display = 'none';
      break;

      case "view-kudos":
      if (kudosDetail.style.display === 'none') {
        kudosDetail.style.display = 'flex';
      } else {
        kudosDetail.style.display = 'none';
      }
      break;

      case "view-laps":
      if (lapsDetail.style.display === 'none') {
        lapsDetail.style.display = 'flex';
      } else {
        lapsDetail.style.display = 'none';
      }
      break;
  }
}