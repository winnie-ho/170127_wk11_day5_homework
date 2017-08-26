  // var handleNearMeButton = function(){
  //   console.log("Near Me button clicked");
  //   mainMap.geoLocate(result);
  // }

  // var nearMeButton = document.querySelector("#near-me");
  // nearMeButton.onclick = handleNearMeButton;



  // var dayArray = popDayArray(result);
  // var distanceArray = popDistanceArray(result);
  // new ColumnChart("THE MILES SO FAR...", "Distance (km)", distanceArray, dayArray);
  

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


const showRun = (responseRuns) => {
  let runsDiv = document.querySelector("#runs");
  runsDiv.innerHTML = "";

  responseRuns.forEach(run => {
    let activitySummary = createActivitySummary(run.id, run.start_date, run.name, run.distance, run.moving_time); 
    runsDiv.appendChild(activitySummary);
  });

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
    
  // });



}