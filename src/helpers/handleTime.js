import moment from "moment";
const timeNow = moment();


export const handleTime = (timeInMilliSeconds) => {
    if (timeNow.diff(timeInMilliSeconds, "months") > 11) {
      return "Over a year ago";
    } else if (timeNow.diff(timeInMilliSeconds, "weeks") > 3) {
      return `${timeNow.diff(timeInMilliSeconds, "months")} month(s) ago`;
    } else if (timeNow.diff(timeInMilliSeconds, "days") > 6) {
      return `${timeNow.diff(timeInMilliSeconds, "weeks")} week(s) ago`;
    } else if (timeNow.diff(timeInMilliSeconds, "hours") > 23) {
      return `${timeNow.diff(timeInMilliSeconds, "days")} day(s) ago`;
    } else if (timeNow.diff(timeInMilliSeconds, "minutes") > 59) {
      return `${timeNow.diff(timeInMilliSeconds, "hours")} hour(s) ago`;
    } else if (timeNow.diff(timeInMilliSeconds, "minutes") < 1) {
      return "just now";
    } else {
      return `${timeNow.diff(timeInMilliSeconds, "minutes")} min(s) ago`;
    }
  };