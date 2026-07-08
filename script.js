const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

function toggleMobileMenu() {
    const isOpen = !mobileNav.hidden;

    mobileNav.hidden = isOpen;
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.textContent = isOpen ? "Menu" : "Close";
}

function setupMobileMenu() {
    menuToggle.addEventListener("click", toggleMobileMenu);

    mobileNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mobileNav.hidden = true;
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "Menu";
        });
    });
}

function setupSmoothScroll() {
    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function setupContactFormValidation() {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        successMessage.textContent = "";

        if (isNameValid && isEmailValid && isMessageValid) {
            successMessage.textContent = "Message sent successfully. Thank you!";
            contactForm.reset();
        }
    });

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);
}

function validateName() {
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        return false;
    }

    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

function validateMessage() {
    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please write your message.";
        return false;
    }

    messageError.textContent = "";
    return true;
}

setupMobileMenu();
setupSmoothScroll();
setupContactFormValidation();
