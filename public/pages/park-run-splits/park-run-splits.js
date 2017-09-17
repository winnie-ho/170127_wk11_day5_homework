// userToken
const user = "a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
const userToken = "\?access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";

var parkRuns = [];
var fullParkRuns = [];

const km1Segment = [];
const km2Segment = [];
const km3Segment = [];
const km4Segment = [];
const km5Segment = [];

const computeParkRuns = (runs) => {
  parkRuns = runs.filter(run => run.start_latitude === 55.98 && run.start_longitude === -3.29);
  computeFullParkRuns(parkRuns);
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
  console.log("FULL", fullParkRuns);
  console.log("SORTED", sortedFullPR);
}

const displayData = (sortedFullPR) => {
  console.log("DISPLAY", sortedFullPR);
  displayParkRunsDate(sortedFullPR);  
  displayParkRunsName(sortedFullPR);
  displayParkRunsTime(sortedFullPR);
  displayParkRunsPace(sortedFullPR);
  prepareSeg(sortedFullPR);
  displaySegKm1(km1Segment);
  displaySegKm2(km2Segment);
  displaySegKm3(km3Segment);
  displaySegKm4(km4Segment);
  displaySegKm5(km5Segment);
}

const displayParkRunsDate = (sortedFullPR) => {
  var parkRunDiv = document.getElementById("park-run-date");
  sortedFullPR.forEach(run => {
    var date = document.createElement("div");
    date.classList.add('data-metric','data-long');
    date.innerText = renderDate(run.start_date);
    parkRunDiv.appendChild(date);
  })
}

const displayParkRunsName = (sortedFullPR) => {
  var parkRunDiv = document.getElementById("park-run-name");
  sortedFullPR.forEach(run => {
    var name = document.createElement("div");
    name.classList.add("data-metric");
    name.innerText = run.name;
    parkRunDiv.appendChild(name);
  })
}

const displayParkRunsTime = (sortedFullPR) => {
  var parkRunDiv = document.getElementById("park-run-time");
  const finishTimes = sortedFullPR.map(run => run.moving_time);
  const orderedFinishTimes = finishTimes.sort((a,b) => a - b);
  
  sortedFullPR.forEach(run => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    
    if (run.moving_time === orderedFinishTimes[0]) {
      time.classList.add("first", "pb");
    }
    if (run.moving_time === orderedFinishTimes[1]) time.classList.add("second");
    if (run.moving_time === orderedFinishTimes[2]) time.classList.add("third");
    
    time.innerHTML = renderTime(run.moving_time);
    parkRunDiv.appendChild(time); 
  })
}


const displayParkRunsPace = (sortedFullPR) => {
  var parkRunDiv = document.getElementById("park-run-pace");
  sortedFullPR.forEach(run => {
    var pace = document.createElement("div");
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
          km1Segment.push(segment);
          break;
          
          case "Edinburgh Parkrun 2nd Kilometre":
          km2Segment.push(segment);
          break;
          
          case "Edinburgh Parkrun 3rd Kilometre":
          km3Segment.push(segment);
          break;
          
          case "Edinburgh Parkrun 4th Kilometre":
          km4Segment.push(segment);
          break;
          
          case 'Edinburgh Parkrun 5th "Kilometre"':
          km5Segment.push(segment);
          break;
      }
    })
  })
}

const displaySegKm1 = (km1Segment) => {
  var parkRunSeg1 = document.getElementById("park-run-1");
  const km1Times = km1Segment.map(run => run.moving_time);
  const orderedKm1Times = km1Times.sort((a,b) => a - b);

  km1Segment.forEach(seg => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    time.innerHTML = renderTime(seg.moving_time);
    
    if (seg.moving_time === orderedKm1Times[0]) time.classList.add("first");
    if (seg.moving_time === orderedKm1Times[1]) time.classList.add("second");
    if (seg.moving_time === orderedKm1Times[2]) time.classList.add("third");
    parkRunSeg1.appendChild(time);
  })
};

const displaySegKm2 = (km2Segment) => {
  var parkRunSeg2 = document.getElementById("park-run-2");
  const km2Times = km2Segment.map(run => run.moving_time);
  const orderedKm2Times = km2Times.sort((a,b) => a - b);

  km2Segment.forEach(seg => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    time.innerHTML = renderTime(seg.moving_time);
    
    if (seg.moving_time === orderedKm2Times[0]) time.classList.add("first");
    if (seg.moving_time === orderedKm2Times[1]) time.classList.add("second");
    if (seg.moving_time === orderedKm2Times[2]) time.classList.add("third");
    parkRunSeg2.appendChild(time);
  })
};

const displaySegKm3 = (km3Segment) => {
  var parkRunSeg3 = document.getElementById("park-run-3");
  const km3Times = km3Segment.map(run => run.moving_time);
  const orderedKm3Times = km3Times.sort((a,b) => a - b);

  km3Segment.forEach(seg => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    time.innerHTML = renderTime(seg.moving_time);
    
    if (seg.moving_time === orderedKm3Times[0]) time.classList.add("first");
    if (seg.moving_time === orderedKm3Times[1]) time.classList.add("second");
    if (seg.moving_time === orderedKm3Times[2]) time.classList.add("third");
    parkRunSeg3.appendChild(time);
  })
};

const displaySegKm4 = (km4Segment) => {
  var parkRunSeg4 = document.getElementById("park-run-4");
  const km4Times = km4Segment.map(run => run.moving_time);
  const orderedKm4Times = km4Times.sort((a,b) => a - b);

  km4Segment.forEach(seg => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    time.innerHTML = renderTime(seg.moving_time);
    
    if (seg.moving_time === orderedKm4Times[0]) time.classList.add("first");
    if (seg.moving_time === orderedKm4Times[1]) time.classList.add("second");
    if (seg.moving_time === orderedKm4Times[2]) time.classList.add("third");
    parkRunSeg4.appendChild(time);
  })
};

const displaySegKm5 = (km5Segment) => {
  var parkRunSeg5 = document.getElementById("park-run-5");
  const km5Times = km5Segment.map(run => run.moving_time);
  const orderedKm5Times = km5Times.sort((a,b) => a - b);

  km5Segment.forEach(seg => {
    var time = document.createElement("div");
    time.classList.add("data-metric");
    time.innerHTML = renderTime(seg.moving_time);
    
    if (seg.moving_time === orderedKm5Times[0]) time.classList.add("first");
    if (seg.moving_time === orderedKm5Times[1]) time.classList.add("second");
    if (seg.moving_time === orderedKm5Times[2]) time.classList.add("third");
    parkRunSeg5.appendChild(time);
  })
};






    




