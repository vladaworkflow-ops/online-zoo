const togetherBtn = document.querySelectorAll('.cam-button') as  NodeListOf<HTMLDivElement>;
const footerDonateBtn = document.querySelectorAll('.footer-button-donate') as NodeListOf<HTMLButtonElement>;
const overlay = document.querySelector('.overlay') as  HTMLElement;
const modal = document.querySelector('.modal-together-container') as  HTMLElement;
const closeModalBtn = document.querySelector('.close-modal-together') as  HTMLElement;
const donationBtn = document.querySelectorAll('.donation-btn') as  NodeListOf<HTMLDivElement>;
const modalDonation = document.querySelector('.modal-donation-container') as  HTMLElement;

footerDonateBtn.forEach((btn: HTMLButtonElement) => {
  if(!overlay && !modalDonation) return;

  btn.addEventListener('click', () => {
    overlay.classList.add('active-modal');
    modalDonation.classList.add('active-modal');
  })
})

donationBtn.forEach((btn: HTMLElement) => {
  if(!overlay && !modalDonation) return

  btn.addEventListener('click', () => {
    overlay.classList.add('active-modal');
    modalDonation.classList.add('active-modal');
  })
})

togetherBtn.forEach((btn: HTMLElement) => {
  btn.addEventListener('click', () => {
    overlay.classList.add('active-modal');
    modal.classList.add('active-modal');
  });
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('active-modal');

  if (modal) {
    modal.classList.remove('active-modal');
  }
  modalDonation.classList.remove('active-modal');
})

closeModalBtn.addEventListener('click', () => {
  overlay.classList.remove('active-modal');
  modal.classList.remove('active-modal');
});