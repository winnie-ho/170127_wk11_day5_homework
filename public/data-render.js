const renderDate = (rawDate) => {
  return rawDate.substr(8,2) + "-" + rawDate.substr(5,2) + "-"+ rawDate.substr(0,4);
}

const renderDistance = (rawDistance) => {
  return ((rawDistance)/1000).toFixed(2) + "km";
}

const renderTime = (rawTime) => {
  const totalMinutes = (rawTime/60).toFixed(2);
  const hours = Math.floor(totalMinutes/60);
  const rawMinutes = (Math.floor(totalMinutes - (hours*60))).toFixed(0);
  let minutes = rawMinutes;
    if(rawMinutes < 10){
      minutes = "0" + rawMinutes;
    }
  const rawSeconds = (((totalMinutes - (hours*60))-minutes)*60).toFixed(0);
  let seconds = rawSeconds;
    if (rawSeconds < 10) {
      seconds = "0" + rawSeconds
    }
  if (hours === 0) {
    return minutes + ":" + seconds;
  } else {
    return hours + ":" + minutes + ":" + seconds;
  }
}

const renderPace = (rawTime, rawDistance) => {
  const totalMinutes = (rawTime/60).toFixed(2);
  const paceMinutes = (Math.floor(totalMinutes/(rawDistance/1000))).toFixed(0) 
  let rawPaceSeconds = (((totalMinutes/(rawDistance/1000))-paceMinutes)*60).toFixed(0);
  let paceSeconds = rawPaceSeconds;
    if(rawPaceSeconds < 10){
      paceSeconds = "0" + rawPaceSeconds;
    }
  return paceMinutes + ":" + paceSeconds + "/km";
}

const ordinalSuffixOf = (num) => {
  let j = num % 10;
  let k = num % 100;
  if (j == 1 && k != 11) {
      return num + "st";
  }
  if (j == 2 && k != 12) {
      return num + "nd";
  }
  if (j == 3 && k != 13) {
      return num + "rd";
  }
  return num + "th";
}