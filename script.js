const container = document.querySelector(".container");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const gameBody = document.querySelector(".gameBody");
const acc = document.getElementById('acc');

document.querySelectorAll(".wheel").forEach(wheel => wheel.addEventListener("mousedown", () => alert("I'm sorry, these knobs are lies. Just use the mouse on the display. As a consolation, I'll let you use the control key to make pixels lighter instead of darker.")))

let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;
let containerSize;
const GAME_BODY_WIDTH = 100;

if (containerHeight > containerWidth){
  containerSize = window.innerWidth - GAME_BODY_WIDTH ;
} else{
  containerSize = window.innerHeight - header.clientHeight - footer.clientHeight;
}

let gridWidth = 50;
let pixelSize = Math.floor(containerSize/gridWidth);
containerSize = pixelSize*gridWidth
container.style.width = `${containerSize}px`;
container.style.height = `${containerSize}px`;
gameBody.style.width = `${containerSize+200}px`;
footer.style.width = `${containerSize}px`;

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
    containerSize = window.innerWidth - GAME_BODY_WIDTH;
  } else{
    containerSize = window.innerHeight-header.clientHeight - footer.clientHeight;
  }
  pixelSize = Math.floor(containerSize/gridWidth);
  containerSize = Math.floor(pixelSize*gridWidth);
  container.style.width = `${containerSize}px`;
  container.style.height = `${containerSize}px`;
  gameBody.style.width = `${containerSize+200}px`;
  footer.style.width = `${containerSize}px`;
  pixels.forEach(updatePixelSize);
}

function updatePixelSize(pixel){
  pixel.style.width = `${pixelSize}px`;
  pixel.style.height = `${pixelSize}px`;
}

function changeGridWidth(){
  gridWidth = parseInt(prompt("What is the size of the grid that you want?"),10);
  while (gridWidth > 100){
    gridWidth = parseInt(prompt("I'm sorry, that is too big of a grid size, please try something smaller."),10);
  }
  pixelSize = Math.floor(containerSize/gridWidth);
  containerSize = Math.floor(pixelSize*gridWidth);
  container.style.width = `${containerSize}px`;
  container.style.height = `${containerSize}px`;
  gameBody.style.width = `${containerSize+200}px`;
  footer.style.width = `${containerSize}px`;
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

function clearGame(){
document.querySelectorAll(".container div")
  .forEach(pixel => pixel.style.backgroundColor = "rgb(255,255,255)");
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
let valueArray= [];
window.addEventListener('devicemotion', (event) => {
  const accNorm = Math.sqrt(event.acceleration.x**2 + event.acceleration.y**2 + event.acceleration.z**2);
  if (accNorm >= 60){
    clearGame();
  }
});

let permissionGranted = false;

document.getElementById('shakeToErase').addEventListener('click', () => {
  try {
    if (!permissionGranted) {
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
         alert('You can now shake to erase pixels.'); 
         permissionGranted = true;
        }
    })}
  clearGame();
  
  } catch (e) {
    clearGame();
  }});

  )});
