"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleTime = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var timeNow = (0, _moment["default"])();

var handleTime = function handleTime(timeInMilliSeconds) {
  if (timeNow.diff(timeInMilliSeconds, "months") > 11) {
    return "Over a year ago";
  } else if (timeNow.diff(timeInMilliSeconds, "weeks") > 3) {
    return "".concat(timeNow.diff(timeInMilliSeconds, "months"), " month(s) ago");
  } else if (timeNow.diff(timeInMilliSeconds, "days") > 6) {
    return "".concat(timeNow.diff(timeInMilliSeconds, "weeks"), " week(s) ago");
  } else if (timeNow.diff(timeInMilliSeconds, "hours") > 23) {
    return "".concat(timeNow.diff(timeInMilliSeconds, "days"), " day(s) ago");
  } else if (timeNow.diff(timeInMilliSeconds, "minutes") > 59) {
    return "".concat(timeNow.diff(timeInMilliSeconds, "hours"), " hour(s) ago");
  } else if (timeNow.diff(timeInMilliSeconds, "minutes") < 1) {
    return "just now";
  } else {
    return "".concat(timeNow.diff(timeInMilliSeconds, "minutes"), " min(s) ago");
  }
};

exports.handleTime = handleTime;