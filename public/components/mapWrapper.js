const MapWrapper = function(coords, zoom) {
  const container = document.querySelector("#map");
    this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
    });
}


MapWrapper.prototype = {
  addMarker: function(coords){
    let marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    console.log("marker added");
    return marker;
  },

  // addClickEvent: function(){
  //   google.maps.event.addListener(this.googleMap, "click", function(event){
  //     console.log("map has been clicked!");

  //     console.log(event);

  //     console.log("coords selected are: " + event.latLng.lat(), event.latLng.lng());
  //     const coordsSelected = {lat: event.latLng.lat(), lng: event.latLng.lng()};

  //     this.addMarker(coordsSelected);

  //   }.bind(this));
  // },


  addPolyline: function(run,startPoint){
    const line = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(run),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.googleMap
    });

    line.setMap(null);
    line.setMap(this.googleMap);
    this.googleMap.setCenter(startPoint); 
  },

  addInfoWindow: function(map, marker, contentString){
    const infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
      marker.addListener("click", function(){
      infoWindow.open(this.googleMap, marker);
    })
  }, 

  geoLocate: function(runArray){
    console.log(runArray);
    navigator.geolocation.getCurrentPosition(function(position) {
      const centre = {lat: position.coords.latitude, lng: position.coords.longitude}; 
      this.googleMap.setCenter(centre); 
      const marker = this.addMarker(centre);
      const nearRuns = document.querySelector("#near-runs");
      this.addInfoWindow(this.googleMap, marker, "You Are Here")
      for (let run of runArray){
        if (Math.sqrt(Math.pow((run.start_latlng[0] - position.coords.latitude),2))< 0.005){
          let runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
          this.addInfoWindow(this.googleMap, runMarker, run.name);
          const nearRunsInfo = document.createElement("p");
          nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
          nearRuns.appendChild(nearRunsInfo);
          // console.log(run.start_latlng[0])
          // console.log(position.coords.latitude);
          // console.log(run.start_latlng[0]-position.coords.latitude)
          // console.log(run.name + "added");

        } else if (Math.sqrt(Math.pow((run.start_latlng[1] - position.coords.longitude),2)) < 0.005){
          const runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
          this.addInfoWindow(this.googleMap, runMarker, run.name);
          const nearRunsInfo = document.createElement("p");
          nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
          nearRuns.appendChild(nearRunsInfo);
          // console.log(run.start_latlng[1])
          // console.log(position.coords.longitude);
          // console.log(run.start_latlng[1]-position.coords.longitude);
          // console.log(run.name + "added");
        }
      }
    }.bind(this)); 
  }



}


