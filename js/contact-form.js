const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("contact-modal");
const contactMessage = document.getElementById("contact-modal-message");
const contactClose = document.getElementById("contact-modal-close");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = contactForm.name.value;

  contactMessage.textContent =
    "Thank you, " +
    name +
    "! Your message has been sent. We will contact you shortly.";

  contactModal.classList.add("active");

  contactForm.reset();
});

contactClose.addEventListener("click", function () {
  contactModal.classList.remove("active");
});

contactModal.addEventListener("click", function (e) {
  if (e.target === contactModal) {
    contactModal.classList.remove("active");
  }
});
