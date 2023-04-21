const defaultMode = 'classic';
let currentMode = defaultMode;

const displayMode = function() {
  const currentModeCapitalized = currentMode.charAt(0).toUpperCase() + 
   currentMode.slice(1);
  document.querySelector('.mode-info-dynamic').textContent =
   currentModeCapitalized;
}

displayMode();

// Makes all "pixels" responsive to mouse hover to enable etching functionality
const enableGridPixels = function () {
  switch(currentMode) {
    case 'classic':
      document.querySelectorAll('.grid-pixel').forEach(pixel =>
       pixel.addEventListener('mouseover', () =>
       pixel.classList.add('etched')));
      break;
    case 'rainbow':
      document.querySelectorAll('.grid-pixel').forEach(pixel =>
       pixel.addEventListener('mouseover', rainbowEtch));
      break;
    case 'airbrush':
      document.querySelectorAll('.grid-pixel').forEach(pixel =>
       pixel.addEventListener('mouseover', airbrushEtch));
  }
}

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

const setGridFrameColor = function() {
  const gridFrame = document.querySelector('.etching-grid-surface');
  const clearGridFrame = function() {
    for (const m of modes) {
      gridFrame.classList.remove(`${m}-mode-grid-frame`)
    }
  }
  switch(currentMode) {
    case 'classic':
      clearGridFrame();
      gridFrame.classList.add('classic-mode-grid-frame');
      break;
    case 'rainbow':
      clearGridFrame();
      gridFrame.classList.add('rainbow-mode-grid-frame');
      break;
    case 'airbrush':
      clearGridFrame();
      gridFrame.classList.add('airbrush-mode-grid-frame');
  }
}

setGridFrameColor();

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
  document.querySelector(`.${m}-mode-button`).addEventListener('click',
   setGridFrameColor);
}

generateGridPixels(defaultPixelsPerSide);

const displayGridDimensions = function() {
  const totalPixels = (currentPixelsPerSide ** 2);
  document.querySelector('.grid-info-dynamic').textContent =
   `${currentPixelsPerSide} x ${currentPixelsPerSide} (${totalPixels} squares)`;
};

displayGridDimensions();

/* Provides button functionality for user-defined grid size */
const changeGridDimensions = function () {
  const minExpected = 2;
  const maxExpected = 30;
  const expectedValues = [];
  for (let i = minExpected; i <= maxExpected; i++) {
    expectedValues.push(i);
  }
  let userPixelsPerSide = parseFloat(prompt(`Change the grid resolution? ` +
   `There are currently ${currentPixelsPerSide} drawing squares per side ` +
   `(higher values will take longer to load). Valid range is ${minExpected}` +
   `- ${maxExpected}.`, currentPixelsPerSide));
  switch(true) {
    case (userPixelsPerSide == null) : return;
    case (!expectedValues.includes(userPixelsPerSide)) : {
      alert(`Expected values are whole numbers from ${minExpected} to ` +
       `${maxExpected}.`);
      break;
    }
    case (userPixelsPerSide >= 25) : alert(`This would be one of those ` +
     `higher values that can take longer to load! Refreshing the grid.`)
    default : {
      currentPixelsPerSide = userPixelsPerSide;
      generateGridPixels(currentPixelsPerSide);
      displayGridDimensions();
    }
  }
};

document.querySelector('.change-grid-size-button').addEventListener('click',
 changeGridDimensions);

const etched = 'etched';
const rainbowed = 'rainbow-etched-';
const airbrushed = 'airbrushed-pass-';

/* Provides button functionality to erase current sketch */
const eraseGrid = function() {
  switch(currentMode) {
    case 'classic':
      document.querySelectorAll(`.${etched}`).forEach(etchedPixel =>
      etchedPixel.classList.remove(`${etched}`));
      break;
    case 'rainbow':
      for (let i=0; i <= 5; i++) {
        document.querySelectorAll(`.${rainbowed}${i}`).forEach(rainbowedPixel =>
        rainbowedPixel.classList.remove(`${rainbowed}${i}`));
      }
      break;
    case 'airbrush':
      for (let i=0; i <= 9; i++) {
        document.querySelectorAll(`.${airbrushed}${i}`).forEach(
         airbrushedPixel =>
         airbrushedPixel.classList.remove(`${airbrushed}${i}`));
      }
  }
};

document.querySelector('.erase-grid-button').addEventListener('click',
 eraseGrid);

let colorCode = 0;

// Cycles through classes on each new hover event to provide a rainbow effect
function rainbowEtch() {
  switch (colorCode) {
    case 0 : this.classList.add(`${rainbowed}0`); //red
    break;
    case 1 : this.classList.add(`${rainbowed}1`); //orange
    break;
    case 2 : this.classList.add(`${rainbowed}2`); //yellow
    break;
    case 3 : this.classList.add(`${rainbowed}3`); //green
    break;
    case 4 : this.classList.add(`${rainbowed}4`); //blue
    break;
    case 5 : this.classList.add(`${rainbowed}5`); //indigo
  }
  colorCode ++;
  if (colorCode > 5) colorCode = 0;
}

/* Paints the surface area in "coats", darkening the pixel further on each
successive hover event */
function airbrushEtch() {
  const darkest = 9;
  const lightest = 0;
  if (!this.classList.contains(`${airbrushed}${lightest}`)) {
    this.classList.add(`${airbrushed}${lightest}`);
  } else {
    for (let i = (darkest - 1); i >= lightest; i--) {
      if (this.classList.contains(`${airbrushed}${i}`)) {
        this.classList.add(`${airbrushed}${i + 1}`);
      }
    }
  }
}