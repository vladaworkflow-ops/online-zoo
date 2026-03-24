const togetherOpenBtn = document.querySelectorAll('.cam-button') as  NodeListOf<HTMLDivElement>;
const togetherBtn = document.querySelectorAll('.together-donate-btn') as NodeListOf<HTMLButtonElement>;
const overlay = document.querySelector('.overlay') as  HTMLElement;
const modal = document.querySelector('.modal-together-container') as  HTMLElement;
const closeModalBtn = document.querySelector('.close-modal-together') as  HTMLElement;
const donationBtn = document.querySelectorAll('.donation-btn') as NodeListOf<HTMLButtonElement>;
const modalDonation = document.querySelector('.modal-donation-container') as  HTMLElement;
const donationBtnIcon = document.querySelector('#donation-btn-icon') as HTMLElement;
const donationBtnInput = document.querySelector('#donation-btn-input') as HTMLInputElement;

const initialValue = donationBtnInput.value;

donationBtnInput.addEventListener("blur", () => {
  if (donationBtnInput.value.trim() === "") {
    donationBtnInput.value = initialValue;
  }
});

donationBtnInput.addEventListener("focus", () => {
  donationBtnInput.value = "";
})

function handlerDonationModal(){
  overlay.classList.add('active-modal');
  modalDonation.classList.add('active-modal');
}

donationBtn.forEach((btn: HTMLElement) => {
  if(!overlay && !modalDonation) return

  btn.addEventListener('click', () => {
    handlerDonationModal()
  })
})

togetherBtn.forEach((btn: HTMLElement) => {
  if(!overlay && !modalDonation) return

  btn.addEventListener('click', () => {
    handlerDonationModal();
    modal.classList.remove('active-modal');
  })
})


if (donationBtnIcon && overlay && modalDonation) {
  donationBtnIcon.addEventListener('click', (event) => {
    event.stopPropagation();

    handlerDonationModal()
  });
}

togetherOpenBtn.forEach((btn: HTMLElement) => {
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