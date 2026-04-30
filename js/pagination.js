// select elements
const grid = document.querySelector(".properties-section__grid");
const cards = Array.from(document.querySelectorAll(".property-card"));

const nextBtn = document.querySelector(
  ".properties-pagination__btn:last-child",
);
const prevBtn = document.querySelector(
  ".properties-pagination__btn:first-child",
);
const pageButtons = document.querySelectorAll(".properties-pagination__page");

// settings
const itemsPerPage = 6;
let currentPage = 1;

// total pages
const totalPages = Math.ceil(cards.length / itemsPerPage);

// shuffle o singură dată (UX corect)
const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

// render
function renderPage(page) {
  grid.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageItems = shuffledCards.slice(start, end);

  pageItems.forEach((card) => {
    grid.appendChild(card);
  });

  updatePaginationUI();
}

const pagesContainer = document.querySelector(".properties-pagination__pages");

function generatePageButtons() {
  pagesContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "properties-pagination__page";
    btn.textContent = i;

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
    });

    pagesContainer.appendChild(btn);
  }
}

// update UI
function updatePaginationUI() {
  const pageButtons = document.querySelectorAll(".properties-pagination__page");

  pageButtons.forEach((btn, index) => {
    btn.classList.remove("properties-pagination__page--active");
    btn.removeAttribute("aria-current");

    if (index + 1 === currentPage) {
      btn.classList.add("properties-pagination__page--active");
      btn.setAttribute("aria-current", "page");
    }
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// events
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

// click pe pagini (1,2,3...)
pageButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const page = index + 1;

    if (page <= totalPages) {
      currentPage = page;
      renderPage(currentPage);
    }
  });
});

generatePageButtons();
renderPage(currentPage);
