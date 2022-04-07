const container = document.querySelector(".container");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");


let containerSize = window.innerHeight-header.clientHeight - footer.clientHeight;
let gridWidth = 10;
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
}

pixels = document.querySelectorAll(".container div")
window.addEventListener("resize", resizeListener);
let currentColor = 0;
let currentColorString = 0;
let colorChangeFactor = 15;
let newColor = 0;
let PixelsArray = []

function lightPixel(e) {
  currentColor = e.target.style.backgroundColor.split(",")[1];
  if (currentColor === undefined){
    currentColor = 255;
  };
  if (e.ctrlKey === true){
    colorChangeFactor = -5;
  } else{
    colorChangeFactor = 5;
  };
  newColor = Math.floor(currentColor-colorChangeFactor);
  if (newColor >255 || newColor < 0){
    newColor = currentColor;
  };
  e.target.style.backgroundColor = `rgb(${newColor},${newColor},${newColor})`;
};

function resizeListener(e) {
  containerSize = window.innerHeight-200;
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