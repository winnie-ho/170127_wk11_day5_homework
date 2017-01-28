var MapWrapper = function(coords, zoom) {
  var container = document.querySelector("#main-map");
    this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
    });
}


MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    console.log("marker added");
    return marker;
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, "click", function(event){
      console.log("map has been clicked!");

      console.log(event);

      console.log("coords selected are: " + event.latLng.lat(), event.latLng.lng());
      var coordsSelected = {lat: event.latLng.lat(), lng: event.latLng.lng()};

      this.addMarker(coordsSelected);

    }.bind(this));
  },

  addInfoWindow: function(map, marker, contentString){
    var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
      marker.addListener("click", function(){
      infoWindow.open(this.googleMap, marker);
    })
  }, 

  geoLocate: function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var center = {lat: position.coords.latitude, lng: position.coords.longitude}; 
      this.googleMap.setCenter(center); 
      var marker = this.addMarker(center);
      this.addInfoWindow(this.googleMap, marker, "You Are Here")
    }.bind(this)); 
  }

}


