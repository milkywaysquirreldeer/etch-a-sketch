const defaultMode = 'classic';
let currentMode = defaultMode;

const displayMode = function() {
  const currentModeFriendly = currentMode.charAt(0).toUpperCase() + 
   currentMode.slice(1);
  document.querySelector('.mode-info-dynamic').textContent =
   currentModeFriendly;
}

displayMode();

// Makes all "pixels" responsive to mouse hover to enable etching functionality
const enableGridPixels = function () {
  if (currentMode === 'classic') {
  document.querySelectorAll('.grid-pixel').forEach(pixel =>
   pixel.addEventListener('mouseover', () => pixel.classList.add('etched')));
  } else if (currentMode === 'rainbow') {
    document.querySelectorAll('.grid-pixel').forEach(pixel =>
     pixel.addEventListener('mouseover', rainbowEtch));
  }
};

const defaultPixelsPerSide = 15;
let currentPixelsPerSide = defaultPixelsPerSide;

/* Dynamically wipes existing "pixels" and refills the etching surface with new
  ones, based on a pixel count provided by the user */
const generateGridPixels = function(pixelCountPerSide) {
  document.querySelectorAll('.grid-pixel').forEach(pixel => pixel.remove());
  const gridSurfaceVhPercent = 70;
  const pixelHeightWidth = gridSurfaceVhPercent/pixelCountPerSide;
  for (let i=1; i<=(pixelCountPerSide**2); i++) {
    const gridPixel = document.createElement('div');
    gridPixel.classList.add('grid-pixel');
    gridPixel.style.height = `${pixelHeightWidth}vh`;
    gridPixel.style.width = `${pixelHeightWidth}vh`;
    document.querySelector('.etching-grid-surface').appendChild(gridPixel);
    enableGridPixels();
  }
};

const modes = ['classic', 'rainbow', 'airbrush'];

// Set up the mode buttons' functionality
for (const m of modes) {
document.querySelector(`.${m}-mode-button`).addEventListener('click',
 () => currentMode = `${m}`);
document.querySelector(`.${m}-mode-button`).addEventListener('click',
 displayMode);
document.querySelector(`.${m}-mode-button`).addEventListener('click',
 () => generateGridPixels(currentPixelsPerSide));
document.querySelector(`.${m}-mode-button`).addEventListener('click',
 () => alert(`Switching to ${m} mode; the grid will now refresh.`));
}

generateGridPixels(defaultPixelsPerSide);

const displayGridDimensions = function() {
  const totalPixels = (currentPixelsPerSide ** 2);
  document.querySelector('.grid-info-dynamic').textContent =
   `${currentPixelsPerSide}x${currentPixelsPerSide} (${totalPixels})`;
};

displayGridDimensions();

/* Button functionality for user-defined grid size */
const changeGridDimensions = function () {
  const expectedValues = [];
  for (let i = 2; i <= 30; i++) {
    expectedValues.push(i);
  }
  let userPixelsPerSide = parseFloat(prompt(`Change the grid resolution? ` +
   `There are currently ${currentPixelsPerSide} drawing squares per side ` +
    `(higher values will take longer to load). Valid range is 2 - 30.`,
     currentPixelsPerSide));
  switch(true) {
    case (userPixelsPerSide == null) : return;
    case (!expectedValues.includes(userPixelsPerSide)) : {
      alert('Expected values are whole numbers from 2 to 30.');
      break;
    }
    case (userPixelsPerSide >= 25) : alert(`This would be one of those`
    + ` higher values that can take longer to load! Refreshing the grid.`)
    default : {
      currentPixelsPerSide = userPixelsPerSide;
      generateGridPixels(currentPixelsPerSide);
      displayGridDimensions();
    }
  }
};

document.querySelector('.change-grid-size-button').addEventListener('click',
 changeGridDimensions);

/* Button functionality to erase current sketch */
const eraseGrid = function() {
  if (currentMode === 'classic')
  document.querySelectorAll('.etched').forEach(etchedPixel =>
    etchedPixel.classList.remove('etched'));
  else if (currentMode === 'rainbow') {
    for (let i=0; i <= 5; i++) {
      document.querySelectorAll(`.rainbow-etched-${i}`).forEach(rainbowPixel =>
       rainbowPixel.classList.remove(`rainbow-etched-${i}`));
    }
  }
};

document.querySelector('.erase-grid-button').addEventListener('click',
 eraseGrid);

let colorCode = 0;
const clearAllEtching = function() {
  for (let i=0; i <= 5; i++) {
    this.classList.remove(`rainbow-etched-${i}`);
  }
};

// Cycles through classes on each new hover event to provide a rainbow effect
function rainbowEtch() {
  switch (colorCode) {
    case 0 : this.classList.add('rainbow-etched-0'); //red
    break;
    case 1 : this.classList.add('rainbow-etched-1'); //orange
    break;
    case 2 : this.classList.add('rainbow-etched-2'); //yellow
    break;
    case 3 : this.classList.add('rainbow-etched-3'); //green
    break;
    case 4 : this.classList.add('rainbow-etched-4'); //blue
    break;
    case 5: this.classList.add('rainbow-etched-5'); //indigo
    break;
  }
  colorCode ++;
  if (colorCode > 5) colorCode = 0;
}
