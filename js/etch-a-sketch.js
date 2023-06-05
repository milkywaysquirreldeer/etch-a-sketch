const grid = {
  drawMode: {
    current: undefined,
    default: 'classic',
    names: [
      'classic',
      'rainbow',
      'airbrush',
    ],
  },
  pixelsPerSide: {
    current: undefined,
    default: 15,
  },
};

grid.drawMode.current = grid.drawMode.default;

const displayDrawMode = function() {
  document.querySelector('.mode-info-dynamic').textContent =
   grid.drawMode.current.toUpperCase();
};

displayDrawMode();

let rainbowColorCounter = 0;

/* Names of HTML classes used to colorize "drawn" pixels */
const pixelClass = {
  etched: 'etched',
  rainbowed: 'rainbow-etched-',
  airbrushed: 'airbrushed-pass-',
};

/* Colorizes individual pixels to simulate drawing/etching. Cycles through
 background colors on each new hover event to provide an overall rainbow
 effect*/
const applyColorRainbow = function() {
  switch (rainbowColorCounter) {
    case 0: this.classList.add(`${pixelClass.rainbowed}0`); //red
    break;
    case 1: this.classList.add(`${pixelClass.rainbowed}1`); //orange
    break;
    case 2: this.classList.add(`${pixelClass.rainbowed}2`); //yellow
    break;
    case 3: this.classList.add(`${pixelClass.rainbowed}3`); //green
    break;
    case 4: this.classList.add(`${pixelClass.rainbowed}4`); //blue
    break;
    case 5: this.classList.add(`${pixelClass.rainbowed}5`); //indigo
  }
  rainbowColorCounter ++;
  if (rainbowColorCounter > 5) rainbowColorCounter = 0;
};

/* Colorizes individual pixels to simulate drawing/etching. Adds a darker 
 background color on each successive hover event to provide an airbrushed /
 spray paint effect*/
const applyColorAirbrush = function() {
  const darkest = 9;
  const lightest = 0;
  if (!this.classList.contains(`${pixelClass.airbrushed}${lightest}`)) {
    this.classList.add(`${pixelClass.airbrushed}${lightest}`);
  } else {
    for (let i = (darkest - 1); i >= lightest; i--) {
      if (this.classList.contains(`${pixelClass.airbrushed}${i}`)) {
        this.classList.add(`${pixelClass.airbrushed}${i + 1}`);
      }
    }
  }
};

const addPixelEventListeners = function() {
  switch(grid.drawMode.current) {
    case 'classic':
      document.querySelectorAll('.grid-pixel').forEach(
        function(pixel) {
          pixel.addEventListener('mouseover',
            function() {
              pixel.classList.add('etched');
            }
          );
        }
      );
      break;
    case 'rainbow':
      document.querySelectorAll('.grid-pixel').forEach(
        function(pixel) {
          pixel.addEventListener('mouseover', applyColorRainbow);
        }
      );
      break;
    case 'airbrush':
      document.querySelectorAll('.grid-pixel').forEach(
        function(pixel) {
          pixel.addEventListener('mouseover', applyColorAirbrush);
        }
      );
  }
};

/* Wipe current board and redraw pixels to user-specified dimensions */
const generateGridPixels = function(pixelCountPerSide) {
  document.querySelectorAll('.grid-pixel').forEach(
    function(pixel) {
      pixel.remove();
    }
  );
  const gridSurfaceVhPercent = 70;
  const pixelHeightWidth = gridSurfaceVhPercent/pixelCountPerSide;
  for (let i=1; i<=(pixelCountPerSide**2); i++) {
    const gridPixel = document.createElement('div');
    gridPixel.classList.add('grid-pixel');
    gridPixel.style.height = `${pixelHeightWidth}vh`;
    gridPixel.style.width = `${pixelHeightWidth}vh`;
    document.querySelector('.etching-grid-surface').appendChild(gridPixel);
    addPixelEventListeners();
  }
};

