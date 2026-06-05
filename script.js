// Smoothly scrolls to page sections and closes the mobile menu
function setupSmoothScroll() {
    const pageLinks = document.querySelectorAll('a[href^="#"]');
    const mobileNav = document.getElementById('mobile-nav');

    pageLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            if (mobileNav && mobileNav.matches(':popover-open')) {
                mobileNav.hidePopover();
            }
        });
    });
}

// Validates the contact form and shows inline messages
function setupContactFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let formIsValid = true;

        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = '';

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            formIsValid = false;
        }

        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email.';
            formIsValid = false;
        } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            emailError.textContent = 'Please enter a valid email address.';
            formIsValid = false;
        }

        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please write your message.';
            formIsValid = false;
        }

        if (formIsValid) {
            successMessage.textContent = 'Message sent successfully. Thank you!';
            contactForm.reset();
        }
    });
}

setupSmoothScroll();
setupContactFormValidation();