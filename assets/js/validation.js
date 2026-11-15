/**
 * LuxeNest - Form Validation Engine
 */

const FormValidator = {
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fulfill all required fields with your contact details.', 'warning');
      return false;
    }

    if (!this.validateEmail(email)) {
      showToast('Please provide a valid email address.', 'warning');
      return false;
    }

    showToast('✨ Thank you, your concierge inquiry has been securely sent. A personal gift advisor will reply within 4 hours.', 'success');
    form.reset();
    return true;
  },

  handleCorporateForm(e) {
    e.preventDefault();
    const form = e.target;
    const company = form.querySelector('[name="company"]')?.value.trim();
    const contactName = form.querySelector('[name="contactName"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const quantity = form.querySelector('[name="quantity"]')?.value;

    if (!company || !contactName || !email) {
      showToast('Please provide company name, contact person, and corporate email.', 'warning');
      return false;
    }

    if (!this.validateEmail(email)) {
      showToast('Please enter a valid business email address.', 'warning');
      return false;
    }

    showToast(`✨ Corporate quotation request received for ${quantity || 50} bespoke hampers! Our enterprise team will send a tailored catalog.`, 'success');
    form.reset();
    return true;
  },

  handleNewsletter(e) {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput?.value.trim();

    if (!email || !this.validateEmail(email)) {
      showToast('Please enter a valid email address to join the LuxeNest Society.', 'warning');
      return false;
    }

    showToast('✨ Welcome to the LuxeNest Society. Use code LUXE10 for 10% off your inaugural order.', 'success');
    form.reset();
    return true;
  },

  handleAuthForm(e, type = 'login') {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('[name="email"]')?.value.trim();
    const password = form.querySelector('[name="password"]')?.value.trim();

    if (!email || !password) {
      showToast('Please provide your credentials.', 'warning');
      return false;
    }

    if (type === 'login') {
      showToast('✨ Welcome back! Signed in to your LuxeNest boutique account.', 'success');
      setTimeout(() => {
        window.location.href = getBasePath() + 'index.html';
      }, 1200);
    } else if (type === 'register') {
      showToast('✨ Membership registered! Welcome to LuxeNest Boutique.', 'success');
      setTimeout(() => {
        window.location.href = getBasePath() + 'index.html';
      }, 1200);
    }
    return true;
  },

  handleForgotPassword(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('[name="email"]')?.value.trim();

    if (!email || !this.validateEmail(email)) {
      showToast('Please enter a valid email address.', 'warning');
      return false;
    }

    showToast('✨ Password reset link dispatched to your inbox.', 'success');
    form.reset();
    return true;
  }
};
