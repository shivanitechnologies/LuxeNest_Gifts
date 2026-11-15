/**
 * LuxeNest - Gift Box Live Preview Engine (Visual Rendering & 3D Unboxing)
 */

const GiftPreview = {
  // Box visual styles
  boxColors: {
    navy: {
      name: 'Midnight Navy',
      outer: '#101C32',
      inner: '#182949',
      border: '#C6A56B',
      foil: '#C6A56B'
    },
    noir: {
      name: 'Obsidian Noir',
      outer: '#111317',
      inner: '#1E232B',
      border: '#DFCA95',
      foil: '#DFCA95'
    },
    ivory: {
      name: 'Warm Ivory',
      outer: '#FAF8F3',
      inner: '#EDE6D6',
      border: '#C6A56B',
      foil: '#101C32'
    },
    burgundy: {
      name: 'Imperial Burgundy',
      outer: '#4A1521',
      inner: '#661B2B',
      border: '#DFCA95',
      foil: '#DFCA95'
    }
  },

  // Ribbon visual styles
  ribbonColors: {
    gold: {
      name: 'Champagne Gold Satin',
      gradient: 'linear-gradient(135deg, #F3E3B6 0%, #C6A56B 50%, #9C7D40 100%)',
      bowColor: '#C6A56B'
    },
    navy: {
      name: 'Midnight Silk',
      gradient: 'linear-gradient(135deg, #273A5E 0%, #101C32 50%, #0A1220 100%)',
      bowColor: '#101C32'
    },
    emerald: {
      name: 'Emerald Velvet',
      gradient: 'linear-gradient(135deg, #2E6B4F 0%, #1B4531 50%, #0D261A 100%)',
      bowColor: '#1B4531'
    },
    crimson: {
      name: 'Ruby Satin',
      gradient: 'linear-gradient(135deg, #BA2D3A 0%, #871923 50%, #540D14 100%)',
      bowColor: '#871923'
    }
  },

  // Update center box appearance
  renderBox(state) {
    const boxContainer = document.getElementById('preview-box-container');
    const boxBase = document.getElementById('preview-box-base');
    const boxLid = document.getElementById('preview-box-lid');
    const ribbonH = document.getElementById('preview-ribbon-h');
    const ribbonV = document.getElementById('preview-ribbon-v');
    const ribbonBow = document.getElementById('preview-ribbon-bow');
    const monogramBadge = document.getElementById('preview-monogram-badge');
    const itemsGrid = document.getElementById('preview-items-inside');
    const photoPreviewEl = document.getElementById('preview-uploaded-photo');
    const cardMessageEl = document.getElementById('preview-card-message');
    const cardRecipientEl = document.getElementById('preview-card-recipient');

    if (!boxBase) return;

    const boxStyle = this.boxColors[state.boxColor] || this.boxColors.navy;
    const ribbonStyle = this.ribbonColors[state.ribbonColor] || this.ribbonColors.gold;

    // Apply colors to base and lid
    boxBase.style.backgroundColor = boxStyle.inner;
    boxBase.style.borderColor = boxStyle.border;

    if (boxLid) {
      boxLid.style.backgroundColor = boxStyle.outer;
      boxLid.style.borderColor = boxStyle.border;
    }

    // Apply ribbon styling
    if (ribbonH && ribbonV) {
      ribbonH.style.background = ribbonStyle.gradient;
      ribbonV.style.background = ribbonStyle.gradient;
    }

    // Monogram badge on lid
    if (monogramBadge) {
      if (state.monogram) {
        monogramBadge.textContent = state.monogram.toUpperCase();
        monogramBadge.classList.remove('hidden');
      } else {
        monogramBadge.classList.add('hidden');
      }
    }

    // Update inside items
    if (itemsGrid) {
      if (state.items.length === 0) {
        itemsGrid.innerHTML = `
          <div class="col-span-3 h-full flex flex-col items-center justify-center p-6 text-center text-white/50">
            <i data-lucide="package-open" class="w-10 h-10 mb-2 opacity-40"></i>
            <p class="text-xs">Your gift box is waiting for treasures.</p>
            <p class="text-[10px] text-white/40 mt-1">Select items from the catalog on the left.</p>
          </div>
        `;
      } else {
        itemsGrid.innerHTML = state.items.map((item, idx) => `
          <div class="relative group/slot bg-black/25 backdrop-blur-sm rounded-xl p-2.5 border border-[#C6A56B]/30 flex flex-col items-center justify-between text-center transition-all hover:scale-105 duration-300">
            <button onclick="GiftBuilder.removeItem('${item.id}')" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shadow hover:bg-red-700 z-10" title="Remove">
              ✕
            </button>
            <div class="w-14 h-14 rounded-lg overflow-hidden border border-[#C6A56B]/40 shadow-inner mb-1.5 bg-[#101C32]/30">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <span class="text-[11px] font-medium text-white/95 line-clamp-1">${item.name}</span>
            <span class="text-[10px] text-[#DFCA95] font-semibold mt-0.5">${formatPrice(item.price)}</span>
          </div>
        `).join('');
      }
    }

    // Custom uploaded photo in frame slot
    if (photoPreviewEl) {
      if (state.uploadedPhoto) {
        photoPreviewEl.src = state.uploadedPhoto;
        photoPreviewEl.parentElement.classList.remove('hidden');
      } else {
        photoPreviewEl.parentElement.classList.add('hidden');
      }
    }

    // Greeting card inside box
    if (cardRecipientEl) {
      cardRecipientEl.textContent = state.recipientName ? `Dearest ${state.recipientName},` : 'Dearest Recipient,';
    }
    if (cardMessageEl) {
      cardMessageEl.textContent = state.cardMessage || 'Wishing you extraordinary moments filled with joy, prosperity and unforgettable memories.';
    }

    if (window.lucide && itemsGrid) {
      lucide.createIcons({ root: itemsGrid });
    }
  },

  // Interactive Virtual Unboxing Animation (Lid cover removed per user request)
  triggerUnboxing() {
    return;
  }
};
