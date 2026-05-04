const grid = document.querySelector(".properties-section__grid");
const sourceCards = Array.from(document.querySelectorAll(".property-card"));
const pagination = document.querySelector(".properties-section__pagination");
const pagesContainer = document.querySelector(".properties-pagination__pages");
const paginationButtons = pagination
  ? Array.from(pagination.querySelectorAll(".properties-pagination__btn"))
  : [];
const prevBtn =
  document.querySelector("[data-pagination-prev]") || paginationButtons[0];
const nextBtn =
  document.querySelector("[data-pagination-next]") ||
  paginationButtons[paginationButtons.length - 1];

const itemsPerPage = 6;
const useRandomPropertyPages = document.body.classList.contains(
  "properties-page",
);
const totalPages = useRandomPropertyPages
  ? 10
  : Math.ceil(sourceCards.length / itemsPerPage);
const shuffledCards = shuffleCards(sourceCards);
let currentPage = 1;

function shuffleCards(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

function renderCards() {
  grid.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const pageCards = useRandomPropertyPages
    ? shuffleCards(sourceCards).slice(0, itemsPerPage)
    : shuffledCards.slice(start, start + itemsPerPage);

  pageCards.forEach((card) => {
    grid.appendChild(card);
  });
}

function createPageButton(page) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "properties-pagination__page";
  btn.textContent = page;
  btn.setAttribute("aria-label", `Go to page ${page}`);

  btn.addEventListener("click", () => {
    goToPage(page);
  });

  return btn;
}

function getVisiblePages() {
  if (!useRandomPropertyPages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis-end", 9, 10];
  }

  if (currentPage < 9) {
    const middleStart = Math.min(Math.max(currentPage - 1, 4), 7);
    return [
      1,
      2,
      3,
      "ellipsis-start",
      middleStart,
      middleStart + 1,
      middleStart + 2,
      "ellipsis-end",
      9,
      10,
    ];
  }

  return [1, 2, 3, "ellipsis-start", 9, 10];
}

function renderPageButtons() {
  pagesContainer.innerHTML = "";

  getVisiblePages().forEach((page) => {
    if (typeof page === "string" && page.startsWith("ellipsis")) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "properties-pagination__ellipsis";
      ellipsis.setAttribute("aria-hidden", "true");
      ellipsis.textContent = "...";
      pagesContainer.appendChild(ellipsis);
      return;
    }

    pagesContainer.appendChild(createPageButton(page));
  });
}

function updatePaginationUI() {
  document.querySelectorAll(".properties-pagination__page").forEach((btn) => {
    const isCurrent = Number(btn.textContent) === currentPage;

    btn.classList.toggle("properties-pagination__page--active", isCurrent);

    if (isCurrent) {
      btn.setAttribute("aria-current", "page");
    } else {
      btn.removeAttribute("aria-current");
    }
  });

  prevBtn.disabled = currentPage === 1;
  prevBtn.setAttribute("aria-disabled", String(prevBtn.disabled));

  nextBtn.disabled = currentPage === totalPages;
  nextBtn.setAttribute("aria-disabled", String(nextBtn.disabled));
}

function goToPage(page) {
  currentPage = Math.min(Math.max(page, 1), totalPages);
  renderPageButtons();
  renderCards();
  updatePaginationUI();
}

if (grid && sourceCards.length && pagesContainer && prevBtn && nextBtn) {
  renderPageButtons();
  goToPage(currentPage);

  prevBtn.addEventListener("click", () => {
    goToPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToPage(currentPage + 1);
  });
}
