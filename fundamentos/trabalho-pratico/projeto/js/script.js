const rgb = ['r', 'g', 'b'];
const rangeElements = [];
const numberElements = [];

window.addEventListener('load', () => {
  rgb.map((color) => {
    const rangeElement = document.querySelector(`#range-${color}`);
    rangeElement.addEventListener('input', changeColor);
    rangeElements.push(rangeElement);
    const numberElement = document.querySelector(`#number-${color}`);
    numberElements.push(numberElement);
  });
  changeColor();
});

const changeColor = () => {
  numberElements.map((n, i) => {
    rgb[i] = rangeElements[i].value;
    n.textContent = rangeElements[i].value;
  });
  document.querySelector('body').style.backgroundColor = `rgb(${rgb.join(
    ','
  )})`;
};
