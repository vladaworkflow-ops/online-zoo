const animalContainer = document.querySelectorAll('.animal-container');
const menuAnimalContainer = document.querySelectorAll('.menu-animal');

function handleViewAnimal() {

  animalContainer.forEach((container, idx) => {
    container.style.display = idx === 0 ? 'flex' : 'none';
  });

  if (menuAnimalContainer[0]) {
    menuAnimalContainer[0].classList.add('active');
  }

  menuAnimalContainer.forEach((menuEl, index) => {
    menuEl.addEventListener('click', () => {
      animalContainer.forEach(container => {
        container.style.display = 'none';
      });

      if (animalContainer[index]) {
        animalContainer[index].style.display = 'flex';
      }

      menuAnimalContainer.forEach(el => el.classList.remove('active'));
      menuEl.classList.add('active');
    });
  });
}

handleViewAnimal();

const sidePanel = document.querySelector('.side-panel');
const toggleButton = document.querySelector('.handle-side-button');

toggleButton.addEventListener('click', () => {
  sidePanel.classList.toggle('expandable');
});