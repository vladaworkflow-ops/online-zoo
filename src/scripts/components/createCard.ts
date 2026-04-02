import { Cards } from '../../types/pet-cards';
import { cardData } from '../../data/data';
import loaderImg from '../../assets/icons/loading.png';

export function createAnimalCard(card: Cards): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = 'slide-animal-card-link';
  link.id = `card-${card.id}`;
  link.href = '../animal/zoos.html';

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'slide-animal-card';

  const nameCard = document.createElement('div');
  nameCard.className = 'name-card';
  nameCard.textContent = card.name;

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'card-img';

  const img = document.createElement('img');
  const localCard = cardData.find((item) => item.id === card.id);

  img.src = localCard?.petImg || loaderImg;
  img.alt = card.name;

  const aboutCard = document.createElement('div');
  aboutCard.className = 'about-card';

  const animalName = document.createElement('h3');
  animalName.className = 'name-animal';
  animalName.textContent = card.commonName;

  const description = document.createElement('p');
  description.className = 'about-animal';
  description.textContent = card.description;

  const button = document.createElement('div');
  button.className = 'cam-button';
  button.textContent = 'VIEW LIVE CAM';

  imgWrapper.append(img);

  aboutCard.append(animalName, description, button);
  cardWrapper.append(nameCard, imgWrapper, aboutCard);
  link.append(cardWrapper);

  return link;
}

export function createLoader(container: HTMLDivElement): void {
  if (!container) return;

  container.innerHTML = '';
  const loader = document.createElement('img');
  loader.className = 'slider-loader';
  loader.src = loaderImg;
  loader.alt = 'Loading...';
  container.appendChild(loader);
}
