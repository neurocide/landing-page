// Email subscription form handler
document.addEventListener('DOMContentLoaded', function() {
    const subscriptionForm = document.getElementById('subscriptionForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');
    const subscribeBtn = subscriptionForm.querySelector('.subscribe-btn');

    subscriptionForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const userEmail = emailInput.value.trim();

        // Validate email format
        if (!isValidEmail(userEmail)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button and show loading state
        subscribeBtn.disabled = true;
        subscribeBtn.textContent = 'Sending...';

        try {
            // Send email using FormSubmit.co
            const formData = new FormData();
            formData.append('email', userEmail);
            formData.append('subject', 'subscription');

            const response = await fetch('https://formsubmit.co/chedarrgh@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showMessage('✅ Thank you! Your subscription confirmation has been sent to chedarrgh@gmail.com', 'success');
                emailInput.value = '';
                emailInput.focus();
            } else {
                showMessage('❌ Something went wrong. Please try again later.', 'error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showMessage('❌ Failed to send subscription. Please try again.', 'error');
        } finally {
            // Re-enable button
            subscribeBtn.disabled = false;
            subscribeBtn.textContent = 'Subscribe Now';
        }
    });

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Display form message
     * @param {string} message - Message to display
     * @param {string} type - Message type ('success' or 'error')
     */
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
});

// Optional: Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Optional: Log page load
console.log('Landing page loaded successfully!');