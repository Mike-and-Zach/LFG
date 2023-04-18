"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callApi = void 0;
var baseUrl = "http://localhost:4000/api"; // const baseUrl = "https://imlfg.onrender.com/api"

var callApi = function callApi(_ref) {
  var method, path, token, body, options, result, data;
  return regeneratorRuntime.async(function callApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _ref.method, path = _ref.path, token = _ref.token, body = _ref.body;
          options = {
            method: method ? method : "GET",
            headers: {
              "Content-Type": "application/json"
            }
          };

          if (token) {
            options.headers.Authorization = "Bearer ".concat(token);
          }

          if (body) {
            options.body = JSON.stringify(body);
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(baseUrl + path, options));

        case 6:
          result = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(result.json());

        case 9:
          data = _context.sent;

          if (!data.error) {
            _context.next = 12;
            break;
          }

          throw data.error;

        case 12:
          return _context.abrupt("return", data);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.callApi = callApi;