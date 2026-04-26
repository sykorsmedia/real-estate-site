(() => {
  const gallery = document.querySelector("[data-gallery]");
  const track = document.querySelector("[data-gallery-track]");
  const prevButton = document.querySelector(
    ".property-house-about-gallery-btn--prev",
  );
  const nextButton = document.querySelector(
    ".property-house-about-gallery-btn--next",
  );

  if (!gallery || !track || !prevButton || !nextButton) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  let currentIndex = 0;

  const getVisibleSlides = () => (window.innerWidth >= 768 ? 2 : 1);

  const getStepSize = () => {
    if (slides.length < 2) return slides[0].getBoundingClientRect().width;

    const firstRect = slides[0].getBoundingClientRect();
    const secondRect = slides[1].getBoundingClientRect();
    return secondRect.left - firstRect.left;
  };

  const getMaxIndex = () => Math.max(0, slides.length - getVisibleSlides());

  const updateButtons = () => {
    const maxIndex = getMaxIndex();
    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= maxIndex;
  };

  const updateSlider = () => {
    const maxIndex = getMaxIndex();
    currentIndex = Math.min(currentIndex, maxIndex);
    const offset = getStepSize() * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
    updateButtons();
  };

  prevButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);

  updateSlider();
})();
