/**
 * LuxeNest - Wishlist Engine & Drawer
 */

let WISHLIST = [];

function loadWishlist() {
  try {
    const saved = localStorage.getItem('luxenest_wishlist');
    WISHLIST = saved ? JSON.parse(saved) : [];
  } catch (e) {
    WISHLIST = [];
  }
  updateWishlistBadges();
  renderWishlistDrawer();
}

function saveWishlist() {
  localStorage.setItem('luxenest_wishlist', JSON.stringify(WISHLIST));
  updateWishlistBadges();
  renderWishlistDrawer();
}

function updateWishlistBadges() {
  const count = WISHLIST.length;
  document.querySelectorAll('.wishlist-badge-count').forEach(el => {
    el.textContent = count;
    if (count > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Update heart icons fill state across the page
  document.querySelectorAll('[class*="wishlist-btn-"]').forEach(btn => {
    const match = btn.className.match(/wishlist-btn-([a-zA-Z0-9-]+)/);
    if (match) {
      const pid = match[1];
      const isFavorited = WISHLIST.includes(pid);
      const icon = btn.querySelector('svg, i');
      if (icon) {
        if (isFavorited) {
          btn.classList.add('text-red-500');
          icon.style.fill = '#EF4444';
        } else {
          btn.classList.remove('text-red-500');
          icon.style.fill = 'none';
        }
      }
    }
  });
}

function toggleWishlist(productId) {
  const index = WISHLIST.indexOf(productId);
  if (index > -1) {
    WISHLIST.splice(index, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    WISHLIST.push(productId);
    showToast('Saved to your private wishlist', 'success');
  }
  saveWishlist();
}

function openWishlistDrawer() {
  // Wishlist drawer permanently removed per user request
  const drawer = document.getElementById('luxenest-wishlist-drawer');
  if (drawer) drawer.remove();
  document.getElementById('wishlist-backdrop')?.remove();
  document.body.style.overflow = '';
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('luxenest-wishlist-drawer');
  if (drawer) drawer.remove();
  document.getElementById('wishlist-backdrop')?.remove();
  document.body.style.overflow = '';
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlist-drawer-items');
  if (!container) return;

  if (WISHLIST.length === 0) {
    container.innerHTML = `
      <div class="py-16 px-4 text-center flex flex-col items-center">
        <div class="w-16 h-16 rounded-full bg-[#101C32]/5 dark:bg-[#161F30] flex items-center justify-center text-[#C6A56B] mb-4">
          <i data-lucide="heart" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif text-xl font-medium text-[#101C32] dark:text-[#FAF8F3]">Your Wishlist is Empty</h4>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-xs leading-relaxed">
          Save your favorite luxury gifts and bespoke hampers for future celebrations.
        </p>
      </div>
    `;
  } else {
    const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
    const items = WISHLIST.map(id => products.find(p => p.id === id)).filter(Boolean);

    container.innerHTML = items.map(item => `
      <div class="flex gap-4 p-4 rounded-xl bg-white dark:bg-[#161F30] border border-[#E2D9C8]/80 dark:border-[#2A374F] shadow-sm relative group">
        <div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#FAF8F3] border border-[#E2D9C8] dark:border-[#2A374F]">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <h5 class="font-serif text-base font-medium text-[#101C32] dark:text-[#FAF8F3] line-clamp-1">
                ${item.name}
              </h5>
              <button onclick="toggleWishlist('${item.id}')" class="text-red-500 hover:text-gray-400 p-1">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="text-xs font-semibold text-[#101C32] dark:text-[#C6A56B] mt-1">
              ${formatPrice(item.price)}
            </div>
          </div>

          <div class="flex gap-2 mt-3">
            <button 
              onclick="addToCart(getProductById('${item.id}'), 1); toggleWishlist('${item.id}');"
              class="flex-1 py-1.5 px-3 rounded-lg bg-[#101C32] dark:bg-[#C6A56B] text-[#FAF8F3] dark:text-[#101C32] hover:bg-[#C6A56B] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>Move to Bag</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) {
    lucide.createIcons({ root: container });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure wishlist drawer is removed from DOM if present
  document.getElementById('luxenest-wishlist-drawer')?.remove();
  document.getElementById('wishlist-backdrop')?.remove();
  loadWishlist();
});
