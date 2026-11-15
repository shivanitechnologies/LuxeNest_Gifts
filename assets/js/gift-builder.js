/**
 * LuxeNest - Gift Box Customization Journey Engine
 */

const GiftBuilder = {
  // Current Configuration State
  state: {
    currentStep: 1,
    boxTier: 'premium',
    boxPrice: 1999,
    boxTierName: 'Premium Luxury Box',
    maxItems: 6,
    boxColor: 'navy',
    ribbonColor: 'gold',
    items: [],
    recipientName: '',
    monogram: '',
    cardMessage: '',
    uploadedPhoto: null,
    targetBudget: 6000
  },

  init() {
    this.bindEvents();
    this.renderStep(1);
    this.loadCatalogItems();
    this.updateSummary();
    GiftPreview.renderBox(this.state);
  },

  bindEvents() {
    // Photo upload listener
    const photoInput = document.getElementById('builder-photo-upload');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.state.uploadedPhoto = evt.target.result;
            GiftPreview.renderBox(this.state);
            showToast('Photograph loaded into luxury frame!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Recipient Name listener
    const nameInput = document.getElementById('builder-recipient-name');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.state.recipientName = e.target.value;
        GiftPreview.renderBox(this.state);
      });
    }

    // Monogram listener
    const monoInput = document.getElementById('builder-monogram');
    if (monoInput) {
      monoInput.addEventListener('input', (e) => {
        this.state.monogram = e.target.value.toUpperCase();
        GiftPreview.renderBox(this.state);
      });
    }

    // Card message listener
    const msgInput = document.getElementById('builder-card-message');
    if (msgInput) {
      msgInput.addEventListener('input', (e) => {
        this.state.cardMessage = e.target.value;
        GiftPreview.renderBox(this.state);
      });
    }

    // Target budget slider
    const budgetSlider = document.getElementById('builder-budget-slider');
    if (budgetSlider) {
      budgetSlider.addEventListener('input', (e) => {
        this.state.targetBudget = Number(e.target.value);
        document.getElementById('budget-goal-label').textContent = formatPrice(this.state.targetBudget);
        this.updateSummary();
      });
    }
  },

  setStep(stepNum) {
    this.state.currentStep = stepNum;
    for (let i = 1; i <= 4; i++) {
      const stepTab = document.getElementById(`step-tab-${i}`);
      const stepContent = document.getElementById(`step-content-${i}`);
      if (stepTab && stepContent) {
        if (i === stepNum) {
          stepTab.classList.add('bg-[#101C32]', 'text-white', 'border-[#C6A56B]');
          stepTab.classList.remove('bg-transparent', 'text-gray-500');
          stepContent.classList.remove('hidden');
        } else {
          stepTab.classList.remove('bg-[#101C32]', 'text-white', 'border-[#C6A56B]');
          stepTab.classList.add('bg-transparent', 'text-gray-500');
          stepContent.classList.add('hidden');
        }
      }
    }
  },

  renderStep(stepNum) {
    this.setStep(stepNum);
  },

  selectBoxTier(tier, price, name, maxItems) {
    this.state.boxTier = tier;
    this.state.boxPrice = price;
    this.state.boxTierName = name;
    this.state.maxItems = maxItems;

    // Check if items exceed new maxItems
    if (this.state.items.length > maxItems) {
      this.state.items = this.state.items.slice(0, maxItems);
      showToast(`Adjusted items to ${maxItems} to fit ${name}`, 'warning');
    }

    // Highlight selected card
    document.querySelectorAll('.box-tier-card').forEach(c => {
      c.classList.remove('border-[#C6A56B]', 'ring-2', 'ring-[#C6A56B]');
    });
    const selected = document.getElementById(`box-tier-${tier}`);
    if (selected) {
      selected.classList.add('border-[#C6A56B]', 'ring-2', 'ring-[#C6A56B]');
    }

    this.updateSummary();
    GiftPreview.renderBox(this.state);
  },

  setBoxColor(color) {
    this.state.boxColor = color;
    document.querySelectorAll('.box-color-btn').forEach(btn => btn.classList.remove('ring-4', 'ring-[#C6A56B]'));
    document.getElementById(`box-color-${color}`)?.classList.add('ring-4', 'ring-[#C6A56B]');
    GiftPreview.renderBox(this.state);
  },

  setRibbonColor(color) {
    this.state.ribbonColor = color;
    document.querySelectorAll('.ribbon-color-btn').forEach(btn => btn.classList.remove('ring-4', 'ring-[#C6A56B]'));
    document.getElementById(`ribbon-color-${color}`)?.classList.add('ring-4', 'ring-[#C6A56B]');
    GiftPreview.renderBox(this.state);
  },

  async loadCatalogItems(category = 'all') {
    const container = document.getElementById('builder-catalog-grid');
    if (!container) return;

    const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    container.innerHTML = filtered.map(p => {
      const isSelected = this.state.items.some(i => i.id === p.id);
      return `
        <div class="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#161F30] border ${isSelected ? 'border-[#C6A56B] bg-[#C6A56B]/5' : 'border-[#E2D9C8]/80 dark:border-[#2A374F]'} shadow-sm transition-all hover:border-[#C6A56B]">
          <img src="${p.image}" alt="${p.name}" class="w-16 h-16 rounded-lg object-cover shrink-0">
          <div class="flex-1 min-w-0">
            <span class="text-[9px] uppercase font-bold text-[#C6A56B] tracking-wider">${p.categoryName}</span>
            <h5 class="font-serif text-xs font-semibold text-[#101C32] dark:text-[#FAF8F3] truncate">${p.name}</h5>
            <span class="text-xs font-bold text-[#101C32] dark:text-[#FAF8F3]">${formatPrice(p.price)}</span>
          </div>
          <div>
            ${isSelected ? `
              <button onclick="GiftBuilder.removeItem('${p.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 text-xs font-semibold hover:bg-red-200">
                Remove
              </button>
            ` : `
              <button onclick="GiftBuilder.addItem('${p.id}')" class="px-3 py-1.5 rounded-lg bg-[#101C32] dark:bg-[#C6A56B] text-[#FAF8F3] dark:text-[#101C32] text-xs font-semibold hover:bg-[#C6A56B] transition-colors">
                + Add
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  },

  filterCatalog(cat, btn) {
    document.querySelectorAll('.catalog-filter-btn').forEach(b => {
      b.classList.remove('bg-[#101C32]', 'text-[#FAF8F3]', 'dark:bg-[#C6A56B]', 'dark:text-[#101C32]');
      b.classList.add('bg-gray-100', 'dark:bg-[#161F30]', 'text-gray-600', 'dark:text-gray-300');
    });
    btn.classList.add('bg-[#101C32]', 'text-[#FAF8F3]', 'dark:bg-[#C6A56B]', 'dark:text-[#101C32]');
    btn.classList.remove('bg-gray-100', 'dark:bg-[#161F30]', 'text-gray-600', 'dark:text-gray-300');
    this.loadCatalogItems(cat);
  },

  addItem(productId) {
    if (this.state.items.length >= this.state.maxItems) {
      showToast(`Box capacity reached (${this.state.maxItems} items maximum for this tier).`, 'warning');
      return;
    }
    const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    this.state.items.push(p);
    this.updateSummary();
    this.loadCatalogItems();
    GiftPreview.renderBox(this.state);
    showToast(`Added ${p.name} inside your gift box`, 'success');
  },

  removeItem(productId) {
    this.state.items = this.state.items.filter(item => item.id !== productId);
    this.updateSummary();
    this.loadCatalogItems();
    GiftPreview.renderBox(this.state);
    showToast('Item removed from box', 'info');
  },

  getTotalPrice() {
    const itemsTotal = this.state.items.reduce((sum, item) => sum + item.price, 0);
    return this.state.boxPrice + itemsTotal;
  },

  updateSummary() {
    const total = this.getTotalPrice();
    const count = this.state.items.length;
    const max = this.state.maxItems;

    // Price tags
    document.getElementById('summary-total-price')?.replaceChildren(document.createTextNode(formatPrice(total)));
    document.getElementById('summary-box-price')?.replaceChildren(document.createTextNode(formatPrice(this.state.boxPrice)));
    document.getElementById('summary-box-name')?.replaceChildren(document.createTextNode(this.state.boxTierName));
    document.getElementById('summary-items-count')?.replaceChildren(document.createTextNode(`${count} / ${max}`));

    // Budget Tracker Progress
    const budgetPct = Math.min(100, Math.round((total / this.state.targetBudget) * 100));
    const budgetBar = document.getElementById('budget-progress-bar');
    const budgetText = document.getElementById('budget-progress-text');
    if (budgetBar) budgetBar.style.width = `${budgetPct}%`;
    if (budgetText) {
      if (total <= this.state.targetBudget) {
        budgetText.innerHTML = `Running Total: <span class="font-bold text-[#101C32] dark:text-[#C6A56B]">${formatPrice(total)}</span> of ${formatPrice(this.state.targetBudget)} budget (${this.state.targetBudget - total >= 0 ? formatPrice(this.state.targetBudget - total) + ' remaining' : ''})`;
      } else {
        budgetText.innerHTML = `Running Total: <span class="font-bold text-amber-600">${formatPrice(total)}</span> (${formatPrice(total - this.state.targetBudget)} over target)`;
      }
    }

    // Selected items list in right column
    const selectedListEl = document.getElementById('summary-selected-items-list');
    if (selectedListEl) {
      if (this.state.items.length === 0) {
        selectedListEl.innerHTML = `<p class="text-xs text-gray-400 py-3 text-center">No products selected yet.</p>`;
      } else {
        selectedListEl.innerHTML = this.state.items.map(i => `
          <div class="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-800">
            <span class="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">${i.name}</span>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-[#101C32] dark:text-gray-200">${formatPrice(i.price)}</span>
              <button onclick="GiftBuilder.removeItem('${i.id}')" class="text-gray-400 hover:text-red-500">✕</button>
            </div>
          </div>
        `).join('');
      }
    }
  },

  // "Surprise Me" Auto-curator
  surpriseMe() {
    const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const count = Math.min(3, shuffled.length);

    this.state.boxColor = ['navy', 'noir', 'ivory', 'burgundy'][Math.floor(Math.random() * 4)];
    this.state.ribbonColor = ['gold', 'navy', 'emerald', 'crimson'][Math.floor(Math.random() * 4)];
    this.state.items = shuffled.slice(0, count);
    this.state.cardMessage = 'May your special day be bathed in luxury, love and delightful memories!';

    this.setBoxColor(this.state.boxColor);
    this.setRibbonColor(this.state.ribbonColor);
    this.updateSummary();
    this.loadCatalogItems();
    GiftPreview.renderBox(this.state);

    if (window.confetti) {
      window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    showToast('✨ Curated a surprise luxury combination for you!', 'success');
  },

  // Save current design to localStorage
  saveDesign() {
    const saved = {
      id: 'BOX-' + Date.now(),
      date: new Date().toLocaleDateString(),
      boxTierName: this.state.boxTierName,
      boxColor: this.state.boxColor,
      ribbonColor: this.state.ribbonColor,
      items: this.state.items,
      totalPrice: this.getTotalPrice(),
      recipientName: this.state.recipientName,
      monogram: this.state.monogram,
      cardMessage: this.state.cardMessage
    };

    let allSaved = [];
    try {
      const existing = localStorage.getItem('luxenest_saved_boxes');
      allSaved = existing ? JSON.parse(existing) : [];
    } catch (e) {
      allSaved = [];
    }
    allSaved.unshift(saved);
    localStorage.setItem('luxenest_saved_boxes', JSON.stringify(allSaved));
    showToast('Design successfully saved to "My Saved Creations"!', 'success');
  },

  // Add the entire completed box into cart
  addBoxToCart() {
    if (this.state.items.length === 0) {
      showToast('Please add at least 1 luxury item to your gift box.', 'warning');
      this.setStep(2);
      return;
    }

    const total = this.getTotalPrice();
    const customProduct = {
      id: 'custom-box-' + Date.now(),
      name: `Bespoke ${this.state.boxTierName} (${this.state.items.length} Gifts)`,
      price: total,
      categoryName: 'Custom Gift Box',
      image: this.state.items[0]?.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
      isCustomBox: true,
      boxDetails: {
        boxStyle: GiftPreview.boxColors[this.state.boxColor]?.name,
        ribbon: GiftPreview.ribbonColors[this.state.ribbonColor]?.name,
        itemsCount: this.state.items.length,
        recipient: this.state.recipientName || 'Gift Recipient',
        monogram: this.state.monogram || 'None'
      }
    };

    addToCart(customProduct, 1, this.state.recipientName ? `For: ${this.state.recipientName}` : '');
    showToast('✨ Custom Gift Box added to your bag!', 'success');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('preview-box-container') || document.getElementById('preview-box-wrapper')) {
    GiftBuilder.init();
  }
});
