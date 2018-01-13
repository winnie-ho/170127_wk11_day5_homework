//Park Run Dictionary
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
    segmentId: "33096224149",
    segDict: {
    },
    default: false
  }
]

//Global parameters for Park Run pages with initial default values.
let parkRunDefault = "Edinburgh Cramond"
let parkRun = parkRunDict.find(run => run.name === parkRunDefault);
let parkRunCoords = parkRun.startCoords;
let parkRunSegId = parkRun.segmentId;

let parkRuns = [];
let fullParkRuns = [];
let fastestPR;


const initParkRun = () => {
  computeParkRuns(responseRuns, computeFullParkRuns);      
}

const setParkRunLocation = (event) => {
  let selectedPRLocation = document.getElementById("selectedPRLocation").value;
  console.log("SELECTED PR LOCATION", selectedPRLocation);

  let selectedPR = parkRunDict.find(parkRun => parkRun.name === selectedPRLocation);

  console.log("SELECTED PR", selectedPR);

  parkRunLocation = parkRunDict[selectedPRLocation].startCoords;
  segDict = parkRunDict[selectedPRLocation].segDict;
  getSelectedPRPB(); 
  // computeParkRuns(responseRuns, computeFullParkRuns);
  PRcheckDone();
  renderParkRunHome(parkRuns, fastestPR);
}

const test = () => {
  console.log("HERE");
}