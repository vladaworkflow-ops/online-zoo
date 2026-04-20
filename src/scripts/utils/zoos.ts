const animalContainer = document.querySelectorAll('.animal-container') as NodeListOf<HTMLElement>;
const menuAnimalContainer = document.querySelectorAll('.menu-animal') as NodeListOf<HTMLElement>;
const sidePanel = document.querySelector('.side-panel') as HTMLElement;

function handleViewAnimal() {
  animalContainer.forEach((container, idx) => {
    container.style.display = idx === 0 ? 'flex' : 'none';
  });

  if (menuAnimalContainer[0]) {
    menuAnimalContainer[0].classList.add('active', 'highlighted');
  }

  menuAnimalContainer.forEach((menuEl, index) => {
    menuEl.addEventListener('click', () => {
      animalContainer.forEach((container) => {
        container.style.display = 'none';
      });

      if (animalContainer[index]) {
        animalContainer[index].style.display = 'flex';
      }

      menuAnimalContainer.forEach((el) =>
        el.classList.remove('active', 'highlighted'),
      );
      menuEl.classList.add('active', 'highlighted');
    });
  });
}

handleViewAnimal();

const toggleButton = document.querySelector('.handle-side-button');

toggleButton?.addEventListener('click', () => {
  sidePanel?.classList.toggle('expandable');
});