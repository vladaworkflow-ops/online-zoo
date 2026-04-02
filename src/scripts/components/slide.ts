interface CarouselOptions {
  containerSelector: string;
  slideSelector: string;
  prevBtnSelector: string;
  nextBtnSelector: string;
}

function createCarousel({
  containerSelector,
  slideSelector,
  prevBtnSelector,
  nextBtnSelector,
}: CarouselOptions) {
  const container = document.querySelector(containerSelector) as HTMLDivElement;
  const prevBtn = document.querySelector(prevBtnSelector) as HTMLElement;
  const nextBtn = document.querySelector(nextBtnSelector) as HTMLElement;

  function moveRight() {
    const firstSlide = container.querySelector(slideSelector) as HTMLElement;
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
  nextBtnSelector: '#move-slide-right',
});

createCarousel({
  containerSelector: '.comments-container',
  slideSelector: '.comments-content',
  prevBtnSelector: '#comment-slide-left',
  nextBtnSelector: '#comment-slide-right',
});
