var requestComplete = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  ResultInfo = JSON.parse(jsonString);
  var resultArray = ResultInfo;
  
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
    mainMap.geoLocate(resultArray);
  }

  var nearMeButton = document.querySelector("#near-me");
  nearMeButton.onclick = handleNearMeButton;

  showRun(resultArray, handleViewButton);


  var dayArray = popDayArray(ResultInfo);
  var distanceArray = popDistanceArray(ResultInfo);
  new ColumnChart("THE MILES SO FAR...", "Distance (km)", distanceArray, dayArray);
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

var showRun = function(resultArray, handleViewButton){
  console.log(resultArray);
  var runsDiv = document.querySelector("#runs");
    runsDiv.innerHTML = "";
    resultArray.forEach(function(run){
    var parentBox = document.createElement("div")
    parentBox.id = "parent_box"
    runsDiv.appendChild(parentBox);

    // var mapD = document.createElement("div");
    // mapD.id = "map"
    // this.googleMap = new google.maps.Map(mapD, {
    //   center: {lat: 55.9533, lng:-3.1883 },
    //   zoom: 13
    //   });

    // parentBox.appendChild(mapD);

    var sectionBox = document.createElement("div")
    sectionBox.id = "section_box"
    parentBox.appendChild(sectionBox);

    var dateTitle = document.createElement("h3");
    dateTitle.innerText = run.start_date.substr(8,2) + "/" + run.start_date.substr(5,2) + "/"+ run.start_date.substr(0,4) + "    |    " +  run.name;
    sectionBox.appendChild(dateTitle);

    var dtp = document.createElement("p");
    dtp.innerText = "Distance: " + ((run.distance)/1000).toFixed(2) + " km   Time: " + ((run.moving_time)/60).toFixed(2)+ "mins    Pace: " + run.average_speed + "m/s";
    sectionBox.appendChild(dtp);

    // var startPoint = document.createElement("p");
    // startPoint.innerText = "Start: " + run.start_latlng[0] + ", " + run.start_latlng[1];
    // sectionBox.appendChild(startPoint);
    

    // var route = document.createElement("p");
    // route.innerText = "Route: " + run.map.summary_polyline;
    // sectionBox.appendChild(route);

    var detailButton = document.createElement("button");
    detailButton.innerHTML = "View";
    detailButton.value = JSON.stringify(run);
    detailButton.style.color = "white";
    parentBox.appendChild(detailButton);
    detailButton.onclick = handleViewButton;

    
  });

}