//COMMENT: §§§ SECTION 1: STATIC PROTOTYPE CONTACT EXPERIENCE §§§
//COMMENT: [THE VALIDATED DEMONSTRATION SHOWS THE APPROVED CONFIRMATION STATE; NO INQUIRY IS TRANSMITTED]
const contact_form = document.querySelector("[data-contact-form]");
const contact_intro = document.querySelector(".contact-intro");
const contact_error = document.querySelector("[data-contact-error]");
const contact_confirmation = document.querySelector("[data-contact-confirmation]");

contact_form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contact_form.checkValidity()) {
        contact_error.textContent = "Please complete the required fields before sending your inquiry.";
        contact_form.reportValidity();
        return;
    }
    contact_error.textContent = "";
    contact_form.hidden = true;
    if (contact_intro) contact_intro.hidden = true;
    document.body.classList.add("contact-page--confirmed");
    contact_confirmation.hidden = false;
    window.scrollTo(0, 0);
    contact_confirmation.focus();
});
