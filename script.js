const container = document.querySelector(".container");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");

let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;
let containerSize;
const WIDTH_BUFFER = 10;

if (containerHeight > containerWidth){
  containerSize = window.innerWidth - WIDTH_BUFFER;
} else{
  containerSize = window.innerHeight-header.clientHeight - footer.clientHeight;
}

let gridWidth = 50;
let pixelSize = Math.floor(containerSize/gridWidth);
containerSize = pixelSize*gridWidth
container.style.width = `${containerSize}px`;
container.style.height = `${containerSize}px`;

for (let i = 0; i < gridWidth**2; i++){
  container.appendChild(document.createElement("div"));
  container.lastChild.classList.add("pixel");
  container.lastChild.addEventListener("mouseover", lightPixel);
  container.lastChild.style.width = `${pixelSize}px`;
  container.lastChild.style.height = `${pixelSize}px`;
  container.lastChild.style.backgroundColor = "rgb(255,255,255)";
}

pixels = document.querySelectorAll(".container div")
window.addEventListener("resize", resizeListener);

let currentColor = 0;
let colorChangeFactor = 15;
let newColor = 0;

function lightPixel(e) {
  currentColor = +e.target.style.backgroundColor.split(",")[1];
  if (currentColor === undefined){
    currentColor = 255;
  };

  if (e.ctrlKey === true){
    newColor = Math.floor(currentColor+colorChangeFactor);
  } else{
    newColor = Math.floor(currentColor-colorChangeFactor);
  };

  if (newColor >255 || newColor < 0){
    newColor = currentColor;
  };
  e.target.style.backgroundColor = `rgb(${newColor},${newColor},${newColor})`;
};

function resizeListener(e) {
  pixels = document.querySelectorAll(".container div")
  containerWidth = window.innerWidth;
  containerHeight = window.innerHeight;
  if (containerHeight > containerWidth){
    containerSize = window.innerWidth - WIDTH_BUFFER;
  } else{
    containerSize = window.innerHeight-header.clientHeight - footer.clientHeight;
  }
  pixelSize = Math.floor(containerSize/gridWidth);
  containerSize = Math.floor(pixelSize*gridWidth);
  container.style.width = `${containerSize}px`;
  container.style.height = `${containerSize}px`;
  pixels.forEach(updatePixelSize);
}

function updatePixelSize(pixel){
  pixel.style.width = `${pixelSize}px`;
  pixel.style.height = `${pixelSize}px`;
}

function changeGridWidth(){
  gridWidth = parseInt(prompt("What is the size of the grid that you want?"),10);
  pixelSize = Math.floor(containerSize/gridWidth);
  containerSize = Math.floor(pixelSize*gridWidth);
  container.style.width = `${containerSize}px`;
  container.style.height = `${containerSize}px`;
  removeAllChildNodes(container)
  for (let i = 0; i < gridWidth**2; i++){
    container.appendChild(document.createElement("div"));
    container.lastChild.classList.add("pixel");
    container.lastChild.addEventListener("mouseover", lightPixel);
    container.lastChild.style.width = `${pixelSize}px`;
    container.lastChild.style.height = `${pixelSize}px`;
    container.lastChild.style.backgroundColor = "rgb(255,255,255)";
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
