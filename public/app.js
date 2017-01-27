var app = function(){
  var url = "https://www.strava.com/api/v3/athlete/activities?per_page=10&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4"
  makeRequest(url, requestComplete)
}

window.onload = app;

var ResultInfo = null;

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  ResultInfo = JSON.parse(jsonString);
  var resultArray = ResultInfo;
  showRun(resultArray);
  createMainMap();
}

var createMainMap = function(){
  var centre = {lat: 55.9533, lng:-3.1883 };
  var mapDiv = document.querySelector("#main-map");
  var mainMap = new MapWrapper(centre, 12 );
  mainMap.addMarker(centre);
  mainMap.addClickEvent();
}
// var handleSearch = function(){
//   var searchQuery = document.getElementById("search-query");
//   var albumsDiv = document.getElementById("albums");

//   searchQuery.onkeyup = function (){
//     var url = "https://api.spotify.com/v1/search?q=" + this.value + "&type=album";
//     localStorage.setItem("urlSearch", this.value);
//     makeRequest(url, requestComplete);
//   } 
// }

// var setSearchText = function(text){
//   var searchBox = document.querySelector("#search-query");
//   searchBox.value = text;
// }




var showRun = function(resultArray){
console.log(resultArray);
  var runsDiv = document.querySelector("#runs");

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
    dateTitle.innerText = run.start_date.substr(0,10) + "    |    " +  run.name;
    sectionBox.appendChild(dateTitle);

    var dtp = document.createElement("p");
    dtp.innerText = "Distance: " + ((run.distance)/1000).toFixed(2) + " km   Time: " + ((run.moving_time)/60).toFixed(2)+ "mins    Pace: " + run.average_speed;
    sectionBox.appendChild(dtp);

    var route = document.createElement("p");
    route.innerText = "Route: " + run.map.summary_polyline;
    sectionBox.appendChild(route);
    })


}

var addClickEvent = function(){
  google.maps.event.addListener(this.googleMap, "click", function(event){
    var coordsSelected = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    this.addMarker(coordsSelected);
  }.bind(this));
}

var addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  return marker;
}

