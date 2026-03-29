import { petCardsApi } from '../api/petCardApi';
import { Cards } from '../../types/pet-cards';
import { createAnimalCard, createLoader } from './createCard'
import { renderFeedbackCards } from './renderThinkCards';
import userIn from "../../assets/icons/user-in.png";
const slideContainer = document.querySelector('.meet-slide-container') as HTMLDivElement;
const commentsContainer = document.querySelector('.comments-container') as HTMLDivElement;


async function renderCards() {
  if (!slideContainer) return;

  try {
    const cards: Cards[] = await petCardsApi();

    slideContainer.innerHTML = "";

    cards.forEach( card => {
      const cardElement = createAnimalCard(card);
      slideContainer.appendChild(cardElement)
    })
  } catch (error: unknown){
    slideContainer.innerHTML = "";
    const errorMsg = document.createElement("div");
    errorMsg.classList.add("refresh-page-txt")
    errorMsg.textContent = "Something went wrong. Please, refresh the page"
    slideContainer.append(errorMsg);
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.querySelector('.user-icon') as HTMLElement | null;
  if (!userIcon) return;

  userIcon.style.backgroundImage = `url(${userIn})`;
  createLoader(slideContainer);
  renderCards();
  createLoader(commentsContainer);
  renderFeedbackCards();
})