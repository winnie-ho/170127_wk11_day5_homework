// userToken
const user = "a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
const userToken = "\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";

let parkRuns = [];
let fullParkRuns = [];

const kmSegs = [
  [],[],[],[],[]
]

const computeParkRuns = (runs) => {
  filterParkRuns(runs, computeFullParkRuns);
}

const filterParkRuns = (runs, cb) => {
  let filteredRuns = runs.filter(run => run.start_latitude === 55.98 && run.start_longitude === -3.29);
  parkRuns = filteredRuns.sort((a,b) => b.upload_id - a.upload_id);
  cb(parkRuns)
}

const computeFullParkRuns = (parkRuns) => {
  parkRuns.forEach(run => makeRequest(("https://www.strava.com/api/v3/activities/" + run.id + userToken), pushFullPR));
}

const pushFullPR = (run) => {
  fullParkRuns.push(run);
  let sortedFullPR;
  if(fullParkRuns.length === parkRuns.length){
    sortedFullPR = fullParkRuns.sort((a, b) => {
      return b.upload_id - a.upload_id;
    })
    displayData(sortedFullPR)
  }
}

const displayData = (sortedFullPR) => {
  displayParkRunsDate(sortedFullPR);  
  displayParkRunsName(sortedFullPR);
  displayParkRunsTime(sortedFullPR);
  displayParkRunsPace(sortedFullPR);
  prepareSeg(sortedFullPR);
  renderAllSegs(kmSegs, chart);
}

const displayParkRunsDate = (sortedFullPR) => {
  let parkRunDiv = document.getElementById("park-run-date");
  sortedFullPR.forEach(run => {
    let date = document.createElement("div");
    date.classList.add("data-metric","data-long", "nav-button");
    date.innerText = renderDate(run.start_date);
    date.activity_id = run.id;
    date.onclick = viewRun;
    parkRunDiv.appendChild(date);
  })
}

const displayParkRunsName = (sortedFullPR) => {
  let parkRunDiv = document.getElementById("park-run-name");
  sortedFullPR.forEach(run => {
    let name = document.createElement("div");
    name.classList.add("data-metric", "nav-button");
    name.innerText = run.name;
    name.activity_id = run.id;
    name.onclick = viewRun;
    parkRunDiv.appendChild(name);
  })
}

const displayParkRunsTime = (sortedFullPR) => {
  let parkRunDiv = document.getElementById("park-run-time");
  const finishTimes = sortedFullPR.map(run => run.moving_time);
  const orderedFinishTimes = finishTimes.sort((a,b) => a - b);
  
  sortedFullPR.forEach(run => {
    let time = document.createElement("div");
    time.classList.add("data-metric", "nav-button");
    
    if (run.moving_time === orderedFinishTimes[0]) {
      time.classList.add("first", "pb");
    }
    if (run.moving_time === orderedFinishTimes[1]) time.classList.add("second");
    if (run.moving_time === orderedFinishTimes[2]) time.classList.add("third");
    
    time.activity_id = run.id;
    time.onclick = viewRun;
    time.innerHTML = renderTime(run.moving_time);
    parkRunDiv.appendChild(time); 
  })
}


const displayParkRunsPace = (sortedFullPR) => {
  let parkRunDiv = document.getElementById("park-run-pace");
  sortedFullPR.forEach(run => {
    let pace = document.createElement("div");
    pace.classList.add("data-metric");
    pace.innerText = renderPace(run.moving_time, run.distance);
    parkRunDiv.appendChild(pace);
  })
}

const prepareSeg = (sortedFullPR) => {
  sortedFullPR.forEach(run => {
    run.segment_efforts.forEach(segment => {
      switch (segment.name){
        case "Edinburgh park run first km":
        kmSegs[0].push(segment);
        break;
        
        case "Edinburgh Parkrun 2nd Kilometre":
        kmSegs[1].push(segment);
        break;
        
        case "Edinburgh Parkrun 3rd Kilometre":
        kmSegs[2].push(segment);
        break;
        
        case "Edinburgh Parkrun 4th Kilometre":
        kmSegs[3].push(segment);
        break;
        
        case 'Edinburgh Parkrun 5th "Kilometre"':
        kmSegs[4].push(segment);
        break;
      }
    })
  })
}

const renderAllSegs = (kmSegs, cb) => {
  let kmCounter = 1;
  kmSegs.forEach(kmSeg => {
    displayKmSeg(kmSeg, kmCounter)
    kmCounter ++;
  })
  cb("Park Run Matrix", parkRuns);        
}

const displayKmSeg = (kmSegArray, kmNum) => {
  let segDiv = document.getElementById("park-run-" + kmNum);
  const kmTimes = kmSegArray.map(run => run.moving_time);
  const orderedKmTimes = kmTimes.sort((a,b) => a - b);

  kmSegArray.forEach(seg => {
    let time = document.createElement("div");
    time.classList.add("data-metric");
    time.innerHTML = renderTime(seg.moving_time);
    
    if (seg.moving_time === orderedKmTimes[0]) time.classList.add("first");
    if (seg.moving_time === orderedKmTimes[1]) time.classList.add("second");
    if (seg.moving_time === orderedKmTimes[2]) time.classList.add("third");
    segDiv.appendChild(time);
  })
};