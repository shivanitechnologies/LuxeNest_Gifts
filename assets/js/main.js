/**
 * LuxeNest - Main UI Initializer, Navigation & Global Modals
 */

// Disable confetti popup effects globally
window.confetti = function () { };

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Initialize AOS animations
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60
    });
  }

  // 3. Load product catalog in background
  if (typeof loadProducts === 'function') {
    await loadProducts();
  }

  // 4. Mobile Menu Toggles
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileCloseBtn = document.getElementById('mobile-nav-close');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('-translate-x-full');
      mobileDrawer.classList.add('translate-x-0');
      mobileBackdrop?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobileNav = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('-translate-x-full');
      mobileDrawer.classList.remove('translate-x-0');
      mobileBackdrop?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  mobileCloseBtn?.addEventListener('click', closeMobileNav);
  mobileBackdrop?.addEventListener('click', closeMobileNav);

  // 5. Setup Surprise Gift Modal trigger
  setupSurpriseGiftModal();

  // 6. Highlight active navbar link
  highlightActiveNav();

  // 7. Sticky Header Shadow on Scroll
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 8. Initialize Luxury Hero 3D Perspective Tilt & Parallax
  initHeroParallax();

  // 9. Initialize Hero Live Monogram Stamper
  initHeroMonogram();
});

// Mobile Submenu Toggle Handler
window.toggleMobileSubmenu = function (subId, iconId) {
  const sub = document.getElementById(subId);
  const icon = document.getElementById(iconId);
  if (sub) {
    sub.classList.toggle('hidden');
  }
  if (icon) {
    icon.classList.toggle('rotate-180');
  }
};

// Automatic Active Navigation Link Highlighter
function highlightActiveNav() {
  const path = window.location.pathname.toLowerCase();

  // Clean matching for direct links
  document.querySelectorAll('nav a.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const hrefLower = href.toLowerCase();

    const isHome1 = (path === '/' || path.endsWith('/index.html') || path === '') && (hrefLower === '/' || hrefLower.endsWith('index.html') || hrefLower === '#');
    const isHome2 = path.includes('home-premium') && hrefLower.includes('home-premium');
    const isProducts = (path.includes('products') || path.includes('occasions')) && hrefLower.includes('products');
    const isPersonalized = path.includes('personalized') && hrefLower.includes('personalized');
    const isWrapping = path.includes('wrapping') && hrefLower.includes('wrapping');
    const isContact = path.includes('contact') && hrefLower.includes('contact');

    if (isHome1 || isHome2 || isProducts || isPersonalized || isWrapping || isContact) {
      a.classList.add('active');
    }
  });

  // Highlight parent dropdown button/link
  if (path === '/' || path.endsWith('/index.html') || path.includes('home-premium') || path === '') {
    const homeBtn = document.querySelector('nav .group button.nav-link, nav .group a.nav-link[data-nav="home"]');
    if (homeBtn) homeBtn.classList.add('active');
  } else if (path.includes('products') || path.includes('occasions')) {
    const occasionLink = document.querySelector('nav a.nav-link[data-nav="occasion"], nav .group a.nav-link[href*="products"]');
    if (occasionLink) occasionLink.classList.add('active');
  }
}


