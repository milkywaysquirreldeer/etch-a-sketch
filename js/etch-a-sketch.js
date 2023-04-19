// Makes all "pixels" responsive to mouse hover to enable etching functionality
const enableGridPixels = function () { 
  document.querySelectorAll('.grid-pixel').forEach(pixel =>
   pixel.addEventListener('mouseover', () => pixel.classList.add('etched')));
};

/* Dynamically wipes existing "pixels" and refills the etching surface with new
    ones, using a pixel count defined by user */
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

const defaultPixelsPerSide = 15;
let currentPixelsPerSide = defaultPixelsPerSide;

generateGridPixels(defaultPixelsPerSide);

const displayGridDimensions = function() {
  const totalPixels = (currentPixelsPerSide ** 2);
  document.querySelector('.grid-info-dynamic').textContent =
   `${totalPixels} squares (${currentPixelsPerSide}x${currentPixelsPerSide})`;
};

displayGridDimensions();

/* Button functionality for user-defined grid size */
const changeGridDimensions = function () {
  const userPixelsPerSide = prompt(`Change grid resolution? There are currently
   ${currentPixelsPerSide} drawing squares per side (higher values will take
   longer to load). Valid range is 2 - 30.`,
   currentPixelsPerSide);
  currentPixelsPerSide = userPixelsPerSide;
  generateGridPixels(currentPixelsPerSide);
  displayGridDimensions();
};

const defaultMode = 'Classic';
let currentMode = defaultMode;

const displayMode = function() {
  document.querySelector('.mode-info-dynamic').textContent = currentMode;
}

displayMode();

document.querySelector('.change-grid-size-button').addEventListener('click',
 changeGridDimensions);

/* Button functionality to erase current sketch */
const eraseGrid = function() {
  document.querySelectorAll('.etched').forEach(etchedPixel =>
    etchedPixel.classList.remove('etched'));
  };

document.querySelector('.erase-grid-button').addEventListener('click',
 eraseGrid);
