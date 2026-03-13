import {createThinkCards} from './createThinkCards';
import { Feedback } from '../../types/testimonials';
import {feedbackApi} from '../api/feedbackApi';

const commentsContainer = document.querySelector('.comments-container') as HTMLDivElement;

export async function renderFeedbackCards() {
  if(!commentsContainer) return;

  try {
    const cards: Feedback[] = await feedbackApi();

    commentsContainer.textContent = '';

    cards.forEach( card => {
      const cardElement = createThinkCards(card);
      commentsContainer.append(cardElement);
    })
  } catch (error: unknown) {
    commentsContainer.innerHTML = "";
    const errorMsg = document.createElement("div");
    errorMsg.classList.add("refresh-page-txt")
    errorMsg.textContent = "Something went wrong. Please, refresh the page"
    commentsContainer.append(errorMsg);
    console.log(error);
  }

}

