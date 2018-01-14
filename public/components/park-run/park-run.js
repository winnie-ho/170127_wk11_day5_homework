//Park Run Dictionary--------------------------------------
const parkRunDict = [
  {
    name: "Edinburgh Cramond",
    startCoords: [55.98, -3.29],
    segmentId: "1531025",
    segDict: {
      1: "Edinburgh park run first km",
      2: "Edinburgh Parkrun 2nd Kilometre",
      3: "Edinburgh Parkrun 3rd Kilometre",
      4: "Edinburgh Parkrun 4th Kilometre",
      5: 'Edinburgh Parkrun 5th "Kilometre"'
    },
    default: true
  },
  {
    name: "Edinburgh Portobello",
    startCoords: [55.95, -3.12],
    segmentId: "9342203",
    segDict: {
    },
    default: false
  }
]
// --------------------------------------------------------

//Global parameters for Park Run pages with initial default values.
let parkRunDefault = "Edinburgh Cramond"
let parkRun = parkRunDict.find(run => run.name === parkRunDefault);

let parkRuns = [];
let fullParkRuns = [];
let fastestPR;

const initParkRun = () => {
  computeParkRuns(responseRuns, computeFullParkRuns);   
  renderParkRunOptions();   
  PRcheckDone();
  getSelectedPRPB(); 
  parkRunChart(parkRuns);  
  computeFastestPR(parkRuns);
}

const setParkRunLocation = () => {
  let selectedPRLocation = document.getElementById("park-run-select").value;
  parkRun = parkRunDict.find(PR => PR.name === selectedPRLocation);
  initParkRun();
}

//Start here.
//Computes all park runs in chron order.
const computeParkRuns = (runs, cb) => {
  parkRuns = [];
  fullParkRuns = [];
  
  parkRuns = (runs.filter(run => run.start_latitude === parkRun.startCoords[0] && run.start_longitude === parkRun.startCoords[1])).sort((a,b) => new Date(b.start_date) - new Date(a.start_date));

  if (parkRuns.length === 0) {
    initParkRunSplits();
  } else {
    cb(parkRuns);
  }
}

//Fetches full park run object.
const computeFullParkRuns = (parkRuns) => {
  fullParkRuns = [];
  parkRuns.forEach(run => {
    makeRequest(("https://www.strava.com/api/v3/activities/" + run.id + userToken), pushFullPR);
  });
}

//Make an array of full park runs in chron order and initialise display.
const pushFullPR = (run) => {
  fullParkRuns.push(run);
  checkRetrievedAllFullPR(fullParkRuns);
}

// Initiate render of park run splits only when all full park runs have been retrieved.
const checkRetrievedAllFullPR = (fullParkRuns) => {  
  if(fullParkRuns.length === parkRuns.length){
    fullParkRuns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    initParkRunSplits();
  }
}

//Function to check if park runs is empty and trigger UI zero display
const PRcheckDone = () => {
  if (parkRuns.length === 0) {
    document.getElementById("empty-pr").style.display = "block";
    document.getElementById("pr-chart").style.display = "none";
  } else {
    document.getElementById("empty-pr").style.display = "none";
    document.getElementById("pr-chart").style.display = "block";
    let prChart = document.getElementById("pr-chart");
    let loadMsg = document.createElement("div");
    loadMsg.innerText = "PARK RUNS LOADING";
    loadMsg.classList.add("loading-pr");
    prChart.appendChild(loadMsg);
  }
}

//Computing global variable 'fastestPR' if 5km distance complete.
const computeFastestPR = (parkRuns) => {
  fastestPR = parkRuns.slice().filter(run => run.distance > 5000).sort((a,b) => a.moving_time - b.moving_time);
}