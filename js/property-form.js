const propertyForm = document.getElementById("property-contact-form");
const propertyModal = document.getElementById("property-modal");
const propertyMessage = document.getElementById("property-modal-message");
const propertyClose = document.getElementById("property-modal-close");

propertyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = propertyForm.name.value;

  propertyMessage.textContent =
    "Thank you, " +
    name +
    "! Your request has been sent. We will contact you shortly.";

  propertyModal.classList.add("active");

  propertyForm.reset();
});

propertyClose.addEventListener("click", function () {
  propertyModal.classList.remove("active");
});

propertyModal.addEventListener("click", function (e) {
  if (e.target === propertyModal) {
    propertyModal.classList.remove("active");
  }
});
