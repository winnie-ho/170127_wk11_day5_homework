let parkRuns = [];
let fullParkRuns = [];
let fastestPRTimes;
let orderedKmTimes;
const kmSegs = [
  [],[],[],[],[]
]

let km1Seg = [];
let km2Seg = [];
let km3Seg = [];
let km4Seg = [];
let km5Seg = [];


let sortedKmSegs = [];

const km1Name = "Edinburgh park run first km";
const km2Name= "Edinburgh Parkrun 2nd Kilometre";
const km3Name= "Edinburgh Parkrun 3rd Kilometre";
const km4Name= "Edinburgh Parkrun 4th Kilometre";
const km5Name= 'Edinburgh Parkrun 5th "Kilometre"';

const computeParkRuns = (runs, cb) => {
  parkRuns = (runs.filter(run => run.start_latitude === 55.98 && run.start_longitude === -3.29)).sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
  cb(parkRuns);
}

const computeFullParkRuns = (parkRuns) => {
  parkRuns.forEach(run => makeRequest(("https://www.strava.com/api/v3/activities/" + run.id + userToken), pushFullPR));
}

const pushFullPR = (run) => {
  fullParkRuns.push(run);
  if(fullParkRuns.length === parkRuns.length){
    fullParkRuns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    displayData(fullParkRuns);
  }
}

const displayData = (sortedFullPR) => {
  computeFastestPRTimes(parkRuns);
  prepareKmSegs(fullParkRuns);
  prepareGraphKmSegs(fullParkRuns);
  computeFastestKmTimes();
  renderKmSplits(sortedFullPR);
  parkRunChart(parkRuns);        
}

const computeFastestPRTimes = (parkRuns) => {
  fastestPRTimes = (parkRuns).slice().sort((a,b) => a.moving_time - b.moving_time);
}

const prepareKmSegs = (fullParkRuns) => {
  console.log("PARK RUNS", parkRuns);
  fullParkRuns.forEach(run => {
    let km1 = run.segment_efforts.find(segment => segment.name === km1Name);
    let km2 = run.segment_efforts.find(segment => segment.name === km2Name);
    let km3 = run.segment_efforts.find(segment => segment.name === km3Name);
    let km4 = run.segment_efforts.find(segment => segment.name === km4Name);
    let km5 = run.segment_efforts.find(segment => segment.name === km5Name);
    
    km1 ? kmSegs[0].push(km1) : kmSegs[0].push(run.start_date);
    km2 ? kmSegs[1].push(km2) : kmSegs[1].push(run.start_date);
    km3 ? kmSegs[2].push(km3) : kmSegs[2].push(run.start_date);
    km4 ? kmSegs[3].push(km4) : kmSegs[3].push(run.start_date);
    km5 ? kmSegs[4].push(km5) : kmSegs[4].push(run.start_date);
  })
}

const prepareGraphKmSegs = (fullParkRuns) => {
  reversed = fullParkRuns.slice().sort((a,b) => new Date(a.start_date) - new Date(b.start_date));
  reversed.forEach(run => {
    let km1 = run.segment_efforts.find(segment => segment.name === km1Name);
    let km2 = run.segment_efforts.find(segment => segment.name === km2Name);
    let km3 = run.segment_efforts.find(segment => segment.name === km3Name);
    let km4 = run.segment_efforts.find(segment => segment.name === km4Name);
    let km5 = run.segment_efforts.find(segment => segment.name === km5Name);
    
    km1 ? km1Seg.push(km1) : km1Seg.push(run.upload_id);
    km2 ? km2Seg.push(km2) : km2Seg.push(run.upload_id);
    km3 ? km3Seg.push(km3) : km3Seg.push(run.upload_id);
    km4 ? km4Seg.push(km4) : km4Seg.push(run.upload_id);
    km5 ? km5Seg.push(km5) : km5Seg.push(run.upload_id);
  })  
}

const computeFastestKmTimes = () => {
  sortedKmSegs = kmSegs.slice().map(kmX => kmX.sort((a,b) => a.moving_time - b.moving_time));
};

const highlightTop3 = (orderedTimes, time, timeDiv, pbClass) => {
  if (time === orderedTimes[0].moving_time) {
      timeDiv.classList.add("first");
  }
  if (pbClass && time === orderedTimes[0].moving_time){
    timeDiv.classList.add("pb");
  }
  if (time === orderedTimes[1].moving_time) timeDiv.classList.add("second");
  if (time === orderedTimes[2].moving_time) timeDiv.classList.add("third");
}

const renderKmSplits = (sortedFullPR) => {
  sortedFullPR.forEach(run => {
    let splitDiv = document.createElement("div");
    splitDiv.activity_id = run.id;
    splitDiv.classList.add("row", "sb", "data-metric", "nav-button");
    splitDiv.onclick = viewRun;

    let dateDiv = document.createElement("div");
    let nameDiv = document.createElement("div");
    let timeDiv = document.createElement("div");
    let paceDiv = document.createElement("div");

    dateDiv.innerHTML = renderDate(run.start_date);
    nameDiv.innerHTML = run.name;
    timeDiv.innerHTML = renderTime(run.moving_time);
    highlightTop3(fastestPRTimes, run.moving_time, timeDiv, "true");
    
    paceDiv.innerHTML = renderPace(run.moving_time, run.distance);


    dateDiv.classList.add("date-spacer");
    nameDiv.classList.add("name-spacer");
    timeDiv.classList.add("spacer");
    paceDiv.classList.add("spacer");

    let children = [dateDiv, nameDiv, timeDiv, paceDiv]
    append(splitDiv, children);

    let km1Seg = run.segment_efforts.find(seg => seg.name === km1Name);
    let km2Seg = run.segment_efforts.find(seg => seg.name === km2Name);
    let km3Seg = run.segment_efforts.find(seg => seg.name === km3Name);
    let km4Seg = run.segment_efforts.find(seg => seg.name === km4Name);
    let km5Seg = run.segment_efforts.find(seg => seg.name === km5Name);

    let kmSegArray = [km1Seg, km2Seg, km3Seg, km4Seg, km5Seg];
    let missing = 0;
    kmSegArray.forEach(kmSegArray => {
      if (!kmSegArray) {
        missing ++;
      }
    })
    
    counter = 0;
    kmSegArray.forEach(kmSeg => {
      let kmXTime = document.createElement("div");
      kmXTime.classList.add("spacer");

      if ( kmSeg ) {
        kmXTime.innerHTML = renderTime(kmSeg.moving_time);
        highlightTop3(sortedKmSegs[counter], kmSeg.moving_time, kmXTime);
      }
      
      //Fix if Strava has missed 1 segment (can be calculated from full time).
      if ( !kmSeg && missing === 1 ) {
        let sumOfExisting = 0;
        
        kmSegArray.forEach(kmSeg => {
          if (kmSeg) {
            sumOfExisting += kmSeg.moving_time
          }
        })

        kmXTime.innerHTML = renderTime(run.moving_time - sumOfExisting);
      }
      
      splitDiv.appendChild(kmXTime);
      counter ++;
    })
    document.getElementById("park-run-splits").appendChild(splitDiv);
  })
}