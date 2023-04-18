const containerDiv = document.querySelector('.doodling-surface');

for (let i=1; i<=256; i++) {
  const inkSquare = document.createElement('div');
  inkSquare.classList.add('ink-square');
  containerDiv.appendChild(inkSquare);
}
