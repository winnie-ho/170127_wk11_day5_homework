let authCode;
const client_id = "15869";
const client_secret = "63fec0d321558ea536b0be0f155c6adf29b7b278";

let user;
let userToken;


const authProcess = () => {
  setAuthCode();
  toggleHomePage();
}

const setAuthCode = () => {
  let location = window.location.search;
  let length = location.length;
  if (location.search("code=") === -1) {
    return;
  } else {
    let start = location.search("code=");
    authCode = window.location.search.substr(start+5, length);
    tokenExchange();
  }
}

const login = (cb) => {
  const redirect_url = "http://winsruns.herokuapp.com";
  const url="https://www.strava.com/oauth/authorize?client_id=" + client_id + "&response_type=code&redirect_uri=" + redirect_url + "&scope=write&state=mystate&approval_prompt=force";
  
  window.location = url;
  if (authCode) {
    cb();
  }
}

const tokenExchange = () => {
  let urlTokenExchange = "https://www.strava.com/oauth/token"; 

  let exchangeData = {
    client_id: client_id,
    client_secret: client_secret,
    code: authCode
  }

  makePostRequest(urlTokenExchange, exchangeData, setUserToken);
}

const setUserToken = (result) => {
  user = result.access_token;
  userToken = "\?access_token=" + result.access_token;
  const urlRuns = "https://www.strava.com/api/v3/athlete/activities?per_page=100&access_token=" + user;
  makeRequest(urlRuns, setRuns);
}

const toggleHomePage = () => {
  if (authCode) {
    document.getElementById("home").style.display = "flex";
    document.getElementById("auth").style.display = "none";
  } else {
    document.getElementById("home").style.display = "none";
    document.getElementById("auth").style.display = "flex";
  }
}