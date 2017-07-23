// make API call request

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (this.status === 200) {
      var result = JSON.parse(this.responseText);
      console.log("RESULT", result);
      callback(result);
    }else{
      console.log("Error in request");
      return;
    }
  }
  request.send();
}
