/**
 * LuxeNest - Live Personalization Studio Engine
 */

const PersonalizationStudio = {
  activeProduct: 'wallet',
  text: 'ARTHUR VANCE',
  fontFamily: 'serif',
  uploadedPhoto: null,

  init() {
    this.bindEvents();
    this.updatePreview();
  },

  bindEvents() {
    const input = document.getElementById('pers-text-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.text = e.target.value;
        this.updatePreview();
      });
    }

    const photoInput = document.getElementById('pers-photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.uploadedPhoto = evt.target.result;
            this.updatePreview();
            showToast('Photograph loaded onto custom frame!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }
  },

  selectProduct(prodType) {
    this.activeProduct = prodType;
    document.querySelectorAll('.pers-prod-tab').forEach(t => {
      t.classList.remove('bg-[#101C32]', 'text-[#FAF8F3]', 'dark:bg-[#C6A56B]', 'dark:text-[#101C32]');
      t.classList.add('bg-white', 'text-gray-700', 'dark:bg-[#161F30]', 'dark:text-gray-300');
    });
    document.getElementById(`pers-tab-${prodType}`)?.classList.add('bg-[#101C32]', 'text-[#FAF8F3]', 'dark:bg-[#C6A56B]', 'dark:text-[#101C32]');
    document.getElementById(`pers-tab-${prodType}`)?.classList.remove('bg-white', 'text-gray-700', 'dark:bg-[#161F30]', 'dark:text-gray-300');

    // Switch preview container
    ['wallet', 'mug', 'pen', 'frame'].forEach(type => {
      const el = document.getElementById(`preview-item-${type}`);
      if (el) {
        if (type === prodType) el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });

    this.updatePreview();
  },

  setFont(font) {
    this.fontFamily = font;
    document.querySelectorAll('.pers-font-btn').forEach(b => b.classList.remove('border-[#C6A56B]', 'bg-[#C6A56B]/10'));
    document.getElementById(`pers-font-${font}`)?.classList.add('border-[#C6A56B]', 'bg-[#C6A56B]/10');
    this.updatePreview();
  },

  updatePreview() {
    const displayText = this.text.trim() || 'YOUR NAME / INITIALS';

    // 1. Wallet preview text
    const walletText = document.getElementById('preview-wallet-text');
    if (walletText) {
      walletText.textContent = displayText;
      walletText.style.fontFamily = this.getFontRule(this.fontFamily);
    }

    // 2. Mug preview text
    const mugText = document.getElementById('preview-mug-text');
    if (mugText) {
      mugText.textContent = displayText;
      mugText.style.fontFamily = this.getFontRule(this.fontFamily);
    }

    // 3. Pen preview text
    const penText = document.getElementById('preview-pen-text');
    if (penText) {
      penText.textContent = displayText;
      penText.style.fontFamily = this.getFontRule(this.fontFamily);
    }

    // 4. Frame preview
    const frameText = document.getElementById('preview-frame-text');
    if (frameText) {
      frameText.textContent = displayText;
    }
    const frameImg = document.getElementById('preview-frame-img');
    if (frameImg && this.uploadedPhoto) {
      frameImg.src = this.uploadedPhoto;
    }
  },

  getFontRule(font) {
    if (font === 'serif') return "'Cormorant Garamond', serif";
    if (font === 'script') return "'Alex Brush', cursive";
    if (font === 'playfair') return "'Playfair Display', serif";
    return "'Inter', sans-serif";
  },

  addPersonalizedToCart() {
    const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
    const mapping = {
      wallet: products.find(p => p.id === 'lx-06') || products[0],
      mug: products.find(p => p.id === 'lx-09') || products[0],
      pen: products.find(p => p.id === 'lx-02') || products[0],
      frame: products.find(p => p.id === 'lx-03') || products[0]
    };

    const target = mapping[this.activeProduct];
    addToCart(target, 1, `Custom Engraving: "${this.text || 'Bespoke Monogram'}" (${this.fontFamily.toUpperCase()})`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pers-text-input')) {
    PersonalizationStudio.init();
  }
});
