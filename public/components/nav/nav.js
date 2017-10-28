const pages = [
  "home",
  "weather-now",
  "run-club",
  "park-run-home",
  "park-run-splits",
  "park-run-graphs",
  "runs",
  "weather-forecast",
  "view-run"
];

const handleNavButton = (navId) => { 
  pages.forEach(page => {
    document.getElementById(page).style.display = "none";
    document.getElementById("background-image").classList.add("blur");
    if (page === navId){
      document.getElementById(navId).style.display = "flex";
    }
    if (navId === "home") {
      document.getElementById("weather-now").style.display = "flex";
      document.getElementById("background-image").classList.remove("blur");
    }
    if (navId === "park-run-home") {
      document.getElementById(navId).style.display = "block";
      if (parkRuns.length > 0) return;      
      computeParkRuns(responseRuns, computeFullParkRuns);      
      renderParkRunHome(parkRuns, fastestPR);
    }
    if (navId === "run-club"){
      computeRunClubRuns(responseRuns)
    }
    if (navId === "runs"){
      showRun(responseRuns);  
    }
    if (navId === "park-run-graphs"){
      kmChart(parkRuns);  
    }
  });
}

const handleToggleButton = (toggleId, id) => { 
  let idTarget = document.getElementById(id);
  let target = document.getElementById(toggleId);
  if (target.style.display === 'none') {
    idTarget.classList.add('button-active');
    target.style.display = "flex";
  } else if (target.style.display === 'flex') {
    target.style.display = "none";
    idTarget.classList.remove('button-active');
  }
}