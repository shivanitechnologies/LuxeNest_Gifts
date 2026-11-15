/**
 * LuxeNest - Theme, RTL, Toasts & Currency Engine
 */

// Initialize Theme & RTL on Load
(function initTheme() {
  const savedTheme = localStorage.getItem('luxenest_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const savedDir = localStorage.getItem('luxenest_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
})();

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('luxenest_theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
}

function toggleRTL() {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', newDir);
  localStorage.setItem('luxenest_dir', newDir);
  updateRTLButtons(newDir);
}

function updateRTLButtons(dir) {
  const currentDir = dir || document.documentElement.getAttribute('dir') || 'ltr';
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    const svg = btn.querySelector('svg');
    if (svg || btn.querySelector('i')) {
      const textSpan = btn.querySelector('.rtl-text');
      if (textSpan) {
        textSpan.innerText = currentDir.toUpperCase();
      }
      btn.setAttribute('title', `Current layout: ${currentDir.toUpperCase()} (Click to toggle)`);
      if (svg) {
        if (currentDir === 'rtl') {
          svg.classList.add('rotate-180');
        } else {
          svg.classList.remove('rotate-180');
        }
      }
    } else {
      btn.innerText = currentDir.toUpperCase();
    }
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    const sunIcon = btn.querySelector('.sun-icon');
    const moonIcon = btn.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
    const emojiSpan = btn.querySelector('span');
    if (emojiSpan && (emojiSpan.innerText === '🌙' || emojiSpan.innerText === '☀️')) {
      emojiSpan.innerText = isDark ? '☀️' : '🌙';
    }
  });
}

// Toast Notifications System (Silenced - no floating toast popups)
function showToast(message, type = 'success') {
  // Silent execution per user preference
  const existingContainer = document.getElementById('luxenest-toast-container');
  if (existingContainer) {
    existingContainer.remove();
  }
}

// Format Price in Indian Rupee format
function formatPrice(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcons();
  updateRTLButtons();
});
