import { Feedback } from '../../types/testimonials';

export function createThinkCards(card: Feedback) {
  const commentcontent = document.createElement('div');
  commentcontent.classList.add('comments-content');
  commentcontent.id = `feed-id: ${card.id}`;

  const commentsIcon = document.createElement('div');
  commentsIcon.classList.add('comments-icon');

  const imgIcon = document.createElement('img');
  imgIcon.src = '../../assets/icons/comment-icon.png';
  imgIcon.alt = 'parentheses';

  const imgTitle = document.createElement('img');
  imgTitle.src = '../../assets/icons/comment-icon.png';
  imgTitle.alt = 'parentheses';
  imgTitle.classList.add('comments-icon-tabl');

  const commentsTitle = document.createElement('h3');
  commentsTitle.classList.add('comments-title');
  commentsTitle.textContent = `${card.city}, ${card.month} ${card.year}`;

  const commentsText = document.createElement('p');
  commentsText.classList.add('comment-text');
  commentsText.textContent = card.text;

  const commentUser = document.createElement('h4');
  commentUser.classList.add('comment-user-name');
  commentUser.textContent = card.name;

  commentsTitle.append(imgTitle);
  commentcontent.append(commentsIcon, commentsTitle, commentsText, commentUser);

  return commentcontent;
}
