let parkRuns = [];
let fullParkRuns = [];
let fastestPRTimes;
let orderedKmTimes;

let kmSegments = [ [],[],[],[],[] ]

let sortedKmSegs = [];

const segDict = {
  1: "Edinburgh park run first km",
  2: "Edinburgh Parkrun 2nd Kilometre",
  3: "Edinburgh Parkrun 3rd Kilometre",
  4: "Edinburgh Parkrun 4th Kilometre",
  5: 'Edinburgh Parkrun 5th "Kilometre"'
}

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
  prepareKmSegs(fullParkRuns, computeFastestKmTimes);
  renderKmSplits(sortedFullPR);
  parkRunChart(parkRuns);        
}

const computeFastestPRTimes = (parkRuns) => {
  let distanceCheck = parkRuns.slice().filter(run => run.distance > 5000);
  fastestPRTimes = distanceCheck.sort((a,b) => a.moving_time - b.moving_time);
}

const prepareKmSegs = (fullParkRuns, cb) => {
  fullParkRuns.forEach(run => {
    for (i = 1; i <= 5; i++) {
      let kmSeg = run.segment_efforts.find(segment => segment.name === segDict[i]);
      kmSeg ? kmSegments[i-1].push(kmSeg) : kmSegments[i-1].push(run.start_date);
    }  
  })

  if (kmSegments[4].length === parkRuns.length) {
    let clone = kmSegments.map(kmX => kmX.slice());
    cb(clone);
  }
}

const computeFastestKmTimes = (clone) => {
  sortedKmSegs = clone.map(kmX => kmX.sort((a,b) => a.moving_time - b.moving_time));
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

    let kmSegArray = [];
    for (i = 1; i <= 5; i++) {
      let kmSeg = run.segment_efforts.find(seg => seg.name === segDict[i]);
      kmSegArray.push(kmSeg);
    }

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