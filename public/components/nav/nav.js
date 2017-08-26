const handleNavButton = (page) => {
  const home = document.querySelector('#home');
  const runClub = document.querySelector('#run-club');
  const parkRun = document.querySelector('#park-runs');
  const runs = document.querySelector('#runs');
  const weatherForecast = document.querySelector('#weather-forecast');
  const viewRun = document.querySelector('#view-run');
   
  switch (page) {
    case "home-button":
      home.style.display = 'flex';
      runClub.style.display = 'none';
      parkRun.style.display = 'none';
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      break;
      
      case "run-club-button":
      home.style.display = 'none';
      runClub.style.display = 'flex';
      parkRun.style.display = 'none';
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      computeRunClubRuns(responseRuns);
      break;
      
      case "park-run-button":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'flex';
      parkRuns = [];
      runs.style.display = 'none';
      viewRun.style.display = 'none';
      computeParkRuns(responseRuns); 
      break;
      
      case "runs-button":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'none';
      runs.style.display = 'flex';
      viewRun.style.display = 'none';
      showRun(responseRuns);  
      break;

    case "view-run":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'none';
      runs.style.display = 'none';
      viewRun.style.display = 'flex';
      break;
  }
}