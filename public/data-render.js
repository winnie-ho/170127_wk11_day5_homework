const dayLookUp = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
}

const monthLookUpShort = {
  01: "Jan",
  02: "Feb",
  03: "Mar",
  04: "April",
  05: "May",
  06: "Jun",
  07: "Jul",
  08: "Aug",
  09: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec"
}

const monthLookUpLong = {
  01: "January",
  02: "February",
  03: "March",
  04: "April",
  05: "May",
  06: "June",
  07: "July",
  08: "August",
  09: "September",
  10: "October",
  11: "November",
  12: "December"
}

const renderDate = (rawDate, format) => {
  const convertedRawDate = new Date(rawDate);
  const today = new Date();
  const yesterday = new Date(today - 86400000);
  const lastWeek = new Date(today - (7*86400000));

  todayDateOnly = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
  yesterdayDateOnly = yesterday.getDate() + "-" + (yesterday.getMonth()+1) + "-" + yesterday.getFullYear();
  rawDateOnly = convertedRawDate.getDate() + "-" + (convertedRawDate.getMonth()+1) + "-" + convertedRawDate.getFullYear();

  if (rawDateOnly === todayDateOnly) return "Today";
  if (rawDateOnly === yesterdayDateOnly) return "Yesterday";
  if (convertedRawDate > lastWeek) return dayLookUp[convertedRawDate.getDay()];
  if (format === "long") {
    return ordinalSuffixOf(rawDate.substr(8,2)) + " " + monthLookUpLong[parseInt(rawDate.substr(5,2))] + " " + rawDate.substr(0,4);
  }
  return rawDate.substr(8,2) + " " + monthLookUpShort[parseInt(rawDate.substr(5,2))] + " " + rawDate.substr(2,2);
}

const renderDistance = (rawDistance) => {
  return ((rawDistance)/1000).toFixed(2) + "km";
}

const renderTime = (rawTime) => {
  const totalMinutes = (rawTime/60).toFixed(2);[]
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
  let digit = num;
  let j = num % 10;
  let k = num % 100;

  if (num < 10 && num.length === 2) {
    digit = num.toString().substr(1,1);
  }
  if (j == 1 && k != 11) {
      return digit + "st";
  }
  if (j == 2 && k != 12) {
      return digit + "nd";
  }
  if (j == 3 && k != 13) {
      return digit + "rd";
  }
  return digit + "th";
}