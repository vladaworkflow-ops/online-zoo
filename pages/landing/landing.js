const togetherBtn = document.querySelectorAll('.cam-button');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-together-container');
const closeModalBtn = document.querySelector('.close-modal-together');
const donationBtn = document.querySelectorAll('#donation-btn');
const modalDonation = document.querySelector('.modal-donation-container');

donationBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    overlay.classList.add('active-modal');
    modalDonation.classList.add('active-modal');
  })
})

togetherBtn.forEach((btn) => {
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

function createCarousel({
  containerSelector,
  slideSelector,
  prevBtnSelector,
  nextBtnSelector
}) {
  const container = document.querySelector(containerSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  function moveRight() {
    const firstSlide = container.querySelector(slideSelector);
    container.appendChild(firstSlide);
  }

  function moveLeft() {
    const slides = container.querySelectorAll(slideSelector);
    const lastSlide = slides[slides.length - 1];
    container.prepend(lastSlide);
  }

  nextBtn.addEventListener('click', moveRight);
  prevBtn.addEventListener('click', moveLeft);
}

createCarousel({
  containerSelector: '.meet-slide-container',
  slideSelector: '.slide-animal-card-link',
  prevBtnSelector: '#move-slide-left',
  nextBtnSelector: '#move-slide-right'
});

createCarousel({
  containerSelector: '.comments-container',
  slideSelector: '.comments-content',
  prevBtnSelector: '#comment-slide-left',
  nextBtnSelector: '#comment-slide-right'
});

