const form = document.querySelector(".consultation-section__form");
const modal = document.getElementById("consultation-modal");
const modalMessage = document.getElementById("modal-message");
const closeBtn = document.getElementById("modal-close");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value;

  modalMessage.textContent =
    "Thank you, " +
    name +
    "! Your request has been received. We will contact you shortly.";

  modal.classList.add("active");

  form.reset();
});

// închidere popup
closeBtn.addEventListener("click", function () {
  modal.classList.remove("active");
});

// opțional: închidere dacă dai click pe overlay
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