// Surprise Gift Generator (Prompt Feature 3: "Recommend a random gift based on occasion and budget")
function setupSurpriseGiftModal() {
  window.openSurpriseModal = function () {
    let modal = document.getElementById('luxenest-surprise-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'luxenest-surprise-modal';
      modal.className = 'fixed inset-0 z-[9992] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="relative w-full max-w-lg bg-[#FAF8F3] dark:bg-[#10151F] text-[#282828] dark:text-gray-100 rounded-3xl border border-[#C6A56B] shadow-2xl p-6 md:p-8" onclick="event.stopPropagation()">
        <button onclick="document.getElementById('luxenest-surprise-modal').remove()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="text-center mb-6">
          <div class="w-14 h-14 rounded-full bg-gold-gradient text-[#101C32] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <i data-lucide="sparkles" class="w-7 h-7"></i>
          </div>
          <h3 class="font-serif text-2xl font-bold text-[#101C32] dark:text-[#FAF8F3]">Surprise Gift Concierge</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Let our algorithmic boutique curator find the quintessential present.</p>
        </div>

        <div class="space-y-4 text-xs mb-6">
          <div>
            <label class="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Who is this gift celebrating?</label>
            <select id="surprise-occasion" class="w-full px-3 py-2.5 rounded-xl border border-[#E2D9C8] dark:border-gray-700 bg-white dark:bg-[#161F30] text-[#101C32] dark:text-white focus:outline-none focus:border-[#C6A56B]">
              <option value="birthday">Milestone Birthday</option>
              <option value="anniversary">Anniversary & Love</option>
              <option value="wedding">Wedding & Couple</option>
              <option value="corporate">Executive Corporate</option>
              <option value="festive">Festive Celebrations</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Target Budget Preference</label>
            <div class="flex items-center justify-between text-xs text-[#C6A56B] font-bold mb-1">
              <span>₹1,000</span>
              <span id="surprise-budget-disp">₹3,500</span>
              <span>₹6,000</span>
            </div>
            <input type="range" id="surprise-budget-slider" min="1000" max="6000" step="500" value="3500" class="w-full accent-[#C6A56B]" oninput="document.getElementById('surprise-budget-disp').innerText='₹'+Number(this.value).toLocaleString('en-IN')">
          </div>
        </div>

        <div id="surprise-result-box" class="hidden p-4 rounded-2xl bg-white dark:bg-[#161F30] border border-[#C6A56B] mb-6">
          <!-- Result rendered here -->
        </div>

        <button onclick="generateSurpriseGift()" class="w-full py-3.5 rounded-xl bg-gold-gradient text-[#101C32] font-semibold text-xs tracking-wider uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <i data-lucide="wand-2" class="w-4 h-4"></i>
          <span>Curate My Perfect Surprise</span>
        </button>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons({ root: modal });
    }
  };
}

function generateSurpriseGift() {
  const occasion = document.getElementById('surprise-occasion')?.value || 'birthday';
  const budget = Number(document.getElementById('surprise-budget-slider')?.value || 3500);
  const resultBox = document.getElementById('surprise-result-box');

  const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
  const filtered = products.filter(p => p.price <= budget);
  const selected = filtered.length > 0
    ? filtered[Math.floor(Math.random() * filtered.length)]
    : products[0];

  if (resultBox) {
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <div class="flex gap-4 items-center">
        <img src="${selected.image}" alt="${selected.name}" class="w-20 h-20 rounded-xl object-cover border border-[#C6A56B]/40">
        <div class="flex-1">
          <span class="text-[10px] font-bold text-[#C6A56B] uppercase tracking-wider">${selected.categoryName}</span>
          <h5 class="font-serif text-base font-bold text-[#101C32] dark:text-[#FAF8F3] line-clamp-1">${selected.name}</h5>
          <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">${selected.shortDesc}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="font-bold text-sm text-[#101C32] dark:text-[#C6A56B]">${formatPrice(selected.price)}</span>
            <a href="shop/product-details.html?id=${selected.id}" onclick="document.getElementById('luxenest-surprise-modal').remove()" class="px-3 py-1 rounded-lg bg-[#101C32] dark:bg-[#C6A56B] text-white dark:text-[#101C32] text-xs font-semibold hover:bg-[#C6A56B]">
              Product Details
            </a>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) {
      lucide.createIcons({ root: resultBox });
    }
  }
}

/**
 * Luxury Hero Section Interactive 3D Perspective Tilt & Cursor Parallax
 */
