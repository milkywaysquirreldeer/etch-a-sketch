const surface = document.querySelector('.etching-surface');

/* Dynamically fill the etching surface with "pixels", depending on pixels-per-
side value provided by user */
generatePixels = function(pixelCountPerSide) {
  const surfaceVhPercent = 70;
  const pixelHeightWidth = surfaceVhPercent/pixelCountPerSide;
  for (let i=1; i<=(pixelCountPerSide**2); i++) {
    const surfaceUnit = document.createElement('div');
    surfaceUnit.classList.add('surface-unit');
    surfaceUnit.style.height = `${pixelHeightWidth}vh`;
    surfaceUnit.style.width = `${pixelHeightWidth}vh`;
    surface.appendChild(surfaceUnit);
  }
}

let userPixelsPerSide = 16;
generatePixels(userPixelsPerSide);

// Make the "pixels" responsive to mouse hover to enable etching functionality
const surfaceUnits = document.querySelectorAll('.surface-unit');
surfaceUnits.forEach(unit => unit.addEventListener('mouseover',
 () => unit.classList.add('etched')));
