const pages = [
  "home",
  "weather-now",
  "run-club",
  "park-run-home",
  "park-run-splits",
  "runs",
  "weather-forecast",
  "view-run"
];

const handleNavButton = (navId) => { 
  pages.forEach(page => {
    document.getElementById(page).style.display = "none";
    if (page === navId){
      document.getElementById(navId).style.display = "flex";
    }
    if (navId === "home") {
      document.getElementById("weather-now").style.display = "flex";
    }
    if (navId === "park-run-home") {
      document.getElementById(navId).style.display = "block";
      if (parkRuns.length > 0) return;      
      computeParkRuns(responseRuns);      
      renderParkRunHome(parkRuns);
    }
    if (navId === "run-club"){
      computeRunClubRuns(responseRuns)
    }
    if (navId === "runs"){
      showRun(responseRuns);  
    }
  });
}

const handleToggleButton = (toggleId) => { 
  let target = document.getElementById(toggleId);
  if (target.style.display === 'none') {
    target.style.display = "flex";
  } else if (target.style.display === 'flex') {
    target.style.display = "none";
  }
}