function initHeroParallax() {
  const heroSection = document.getElementById('hero-section');
  const tiltCard = document.getElementById('heroTiltCard');
  if (!heroSection || !tiltCard) return;

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  let ticking = false;
  let targetRx = 0;
  let targetRy = 0;
  let currentRx = 0;
  let currentRy = 0;
  let isHovered = false;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative -1 to +1
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;

    targetRy = nx * 7;  // rotateY: gentle tilt
    targetRx = -ny * 6; // rotateX: natural depth
    isHovered = true;

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateTilt);
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    targetRx = 0;
    targetRy = 0;
    isHovered = false;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateTilt);
    }
  });

  function updateTilt() {
    currentRx += (targetRx - currentRx) * 0.12;
    currentRy += (targetRy - currentRy) * 0.12;

    if (tiltCard) {
      const scaleVal = isHovered ? '1.02' : '1';
      tiltCard.style.transform = `perspective(1200px) rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg) scale3d(${scaleVal}, ${scaleVal}, 1)`;
    }

    if (Math.abs(targetRx - currentRx) > 0.05 || Math.abs(targetRy - currentRy) > 0.05) {
      requestAnimationFrame(updateTilt);
    } else {
      if (!isHovered) {
        tiltCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
      ticking = false;
    }
  }
}

/**
 * Interactive Hero Suite Switcher
 */
const HERO_SUITES = {
  midnight: {
    title: 'The Le Prestige Midnight Hamper',
    subtitle: 'Rigid Navy Linen • 24k Gold Foil',
    desc: 'Artisanal Belgian Truffles • Hand-poured Soy Oud Candle • Ceramic Initial Mug',
    price: '₹3,999',
    badge: 'Bestseller No. 1',
    link: 'shop/products.html?product=lx-01'
  },
  rose: {
    title: 'Rosé Atelier Keepsake Suite',
    subtitle: 'Blush Satin Ribbon • Velvet Gift Box',
    desc: 'Hand-tied Satin Ribbon • Gourmet Raspberry Truffles • Rose Quartz Keepsake',
    price: '₹2,999',
    badge: 'Prestige & Romance',
    link: 'shop/products.html?category=anniversary'
  },
  sovereign: {
    title: 'Sovereign Executive Folio & Pen',
    subtitle: 'Full-Grain Tuscan Leather • Solid Brass',
    desc: 'Italian Calfskin Notebook Folio • Weighted Engraved Brass Fountain Pen',
    price: '₹2,499',
    badge: 'Executive VIP Choice',
    link: 'shop/products.html?product=lx-02'
  }
};

window.switchHeroSuite = function (key) {
  const suite = HERO_SUITES[key];
  if (!suite) return;

  // Toggle View Layers
  ['midnight', 'rose', 'sovereign'].forEach(k => {
    const imgEl = document.getElementById(`suite-img-${k}`);
    const tabEl = document.getElementById(`tab-${k}`);
    if (imgEl) {
      if (k === key) {
        imgEl.classList.remove('opacity-0', 'pointer-events-none');
        imgEl.classList.add('opacity-100');
      } else {
        imgEl.classList.remove('opacity-100');
        imgEl.classList.add('opacity-0', 'pointer-events-none');
      }
    }
    if (tabEl) {
      if (k === key) {
        tabEl.className = 'suite-tab active px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 bg-gold-gradient text-[#101C32] shadow-md';
      } else {
        tabEl.className = 'suite-tab px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10';
      }
    }
  });

  // Update Text Details smoothly
  const titleEl = document.getElementById('suite-title');
  const subEl = document.getElementById('suite-subtitle');
  const descEl = document.getElementById('suite-desc');
  const priceEl = document.getElementById('suite-price');
  const badgeEl = document.getElementById('suite-badge-tag');
  const ctaEl = document.getElementById('suite-cta');

  if (titleEl) titleEl.textContent = suite.title;
  if (subEl) subEl.textContent = suite.subtitle;
  if (descEl) descEl.textContent = suite.desc;
  if (priceEl) priceEl.textContent = suite.price;
  if (badgeEl) badgeEl.textContent = suite.badge;
  if (ctaEl) ctaEl.setAttribute('href', suite.link);
};

/**
 * Live Monogram Input Listener
 */
function initHeroMonogram() {
  const input = document.getElementById('hero-monogram-input');
  const preview = document.getElementById('hero-monogram-preview');
  if (input && preview) {
    input.addEventListener('input', (e) => {
      const val = e.target.value.trim().toUpperCase();
      preview.textContent = val || '✦';
    });
  }
}
