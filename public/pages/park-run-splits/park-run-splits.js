// userToken
const user = "a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
const userToken = "\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";

let parkRuns = [];
let fullParkRuns = [];
let orderedPRTimes;
let orderedKmTimes;
const kmSegs = [
  [],[],[],[],[]
]

let sortedKmSegs = [];

const kmLaps = [
  [],[],[],[],[],[]
]

let sortedKmLaps = [];

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
  computeOrderedPRTimes(parkRuns);
  prepareKmSegs(fullParkRuns);
  prepareKmSegsFromAutoLap(fullParkRuns);
  computeOrderedKmTimes(kmSegs, sortedKmSegs);
  computeOrderedKmTimes(kmLaps, sortedKmLaps);
  renderKmSplits(sortedFullPR, sortedKmSegs);
  parkRunChart("Park Run Matrix", parkRuns);        
}

const computeOrderedPRTimes = (parkRuns) => {
  orderedPRTimes = parkRuns.sort((a,b) => a.moving_time - b.moving_time);
}

const computeOrderedKmTimes = (rawSplitsArray, sortedSplitsArray) => {
  rawSplitsArray.forEach(kmX => {
    let orderedKmX = kmX.sort((a,b) => a.moving_time - b.moving_time);
    sortedSplitsArray.push(orderedKmX);
  });
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

const prepareKmSegs = (fullParkRuns) => {
  fullParkRuns.forEach(run => {
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

const prepareKmSegsFromAutoLap = (fullParkRuns) => {
  fullParkRuns.forEach(run => {
    let counter = 0;
    run.laps.forEach(lap => {
      kmLaps[counter].push(lap)
      counter ++;
    })
  })
}

const renderKmSplits = (sortedFullPR, sortedKmSegs) => {
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
    highlightTop3(orderedPRTimes, run.moving_time, timeDiv, "true");
    
    paceDiv.innerHTML = renderPace(run.moving_time, run.distance);


    dateDiv.classList.add("date-spacer");
    nameDiv.classList.add("name-spacer");
    timeDiv.classList.add("spacer");
    paceDiv.classList.add("spacer");

    let children = [dateDiv, nameDiv, timeDiv, paceDiv]
    append(splitDiv, children);

    let km1Seg = run.segment_efforts.find(seg => seg.name === "Edinburgh park run first km");
    let km2Seg = run.segment_efforts.find(seg => seg.name === "Edinburgh Parkrun 2nd Kilometre");
    let km3Seg = run.segment_efforts.find(seg => seg.name === "Edinburgh Parkrun 3rd Kilometre");
    let km4Seg = run.segment_efforts.find(seg => seg.name === "Edinburgh Parkrun 4th Kilometre");
    let km5Seg = run.segment_efforts.find(seg => seg.name === 'Edinburgh Parkrun 5th "Kilometre"');

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