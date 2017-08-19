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
      makeRequest(urlRuns, computeRunClubRuns);
      break;

    case "run-club-button":
      home.style.display = 'none';
      runClub.style.display = 'flex';
      parkRun.style.display = 'none';
      runs.style.display = 'none';
      makeRequest(urlRuns, computeRunClubRuns);
      break;
      
    case "park-run-button":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'flex';
      parkRuns = [];
      runs.style.display = 'none';
      makeRequest(urlRuns, computeParkRuns); 
      break;

    case "runs-button":
      home.style.display = 'none';
      runClub.style.display = 'none';
      parkRun.style.display = 'none';
      runs.style.display = 'flex';
      makeRequest(urlRuns, showRun);  
      break;

  }


}