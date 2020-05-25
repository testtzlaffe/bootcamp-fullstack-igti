"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// lists
var allUsers = [];
var filteredUsers = []; // elements

var inputElement = null;
var userListInfoElement = null;
var totalFilteredUsersElement = null;
var totalFilteredFemaleElement = null;
var totalFilteredMaleElement = null;
var totalUsers = null;
var ageSumElement = null;
var ageAverageElement = null;
var button = null;
var showStatisticsElement = null;
var statisticsElement = null; // statistics

var totalFilteredUsers = 0;
var totalFilteredMale = 0;
var totalFilteredFemale = 0;
var ageSum = 0;
var showStatistics = false;
var numberFormat = Intl.NumberFormat("pt-BR");
window.addEventListener("load", function () {
  selectElements();
  fetchUsers();
});

var selectElements = function selectElements() {
  inputElement = document.querySelector("#name");
  inputElement.focus();
  inputElement.addEventListener("input", filterUsers);
  userListInfoElement = document.querySelector("#listInfo");
  totalFilteredUsersElement = document.querySelector("#totalFilteredUsers");
  totalFilteredMaleElement = document.querySelector("#totalFilteredMale");
  totalFilteredFemaleElement = document.querySelector("#totalFilteredFemale");
  ageSumElement = document.querySelector("#ageSum");
  ageAverageElement = document.querySelector("#ageAverage");
  button = document.querySelector("button");
  showStatisticsElement = document.querySelector("#showStatistics");
  showStatisticsElement.addEventListener("click", toggleStatistics);
  statisticsElement = document.querySelector("#statistics");
  console.log(showStatisticsElement);
};

var fetchUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            json = _context.sent;
            console.log(json);
            allUsers = json.results.map(function (user) {
              var gender = user.gender,
                  name = user.name,
                  dob = user.dob,
                  picture = user.picture;
              var completeName = "".concat(name.first, " ").concat(name.last);
              return {
                completeName: completeName,
                age: dob.age,
                gender: gender,
                thumbnail: picture.thumbnail
              };
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchUsers() {
    return _ref.apply(this, arguments);
  };
}();

var filterUsers = function filterUsers() {
  var name = event.target.value.trim();

  if (!name) {
    filteredUsers = [];
  } else {
    filteredUsers = allUsers.filter(function (user) {
      return user.completeName.toLowerCase().includes(name.toLowerCase());
    });
    filteredUsers = sortUsers(filteredUsers);
  }

  calc();
  render();
};

var render = function render() {
  statistics();
  list();
};

var sortUsers = function sortUsers() {
  return filteredUsers.sort(function (a, b) {
    return a.completeName.localeCompare(b.completeName);
  });
};

var list = function list() {
  if (!filteredUsers) {
    console.log("sem usuarios");
    console.log(filteredUsers);
    console.log(totalFilteredUsers);
    console.log(totalFilteredUsersElement);
    return;
  }

  var userListHTML = "<ul>";
  filteredUsers.forEach(function (user) {
    userListHTML += "\n            <li>\n                <img class=\"photo\" src=\"".concat(user.thumbnail, "\" alt=\"User photo\" />\n                <span class=\"name\">").concat(user.completeName, " <span><span class=\"idade\">| ").concat(user.age, " ").concat(user.age > 1 ? "anos" : "ano", "</span>\n            \n            </li>\n        ");
  });
  userListHTML += "</ul>";
  userListInfoElement.innerHTML = userListHTML;
  totalFilteredUsersElement.textContent = totalFilteredUsers;
};

var statistics = function statistics() {
  totalFilteredMaleElement.textContent = totalFilteredMale;
  totalFilteredFemaleElement.textContent = totalFilteredFemale;
  totalFilteredUsersElement.textContent = totalFilteredUsers;
  ageSumElement.textContent = formatNumber(ageSum);
  ageAverageElement.textContent = formatNumber(ageAverage);
};

var calc = function calc() {
  totalFilteredUsers = filteredUsers.length;
  totalFilteredMale = totalByGender("male");
  totalFilteredFemale = totalByGender("female");
  ageSum = sumAge();
  ageAverage = average();
};

var totalByGender = function totalByGender(gender) {
  return filteredUsers.filter(function (user) {
    return user.gender === gender;
  }).length;
};

var sumAge = function sumAge() {
  return filteredUsers.reduce(function (acc, curr) {
    return acc + curr.age;
  }, 0);
};

var average = function average() {
  if (totalFilteredUsers === 0) {
    return 0;
  }

  return ageSum / totalFilteredUsers;
};

var formatNumber = function formatNumber(number) {
  return numberFormat.format(number);
};

var toggleStatistics = function toggleStatistics() {
  console.log(showStatistics);
  showStatistics = !showStatistics;
  var display = showStatistics ? "block" : "none";
  var buttonTextContent = showStatistics ? "Esconder estatísticas" : "Mostrar estatísticas";
  statisticsElement.style.display = display;
  showStatisticsElement.textContent = buttonTextContent;
};
