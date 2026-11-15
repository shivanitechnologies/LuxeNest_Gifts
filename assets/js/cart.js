/**
 * LuxeNest - Shopping Cart Engine, Drawer & Demo Checkout
 */

let CART = [];
let APPLIED_COUPON = null;

function loadCart() {
  try {
    const saved = localStorage.getItem('luxenest_cart');
    CART = saved ? JSON.parse(saved) : [];
  } catch (e) {
    CART = [];
  }
  updateCartBadges();
  renderCartDrawer();
}

function saveCart() {
  localStorage.setItem('luxenest_cart', JSON.stringify(CART));
  updateCartBadges();
  renderCartDrawer();
}

function updateCartBadges() {
  const count = CART.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.textContent = count;
    if (count > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

function addToCart(product, qty = 1, personalization = '') {
  const cartItemId = personalization ? `${product.id}-${encodeURIComponent(personalization)}` : product.id;
  const existing = CART.find(item => item.cartItemId === cartItemId);

  if (existing) {
    existing.qty += qty;
  } else {
    CART.push({
      cartItemId: cartItemId,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName || 'Luxury Gift',
      qty: qty,
      personalization: personalization || null,
      isCustomBox: product.isCustomBox || false,
      boxDetails: product.boxDetails || null
    });
  }

  saveCart();
}

function removeFromCart(cartItemId) {
  CART = CART.filter(item => item.cartItemId !== cartItemId);
  saveCart();
}

function updateCartQty(cartItemId, delta) {
  const item = CART.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(cartItemId);
  } else {
    saveCart();
  }
}

function getSubtotal() {
  return CART.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getDiscount() {
  if (!APPLIED_COUPON) return 0;
  const subtotal = getSubtotal();
  if (APPLIED_COUPON.type === 'percentage') {
    return Math.round(subtotal * (APPLIED_COUPON.value / 100));
  }
  return APPLIED_COUPON.value;
}

function getTotal() {
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 250;
  return Math.max(0, subtotal - discount + shipping);
}

function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  const summarySubtotal = document.getElementById('cart-subtotal');
  const summaryTotal = document.getElementById('cart-total');
  const shippingEl = document.getElementById('cart-shipping');
  const freePackagingProgress = document.getElementById('free-packaging-progress');
  const freePackagingText = document.getElementById('free-packaging-text');

  if (!container) return;

  const subtotal = getSubtotal();
  const freeThreshold = 4000;
  const diff = freeThreshold - subtotal;

  if (freePackagingProgress && freePackagingText) {
    if (subtotal >= freeThreshold) {
      freePackagingProgress.style.width = '100%';
      freePackagingText.innerHTML = `🎉 <span class="font-semibold text-[#C6A56B]">Congratulations!</span> You unlocked Complimentary Signature Gold-Embossed Packaging!`;
    } else {
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      freePackagingProgress.style.width = `${pct}%`;
      freePackagingText.innerHTML = `Add <span class="font-semibold text-[#101C32] dark:text-[#C6A56B]">${formatPrice(diff)}</span> more for <strong>Complimentary Luxury Velvet Gift Box</strong>`;
    }
  }

  if (CART.length === 0) {
    container.innerHTML = `
      <div class="py-16 px-4 text-center flex flex-col items-center">
        <div class="w-16 h-16 rounded-full bg-[#101C32]/5 dark:bg-[#161F30] flex items-center justify-center text-[#C6A56B] mb-4">
          <i data-lucide="gift" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif text-xl font-medium text-[#101C32] dark:text-[#FAF8F3]">Your Gift Bag is Empty</h4>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-xs leading-relaxed">
          Explore our handcrafted collections or build a personalized gift box for someone special.
        </p>
        <button onclick="closeCartDrawer(); window.location.href=getBasePath()+'shop/products.html'" class="mt-6 px-6 py-2.5 rounded-xl bg-[#101C32] dark:bg-[#C6A56B] text-[#FAF8F3] dark:text-[#101C32] hover:bg-[#C6A56B] text-xs font-semibold transition-all">
          Explore Collections
        </button>
      </div>
    `;
    if (summarySubtotal) summarySubtotal.textContent = '₹0';
    if (summaryTotal) summaryTotal.textContent = '₹0';
    if (shippingEl) shippingEl.textContent = '₹0';
  } else {
    container.innerHTML = CART.map(item => `
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
              <button onclick="removeFromCart('${item.cartItemId}')" class="text-gray-400 hover:text-red-500 transition-colors p-1">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>

            ${item.personalization ? `
              <div class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-[#101C32]/5 dark:bg-[#10151F] text-[10px] text-[#C6A56B] border border-[#C6A56B]/30">
                <i data-lucide="feather" class="w-3 h-3"></i>
                <span class="truncate max-w-[170px]">Engraved: "${item.personalization}"</span>
              </div>
            ` : ''}

            ${item.isCustomBox && item.boxDetails ? `
              <div class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                ${item.boxDetails.boxStyle} • ${item.boxDetails.ribbon} • ${item.boxDetails.itemsCount} Items
              </div>
            ` : ''}
          </div>

          <div class="flex justify-between items-center mt-3">
            <div class="flex items-center border border-[#E2D9C8] dark:border-gray-700 rounded-lg overflow-hidden bg-[#FAF8F3] dark:bg-[#10151F]">
              <button onclick="updateCartQty('${item.cartItemId}', -1)" class="w-6 h-6 flex items-center justify-center text-xs text-gray-500 hover:bg-[#C6A56B] hover:text-white transition-colors">-</button>
              <span class="w-7 text-center text-xs font-semibold text-[#101C32] dark:text-white">${item.qty}</span>
              <button onclick="updateCartQty('${item.cartItemId}', 1)" class="w-6 h-6 flex items-center justify-center text-xs text-gray-500 hover:bg-[#C6A56B] hover:text-white transition-colors">+</button>
            </div>

            <div class="font-semibold text-sm text-[#101C32] dark:text-[#C6A56B]">
              ${formatPrice(item.price * item.qty)}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (summarySubtotal) summarySubtotal.textContent = formatPrice(subtotal);
    if (summaryTotal) summaryTotal.textContent = formatPrice(getTotal());
    if (shippingEl) {
      shippingEl.textContent = subtotal > 2999 ? 'COMPLIMENTARY' : '₹250';
    }
  }

  if (window.lucide) {
    lucide.createIcons({ root: container });
  }
}

function applyCoupon() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'LUXE10') {
    APPLIED_COUPON = { code: 'LUXE10', type: 'percentage', value: 10 };
    showToast('Promo code LUXE10 applied! 10% Royal Discount saved.', 'success');
  } else if (code === 'VIPGOLD') {
    APPLIED_COUPON = { code: 'VIPGOLD', type: 'percentage', value: 15 };
    showToast('VIP Gold privilege unlocked! 15% VIP discount applied.', 'success');
  } else {
    showToast('Invalid promo code. Try "LUXE10" or "VIPGOLD"', 'warning');
    return;
  }

  renderCartDrawer();
}

function openCartDrawer() {
  // Cart drawer permanently removed per user request
  const drawer = document.getElementById('luxenest-cart-drawer');
  if (drawer) drawer.remove();
  document.getElementById('cart-backdrop')?.remove();
  document.body.style.overflow = '';
}

function closeCartDrawer() {
  const drawer = document.getElementById('luxenest-cart-drawer');
  if (drawer) drawer.remove();
  document.getElementById('cart-backdrop')?.remove();
  document.body.style.overflow = '';
}

// Checkout Modal Simulator (Frontend demonstration)
function openCheckoutModal() {
  if (CART.length === 0) {
    showToast('Your gift bag is empty', 'warning');
    return;
  }
  closeCartDrawer();

  let modal = document.getElementById('luxenest-checkout-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'luxenest-checkout-modal';
    modal.className = 'fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto';
    document.body.appendChild(modal);
  }

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  modal.innerHTML = `
    <div class="relative w-full max-w-2xl bg-[#FAF8F3] dark:bg-[#10151F] text-[#282828] dark:text-gray-100 rounded-3xl border border-[#C6A56B] shadow-2xl p-6 md:p-8 my-8">
      <button onclick="document.getElementById('luxenest-checkout-modal').remove()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#101C32] text-[#C6A56B] mb-2 border border-[#C6A56B]">
          <i data-lucide="shield-check" class="w-6 h-6"></i>
        </div>
        <h3 class="font-serif text-2xl font-bold text-[#101C32] dark:text-[#FAF8F3]">Boutique Checkout Demo</h3>
        <p class="text-xs text-[#C6A56B] uppercase tracking-wider font-semibold">Simulated Luxury Order Placement</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
        <div>
          <label class="block font-medium mb-1 text-gray-600 dark:text-gray-300">Recipient / Sender Name</label>
          <input type="text" id="chk-name" value="Lady Eleanor Vance" class="w-full px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-gray-700 bg-white dark:bg-[#161F30] focus:border-[#C6A56B] focus:outline-none">
        </div>
        <div>
          <label class="block font-medium mb-1 text-gray-600 dark:text-gray-300">Contact Email</label>
          <input type="email" id="chk-email" value="eleanor.vance@luxury.com" class="w-full px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-gray-700 bg-white dark:bg-[#161F30] focus:border-[#C6A56B] focus:outline-none">
        </div>
        <div class="md:col-span-2">
          <label class="block font-medium mb-1 text-gray-600 dark:text-gray-300">Delivery Address</label>
          <input type="text" id="chk-address" value="The Imperial Residences, Penthouse 4B, Central Avenue" class="w-full px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-gray-700 bg-white dark:bg-[#161F30] focus:border-[#C6A56B] focus:outline-none">
        </div>
        <div>
          <label class="block font-medium mb-1 text-gray-600 dark:text-gray-300">Delivery Date Preference</label>
          <input type="date" value="2026-11-20" class="w-full px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-gray-700 bg-white dark:bg-[#161F30] focus:border-[#C6A56B] focus:outline-none">
        </div>
        <div>
          <label class="block font-medium mb-1 text-gray-600 dark:text-gray-300">Packaging Type</label>
          <select class="w-full px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-gray-700 bg-white dark:bg-[#161F30] focus:border-[#C6A56B] focus:outline-none">
            <option>Complimentary Midnight Navy & Satin Ribbon</option>
            <option>Royal Velvet Keepsake Trunk (+₹499)</option>
            <option>Biodegradable Botanical Eco-Luxe</option>
          </select>
        </div>
      </div>

      <!-- Order Summary Card -->
      <div class="p-4 rounded-2xl bg-[#101C32]/5 dark:bg-[#161F30] border border-[#C6A56B]/30 mb-6">
        <div class="flex justify-between text-xs py-1 text-gray-600 dark:text-gray-400">
          <span>Subtotal (${CART.length} items)</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        ${discount > 0 ? `
          <div class="flex justify-between text-xs py-1 text-emerald-600">
            <span>Privilege Discount</span>
            <span>-${formatPrice(discount)}</span>
          </div>
        ` : ''}
        <div class="flex justify-between text-xs py-1 text-gray-600 dark:text-gray-400">
          <span>White-Glove Insured Delivery</span>
          <span>${subtotal > 2999 ? 'COMPLIMENTARY' : '₹250'}</span>
        </div>
        <div class="flex justify-between text-base font-serif font-bold pt-2 mt-2 border-t border-[#C6A56B]/30 text-[#101C32] dark:text-[#C6A56B]">
          <span>Total Investment</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="document.getElementById('luxenest-checkout-modal').remove()" class="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          Return to Bag
        </button>
        <button onclick="confirmDemoOrder()" class="flex-1 py-3 px-4 rounded-xl bg-gold-gradient text-[#101C32] font-semibold text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <i data-lucide="check" class="w-4 h-4"></i>
          <span>Place Demonstration Order</span>
        </button>
      </div>
      <p class="text-center text-[10px] text-gray-400 mt-3">Frontend Demo: No actual financial charge will occur.</p>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons({ root: modal });
  }
}

function confirmDemoOrder() {
  const modal = document.getElementById('luxenest-checkout-modal');
  const orderNumber = 'LX-' + Math.floor(100000 + Math.random() * 900000);
  const total = getTotal();

  // Trigger celebration confetti
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6A56B', '#101C32', '#DFCA95', '#FAF8F3']
    });
  }

  modal.innerHTML = `
    <div class="relative w-full max-w-lg bg-[#FAF8F3] dark:bg-[#10151F] text-[#282828] dark:text-gray-100 rounded-3xl border border-[#C6A56B] shadow-2xl p-8 text-center">
      <div class="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center mb-4">
        <i data-lucide="award" class="w-10 h-10"></i>
      </div>

      <span class="text-xs font-semibold text-[#C6A56B] uppercase tracking-widest">Order Confirmed</span>
      <h3 class="font-serif text-3xl font-bold text-[#101C32] dark:text-[#FAF8F3] mt-1 mb-2">Thank You For Choosing LuxeNest</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
        Your bespoke order <strong class="text-[#101C32] dark:text-[#C6A56B]">#${orderNumber}</strong> has been received by our gifting concierge. We are meticulously preparing your presentation with hand-tied satin ribbons.
      </p>

      <div class="p-4 rounded-xl bg-white dark:bg-[#161F30] border border-[#E2D9C8] dark:border-[#2A374F] text-left text-xs mb-6 space-y-2">
        <div class="flex justify-between text-gray-500">
          <span>Total Value:</span>
          <span class="font-bold text-[#101C32] dark:text-white">${formatPrice(total)}</span>
        </div>
        <div class="flex justify-between text-gray-500">
          <span>Est. Presentation Date:</span>
          <span class="font-semibold text-[#101C32] dark:text-white">Within 48 Hours</span>
        </div>
        <div class="flex justify-between text-gray-500">
          <span>Packaging Standard:</span>
          <span class="text-[#C6A56B] font-semibold">Midnight Navy & Champagne Gold</span>
        </div>
      </div>

      <button onclick="document.getElementById('luxenest-checkout-modal').remove(); CART=[]; saveCart(); window.location.href=getBasePath()+'index.html'" class="w-full py-3 rounded-xl bg-[#101C32] dark:bg-[#C6A56B] text-[#FAF8F3] dark:text-[#101C32] font-semibold text-xs transition-all shadow-md">
        Continue Exploring LuxeNest
      </button>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons({ root: modal });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure cart drawer is removed from DOM if present
  document.getElementById('luxenest-cart-drawer')?.remove();
  document.getElementById('cart-backdrop')?.remove();
  loadCart();
});
