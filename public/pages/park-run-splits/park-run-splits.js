let kmSegments = [ [],[],[],[],[] ]
let fastestKmSegs = [];

const initParkRunSplits = () => {
  kmSegments = [ [],[],[],[],[] ]
  document.getElementById("km-chart").innerHTML="";
  document.getElementById("splits-container").innerHTML="";
  
  fastestKmSegs = [];
  prepareKmSegs(fullParkRuns);
  renderKmSplits(fullParkRuns);
}

//Finds the segments for Cramond park run and populates kmSegments. Then sets fastestKmSegs.
const prepareKmSegs = (fullParkRuns) => {
  fullParkRuns.forEach(run => {
    for (i = 1; i <= 5; i++) {
      let kmSeg = run.segment_efforts.find(segment => segment.name === parkRun.segDict[i]);
      kmSeg ? kmSegments[i - 1].push(kmSeg) : kmSegments[i - 1].push(run.start_date);
    }  
  });
  
  if (kmSegments[4].length === parkRuns.length) {
    let clone = kmSegments.map(kmX => kmX.slice());
    fastestKmSegs = clone.map(kmX => kmX.sort((a,b) => a.moving_time - b.moving_time));
  }
}

//Highlights the three fastest times and pb if applicable.
const highlightTop3 = (orderedTimes, time, timeDiv, pbClass) => {
  if (!orderedTimes) return; 
  const classDict = {
    1: "first",
    2: "second",
    3: "third"
  }
  
  for (i = 0; i <= 2; i ++ ){
    if (time === orderedTimes[i].moving_time) timeDiv.classList.add(classDict[i+1]);
    if (pbClass && time === orderedTimes[0].moving_time) timeDiv.classList.add("pb");
  }
}

//Renders the km split page.
const renderKmSplits = (sortedFullPR) => {
  sortedFullPR.forEach(run => {
    let splitDiv = document.createElement("div");
    splitDiv.activity_id = run.id;
    splitDiv.classList.add("row", "sb", "data-metric", "nav-button", "split");
    splitDiv.onclick = viewRun;
    
    let dateDiv = document.createElement("div");
    let nameDiv = document.createElement("div");
    let timeDiv = document.createElement("div");
    let paceDiv = document.createElement("div");
    
    dateDiv.innerHTML = renderDate(run.start_date);
    nameDiv.innerHTML = run.name;
    timeDiv.innerHTML = renderTime(run.moving_time);
    
    if(sortedFullPR.length >= 3) {
      highlightTop3(fastestPR, run.moving_time, timeDiv, "true");
    }
    
    paceDiv.innerHTML = renderPace(run.moving_time, run.distance);

    dateDiv.classList.add("date-spacer");
    nameDiv.classList.add("name-spacer");
    timeDiv.classList.add("spacer");
    paceDiv.classList.add("spacer");

    let children = [dateDiv, nameDiv, timeDiv, paceDiv]
    append(splitDiv, children);

    let kmSegArray = [];
    for (i = 1; i <= 5; i++) {
      let kmSeg = run.segment_efforts.find(seg => seg.name === parkRun.segDict[i]);
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
        highlightTop3(fastestKmSegs[counter], kmSeg.moving_time, kmXTime);
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
    document.getElementById("splits-container").appendChild(splitDiv);
  })
}