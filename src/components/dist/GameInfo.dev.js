"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CounterStrike_background = _interopRequireDefault(require("./game-img/Counter-Strike_background.png"));

var _Call_of_Duty_background = _interopRequireDefault(require("./game-img/Call_of_Duty_background.jpg"));

var _Overwatch_background = _interopRequireDefault(require("./game-img/Overwatch_background2.png"));

var _dayz_background = _interopRequireDefault(require("./game-img/dayz_background.jpeg"));

var _valorant_background = _interopRequireDefault(require("./game-img/valorant_background2.png"));

var _Destiny_background = _interopRequireDefault(require("./game-img/Destiny_background2.jpg"));

var _RB6_background = _interopRequireDefault(require("./game-img/RB6_background.png"));

var _LoL_background = _interopRequireDefault(require("./game-img/LoL_background.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allGames = [{
  title: "Call of Duty",
  activities: ["Warzone", "DMZ", "Multiplayer", "Spec Ops", "Co op"],
  url: _Call_of_Duty_background["default"]
}, {
  title: "Overwatch 2",
  activities: ["Ranked", "Unranked", "Arcade", "Custom Games"],
  url: _Overwatch_background["default"]
}, {
  title: "DayZ",
  activities: ["Role Playing", "PvP", "PvE", "Survival", "Vanilla", "Modded"],
  url: _dayz_background["default"]
}, {
  title: "Counter-Strike 2",
  activities: ["Faceit", "Match Making", "Community", "Danger Zone"],
  url: _CounterStrike_background["default"]
}, {
  title: "Valorant",
  activities: ["Rated", "Unrated", "Spike Rush", "Swift Play"],
  url: _valorant_background["default"]
}, {
  title: "Destiny",
  activities: ["Raids", "Crucibal"],
  url: _Destiny_background["default"]
}, {
  title: "Rainbow Six Siege",
  activities: ["Ranked", "Unranked", "Casual"],
  url: _RB6_background["default"]
}, {
  title: "League of Legends",
  activities: ["Ranked", "Unranked", "ARAM"],
  url: _LoL_background["default"]
}];
var _default = allGames;
exports["default"] = _default;