const setGridFrameColor = function() {
  const gridFrame = document.querySelector('.etching-grid-surface');
  const clearGridFrame = function() {
    for (const dm of grid.drawMode.names) {
      gridFrame.classList.remove(`${dm}-mode-grid-frame`)
    }
  }
  switch(grid.drawMode.current) {
    case 'classic':
      clearGridFrame();
      gridFrame.classList.add('classic-mode-grid-frame'); //red frame
      break;
    case 'rainbow':
      clearGridFrame();
      gridFrame.classList.add('rainbow-mode-grid-frame'); //blue frame
      break;
    case 'airbrush':
      clearGridFrame();
      gridFrame.classList.add('airbrush-mode-grid-frame'); //black frame
  }
};

setGridFrameColor();

grid.pixelsPerSide.current = grid.pixelsPerSide.default;

/* Set up the mode buttons' functionality */
for (const dm of grid.drawMode.names) {
  document.querySelector(`.${dm}-mode-button`).addEventListener('click',
    function() {
      grid.drawMode.current = `${dm}`;
    }
  );
  document.querySelector(`.${dm}-mode-button`).addEventListener('click',
   displayDrawMode);
  document.querySelector(`.${dm}-mode-button`).addEventListener('click',
    function() {
      generateGridPixels(grid.pixelsPerSide.current);
    }
  );
  document.querySelector(`.${dm}-mode-button`).addEventListener('click',
    function() {
      alert(`Switching to ${dm} mode; the grid will now refresh.`);
    }
  );
  document.querySelector(`.${dm}-mode-button`).addEventListener('click',
   setGridFrameColor);
};

generateGridPixels(grid.pixelsPerSide.default);

const displayGridDimensions = function() {
  const totalPixels = (grid.pixelsPerSide.current ** 2);
  document.querySelector('.grid-info-dynamic').textContent =
   `${grid.pixelsPerSide.current} x ${grid.pixelsPerSide.current} ` +
   `(${totalPixels} squares)`;
};

displayGridDimensions();

/* Set up the "Change grid resolution" button's functionality */
const changeGridDimensions = function() {
  const minExpected = 2;
  const maxExpected = 30;
  const expectedValues = [];
  for (let i = minExpected; i <= maxExpected; i++) {
    expectedValues.push(i);
  }
  const userPixelsPerSide = parseFloat(prompt(`Change the grid resolution? ` +
   `There are currently ${grid.pixelsPerSide.current} drawing squares per ` +
   ` side (higher values will take longer to load). Valid range is ` +
   `${minExpected} - ${maxExpected}.`, grid.pixelsPerSide.current));
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
      grid.pixelsPerSide.current = userPixelsPerSide;
      generateGridPixels(grid.pixelsPerSide.current);
      displayGridDimensions();
    }
  }
};

document.querySelector('.change-grid-size-button').addEventListener('click',
 changeGridDimensions);

/* Provides erase button's functionality */
const eraseGrid = function() {
  switch(grid.drawMode.current) {
    case 'classic':
      document.querySelectorAll(`.${pixelClass.etched}`).forEach(
        function(pixel) {
          pixel.classList.remove(`${pixelClass.etched}`);
        }
      );
      break;
    case 'rainbow':
      for (let i=0; i <= 5; i++) {
        document.querySelectorAll(`.${pixelClass.rainbowed}${i}`).forEach(
          function(pixel) {
            pixel.classList.remove(`${pixelClass.rainbowed}${i}`);
          }
        );
      }
      break;
    case 'airbrush':
      for (let i=0; i <= 9; i++) {
        document.querySelectorAll(`.${pixelClass.airbrushed}${i}`).forEach(
          function(pixel) {
            pixel.classList.remove(`${pixelClass.airbrushed}${i}`);
          }
        );
      }
  }
};

document.querySelector('.erase-grid-button').addEventListener('click',
 eraseGrid);
