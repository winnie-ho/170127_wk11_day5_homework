var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=100&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var handleRunsButton = function() {
  var runClubDiv = document.getElementById('run-club');
  var parkRunsDiv = document.getElementById('park-runs');
  var runsDiv = document.getElementById('runs');
  var homeDiv = document.getElementById('home');
  var title = document.getElementById('title');
    if (runsDiv.style.display === 'none') {
        title.style.display = "none";
        parkRunsDiv.style.display = 'none';
        runClubDiv.style.display = 'none';
        homeDiv.style.display = 'none';
        runsDiv.style.display = 'flex';
        makeRequest(urlRuns, showRun);
    }
}


  // var handleNearMeButton = function(){
  //   console.log("Near Me button clicked");
  //   mainMap.geoLocate(result);
  // }

  // var nearMeButton = document.querySelector("#near-me");
  // nearMeButton.onclick = handleNearMeButton;



  // var dayArray = popDayArray(result);
  // var distanceArray = popDistanceArray(result);
  // new ColumnChart("THE MILES SO FAR...", "Distance (km)", distanceArray, dayArray);
  
  // var centre = {lat: 55.9533, lng:-3.1883 };
  // var mapDiv = document.querySelector("#main-map");
  // mapDiv.innerHTML = "";
  // var mainMap = new MapWrapper(centre, 14);

  // var handleViewButton = function(event){
  //   console.log("viewbutton clicked");
  //   var runSelected = JSON.parse(event.target.value);
  //   var runLine = runSelected.map.summary_polyline;
  //   var startPoint = {lat: ((runSelected.start_latlng[0] + runSelected.end_latlng[0])/2), lng: ((runSelected.start_latlng[1] + runSelected.end_latlng[1])/2)};
  //   mainMap.addPolyline(runLine, startPoint);
  // }
// }


// var popDayArray = function(ResultInfo){
//   var dayArray = [];
//   for(var run of ResultInfo){
//     dayArray.push(run.start_date.substr(0,10));
//   }
//   return dayArray;
// }

// var popDistanceArray = function(ResultInfo){
//   var distanceArray = [];
//   for(var run of ResultInfo){
//     distanceArray.push(run.distance/1000);
//   }
//   return distanceArray;
// }


var showRun = function(result){
  var runsDiv = document.querySelector("#runs");
  runsDiv.innerHTML = "";

  result.forEach(function(run){
    var runBox = document.createElement("div")
    runBox.id = "run-box"
    runsDiv.appendChild(runBox);

    var dateTitle = document.createElement("div");
    var date = document.createElement("div");
    var title = document.createElement("h4");
    dateTitle.classList.add("run-box__detail");

    date.innerText = run.start_date.substr(8,2) + "-" + run.start_date.substr(5,2) + "-"+ run.start_date.substr(0,4);
    title.innerText = run.name;
    dateTitle.appendChild(title);
    dateTitle.appendChild(date);


    runBox.appendChild(dateTitle);

    var runBoxDetail = document.createElement("div")
    runBoxDetail.classList.add("run-box__detail");
    runBox.appendChild(runBoxDetail);

    var distance = document.createElement("div");
    distance.classList.add("data-metric");
    var distanceIcon = document.createElement("img");
    distanceIcon.src = "./resources/icon_distance.png";
    distanceIcon.classList.add("icon");
    var distanceValue = document.createElement("div");
    distanceValue.innerText = ((run.distance)/1000).toFixed(2) + "km";
    distance.appendChild(distanceIcon);
    distance.appendChild(distanceValue);


    var time = document.createElement("div");
    time.classList.add("data-metric");
    var timeIcon = document.createElement("img");
    timeIcon.src = "./resources/icon_time.png";
    timeIcon.classList.add("icon");
    var timeValue = document.createElement("div");
    var totalMinutes = ((run.moving_time)/60).toFixed(2);
    var hours = Math.floor(totalMinutes/60);
    var rawMinutes = (Math.floor(totalMinutes - (hours*60))).toFixed(0);
    var minutes = rawMinutes;
      if(rawMinutes < 10){
        minutes = "0"+rawMinutes;
      }
    var rawSeconds = (((totalMinutes - (hours*60))-minutes)*60).toFixed(0);
    var seconds = rawSeconds;
      if(rawSeconds < 10){
        seconds = "0"+rawSeconds
      }


    if (hours === 0) {
      timeValue.innerText = minutes + ":" + seconds;
    }else{
      timeValue.innerText = hours + ":" + minutes + ":" + seconds;
    }
    time.appendChild(timeIcon);
    time.appendChild(timeValue);

    var pace = document.createElement("div");
    pace.classList.add("data-metric");
    var paceIcon = document.createElement("img");
    paceIcon.src = "./resources/icon_pace.png";
    paceIcon.classList.add("icon");
    var paceValue = document.createElement("div");
    var paceMinutes = (Math.floor(totalMinutes/(run.distance/1000))).toFixed(0) 
    var rawPaceSeconds = (((totalMinutes/(run.distance/1000))-paceMinutes)*60).toFixed(0);
    var paceSeconds = rawPaceSeconds;
      if(rawPaceSeconds < 10){
        paceSeconds = "0"+rawPaceSeconds;
      }
    paceValue.innerText = paceMinutes + ":" + paceSeconds + "/km";
    pace.appendChild(paceIcon);
    pace.appendChild(paceValue);


    var route = document.createElement("div");
    route.id = "route-map";
    route.style.display = "none";

    runBoxDetail.appendChild(distance);
    runBoxDetail.appendChild(time);
    runBoxDetail.appendChild(pace);
    runBoxDetail.appendChild(route);

    // var detailButton = document.createElement("button");
    // detailButton.innerHTML = "+";
    // detailButton.value = JSON.stringify(run);
    // detailButton.style.color = "white";
    // runBox.appendChild(detailButton);
    // detailButton.onclick = handleViewButton;


    // var map = document.createElement("div");
    // map.id = "map"
    // this.googleMap = new google.maps.Map(map, {
    //   center: {lat: 55.9533, lng:-3.1883 },
    //   zoom: 13
    //   });

    // runBox.appendChild(map);
    
    // var runLine = run.map.summary_polyline;
    // var startPoint = {lat: ((run.start_latlng[0] + run.end_latlng[0])/2), lng: ((run.start_latlng[1] + run.end_latlng[1])/2)};
    // map.addPolyline(runLine, startPoint);
    
  });



}