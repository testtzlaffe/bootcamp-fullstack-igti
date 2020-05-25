"use strict";

var rgb = ['r', 'g', 'b'];
var rangeElements = [];
var numberElements = [];
window.addEventListener('load', function () {
  rgb.map(function (color) {
    var rangeElement = document.querySelector("#range-".concat(color));
    rangeElement.addEventListener('input', changeColor);
    rangeElements.push(rangeElement);
    var numberElement = document.querySelector("#number-".concat(color));
    numberElements.push(numberElement);
  });
  changeColor();
});

var changeColor = function changeColor() {
  numberElements.map(function (n, i) {
    rgb[i] = rangeElements[i].value;
    n.textContent = rangeElements[i].value;
  });
  document.querySelector('body').style.backgroundColor = "rgb(".concat(rgb.join(','), ")");
};
