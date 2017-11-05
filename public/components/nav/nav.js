const pages = [
  "home",
  "weather-now",
  "run-club-home",
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
    if (page === navId){
      document.getElementById(navId).style.display = "flex";
    }
    if (navId === "home") {
      document.getElementById("weather-now").style.display = "flex";
    }
    if (navId === "park-run-home") {
      document.getElementById(navId).style.display = "block";
      if (parkRuns.length > 0) return;      
      computeParkRuns(responseRuns, computeFullParkRuns);      
      renderParkRunHome(parkRuns, fastestPR);
    }
    if (navId === "run-club-home"){
      document.getElementById(navId).style.display="block";
      fetchRunClub();
      // fetchRunClubMembers();    
      computeRunClubRuns(responseRuns);
      renderRunClubHome(runClubRuns);
    }
    if (navId === "runs"){
      showRun(responseRuns);  
    }
    if (navId === "park-run-graphs"){
      kmChart(parkRuns);  
    }
  });
}

const detailedViews = [
  "laps",
  "photos",
  "comments",
  "kudos"
]

const handleToggleButton = (toggleId, id) => {
  let idTarget = document.getElementById(id);
  let target = document.getElementById(toggleId);
  if (target.style.display === 'flex') {
    target.style.display = "none";
    idTarget.classList.remove('button-active');
  } else if (target.style.display === 'none') {
      detailedViews.forEach(detailedView => {
      document.getElementById(detailedView+"-detail").style.display = "none";
      document.getElementById(detailedView+"-button").classList.remove('button-active');
    });
      
    if (target.style.display === 'none') {
      target.style.display = "flex";
      idTarget.classList.add('button-active');
    }
  }
}