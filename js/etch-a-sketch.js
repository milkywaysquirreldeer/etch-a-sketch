const surface = document.querySelector('.etching-surface');

// Fill the etching surface with "pixels"
for (let i=1; i<=256; i++) {
  const surfaceUnit = document.createElement('div');
  surfaceUnit.classList.add('surface-unit');
  surface.appendChild(surfaceUnit);
}

// Make the "pixels" responsive to mouse hover to enable etching functionality
const surfaceUnits = document.querySelectorAll('.surface-unit');
surfaceUnits.forEach(unit => unit.addEventListener('mouseover',
 () => unit.classList.add('etched')));
