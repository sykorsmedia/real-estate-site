document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".properties-section__filter");
  const grid = document.querySelector(".properties-section__grid");

  function shuffleCards() {
    const cards = Array.from(grid.children);

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Re-append shuffled cards
    grid.innerHTML = "";
    cards.forEach((card) => grid.appendChild(card));
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // active state
      buttons.forEach((b) => {
        b.classList.remove("properties-section__filter--active");
        b.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("properties-section__filter--active");
      btn.setAttribute("aria-pressed", "true");

      // shuffle cards
      shuffleCards();
    });
  });
});
