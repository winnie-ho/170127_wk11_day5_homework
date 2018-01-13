const pages = [
  "auth",
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
  resetPages(navId);
  
  switch(navId) {
    case "home":
      document.getElementById("weather-now").style.display = "flex";
    case "park-run-home":
      document.getElementById(navId).style.display = "block";
      computeParkRuns(responseRuns, computeFullParkRuns);      
    case "run-club-home":
      fetchRunClub();
      // fetchRunClubMembers();    
      computeRunClubRuns(responseRuns);
      renderRunClubHome(runClubRuns);
      document.getElementById(navId).style.display="block";
    case "runs": 
      showRun(responseRuns);
    case "park-run-graphs":
      kmChart(parkRuns);
    default:
      document.getElementById(navId).style.display = "flex";
  }
}

const resetPages = (navId) => {
  pages.forEach(page => {
    if (page !== navId) {
      document.getElementById(page).style.display="none";
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