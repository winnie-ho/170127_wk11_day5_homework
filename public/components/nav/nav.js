const handleNavButton = (page) => {
  const home = document.getElementById('home');
  const runClub = document.getElementById('run-club');
  const parkRun = document.getElementById('park-runs');
  const runs = document.getElementById('runs');
  const weatherForecast = document.getElementById('weather-forecast');
   
  switch (page) {
    case "home-button":
      home.style.display = 'flex';
      runClub.style.display = 'none';
      parkRun.style.display = 'none';
      runs.style.display = 'none';
      break;

    case "run-club-button":
      home.style.display = 'none';
      runClub.style.display = 'flex';
      parkRun.style.display = 'none';
      runs.style.display = 'none';
      computeRunClubRuns(responseRuns);
      break;
      
    case "park-run-button":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'flex';
      parkRuns = [];
      runs.style.display = 'none';
      computeParkRuns(responseRuns); 
      break;

    case "runs-button":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'none';
      runs.style.display = 'flex';
      showRun(responseRuns);  
      break;

  }


}