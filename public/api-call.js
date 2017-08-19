// make API call request

const makeRequest = (url, callback) => {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (this.status === 200) {
      const result = JSON.parse(this.responseText);
      console.log("RESULT", result);
      callback(result);
    }else{
      console.log("Error in request");
      return;
    }
  }
  request.send();
}
