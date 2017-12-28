let authCode;
const client_id = "15869";
const client_secret = "63fec0d321558ea536b0be0f155c6adf29b7b278";

let user;
let userToken;


const authProcess = () => {
  setAuthCode();
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
  const redirect_url = "http://localhost:3000";
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
}