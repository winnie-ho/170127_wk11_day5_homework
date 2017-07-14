var urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"

var requestComplete = function (){
  if (this.status !== 200) return;
  result = JSON.parse(this.responseText);
  console.log(result);
  showRun(result, handleViewButton);
  
  var centre = {lat: 55.9533, lng:-3.1883 };
  var mapDiv = document.querySelector("#main-map");
  mapDiv.innerHTML = "";
  var mainMap = new MapWrapper(centre, 14);


  var handleViewButton = function(){
    console.log("viewbutton clicked");
    var runSelected = JSON.parse(event.target.value);
    var runLine = runSelected.map.summary_polyline;
    var startPoint = {lat: ((runSelected.start_latlng[0] + runSelected.end_latlng[0])/2), lng: ((runSelected.start_latlng[1] + runSelected.end_latlng[1])/2)};
    mainMap.addPolyline(runLine, startPoint);
  }

  var handleNearMeButton = function(){
    console.log("Near Me button clicked");
    mainMap.geoLocate(result);
  }

  // var nearMeButton = document.querySelector("#near-me");
  // nearMeButton.onclick = handleNearMeButton;



  var dayArray = popDayArray(result);
  var distanceArray = popDistanceArray(result);
  // new ColumnChart("THE MILES SO FAR...", "Distance (km)", distanceArray, dayArray);
}

var popDayArray = function(ResultInfo){
  var dayArray = [];
  for(var run of ResultInfo){
    dayArray.push(run.start_date.substr(0,10));
  }
  return dayArray;
}

var popDistanceArray = function(ResultInfo){
  var distanceArray = [];
  for(var run of ResultInfo){
    distanceArray.push(run.distance/1000);
  }
  return distanceArray;
}

var showRun = function(result, handleViewButton){
  var runsDiv = document.querySelector("#runs");
    runsDiv.innerHTML = "";
    result.forEach(function(run){
    var runBox = document.createElement("div")
    runBox.id = "parent_box"
    runsDiv.appendChild(runBox);

    // var mapD = document.createElement("div");
    // mapD.id = "map"
    // this.googleMap = new google.maps.Map(mapD, {
    //   center: {lat: 55.9533, lng:-3.1883 },
    //   zoom: 13
    //   });

    // parentBox.appendChild(mapD);

    var dateTitle = document.createElement("h3");
    dateTitle.innerText = run.start_date.substr(8,2) + "/" + run.start_date.substr(5,2) + "/"+ run.start_date.substr(0,4) + "    |    " +  run.name;
    runBox.appendChild(dateTitle);

    var sectionBox = document.createElement("div")
    sectionBox.id = "section_box"
    runBox.appendChild(sectionBox);

    var distance = document.createElement("span");
    var time = document.createElement("span");
    var pace = document.createElement("span");

    distance.innerText = "Distance: " + ((run.distance)/1000).toFixed(2) + " km";
    time.innerText = "Time: " + ((run.moving_time)/60).toFixed(2)+ "mins";
    pace.innerText = "Pace: " + run.average_speed + "m/s";
    sectionBox.appendChild(distance);
    sectionBox.appendChild(time);
    sectionBox.appendChild(pace);




    // var startPoint = document.createElement("p");
    // startPoint.innerText = "Start: " + run.start_latlng[0] + ", " + run.start_latlng[1];
    // sectionBox.appendChild(startPoint);
    

    // var route = document.createElement("p");
    // route.innerText = "Route: " + run.map.summary_polyline;
    // sectionBox.appendChild(route);

    // var detailButton = document.createElement("button");
    // detailButton.innerHTML = "View";
    // detailButton.value = JSON.stringify(run);
    // detailButton.style.color = "white";
    // parentBox.appendChild(detailButton);
    // detailButton.onclick = handleViewButton;

    
  });
    var handleRunBoxClick = function(){
      console.log("THIS BUTTON WAS CLICKED");
    }

}