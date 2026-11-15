/**
 * LuxeNest - Live Instant Predictive Search
 */

function openSearchModal() {
  let modal = document.getElementById('luxenest-search-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'luxenest-search-modal';
    modal.className = 'fixed inset-0 z-[9990] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="relative w-full max-w-2xl bg-[#FAF8F3] dark:bg-[#10151F] text-[#282828] dark:text-gray-100 rounded-3xl border border-[#C6A56B] shadow-2xl p-6 overflow-hidden" onclick="event.stopPropagation()">
      <div class="flex items-center gap-3 pb-4 border-b border-[#E2D9C8] dark:border-[#2A374F]">
        <i data-lucide="search" class="w-6 h-6 text-[#C6A56B]"></i>
        <input 
          id="global-search-input" 
          type="text" 
          placeholder="Search luxury hampers, perfumes, watches, leather..."
          class="w-full text-base bg-transparent border-none focus:outline-none placeholder-gray-400 text-[#101C32] dark:text-[#FAF8F3]"
          autofocus
        />
        <button onclick="closeSearchModal()" class="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Quick suggestions tags -->
      <div class="flex items-center gap-2 mt-4 text-xs overflow-x-auto pb-1">
        <span class="text-gray-400 shrink-0">Popular:</span>
        <button onclick="setSearchQuery('Hamper')" class="px-2.5 py-1 rounded-full bg-[#101C32]/5 dark:bg-[#161F30] hover:bg-[#C6A56B]/20 text-[#101C32] dark:text-gray-300 border border-[#C6A56B]/30 shrink-0">Hampers</button>
        <button onclick="setSearchQuery('Leather')" class="px-2.5 py-1 rounded-full bg-[#101C32]/5 dark:bg-[#161F30] hover:bg-[#C6A56B]/20 text-[#101C32] dark:text-gray-300 border border-[#C6A56B]/30 shrink-0">Leather Folio</button>
        <button onclick="setSearchQuery('Compass')" class="px-2.5 py-1 rounded-full bg-[#101C32]/5 dark:bg-[#161F30] hover:bg-[#C6A56B]/20 text-[#101C32] dark:text-gray-300 border border-[#C6A56B]/30 shrink-0">Brass Compass</button>
        <button onclick="setSearchQuery('Candle')" class="px-2.5 py-1 rounded-full bg-[#101C32]/5 dark:bg-[#161F30] hover:bg-[#C6A56B]/20 text-[#101C32] dark:text-gray-300 border border-[#C6A56B]/30 shrink-0">Oud Candle</button>
      </div>

      <!-- Live Search Results Container -->
      <div id="search-results-container" class="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
        <p class="text-center text-xs text-gray-400 py-8">Type to begin discovering luxury boutique treasures</p>
      </div>
    </div>
  `;

  modal.onclick = closeSearchModal;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');

  const input = document.getElementById('global-search-input');
  if (input) {
    input.focus();
    input.addEventListener('input', (e) => executeLiveSearch(e.target.value));
  }

  if (window.lucide) {
    lucide.createIcons({ root: modal });
  }
}

function closeSearchModal() {
  const modal = document.getElementById('luxenest-search-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
  }
}

function setSearchQuery(term) {
  const input = document.getElementById('global-search-input');
  if (input) {
    input.value = term;
    executeLiveSearch(term);
  }
}

function executeLiveSearch(query) {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    container.innerHTML = `<p class="text-center text-xs text-gray-400 py-8">Type to discover gifts...</p>`;
    return;
  }

  const products = (typeof LUXE_PRODUCTS !== 'undefined' && LUXE_PRODUCTS.length > 0) ? LUXE_PRODUCTS : FALLBACK_PRODUCTS;
  const matches = products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.categoryName.toLowerCase().includes(q) ||
    p.shortDesc.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="py-10 text-center">
        <p class="text-sm font-medium text-[#101C32] dark:text-white">No matches found for "${query}"</p>
        <p class="text-xs text-gray-400 mt-1">Try searching for "hamper", "leather", "wedding", or "candle".</p>
      </div>
    `;
    return;
  }

  const basePath = getBasePath();

  container.innerHTML = matches.map(p => `
    <div class="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-[#161F30] border border-[#E2D9C8]/60 dark:border-[#2A374F] hover:border-[#C6A56B] transition-all cursor-pointer" onclick="window.location.href='${basePath}shop/product-details.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.name}" class="w-14 h-14 rounded-lg object-cover shrink-0">
      <div class="flex-1">
        <span class="text-[10px] uppercase font-semibold text-[#C6A56B]">${p.categoryName}</span>
        <h5 class="font-serif text-sm font-medium text-[#101C32] dark:text-[#FAF8F3] line-clamp-1">${p.name}</h5>
        <span class="text-xs font-semibold text-[#101C32] dark:text-[#FAF8F3]">${formatPrice(p.price)}</span>
      </div>
      <div class="text-[#C6A56B] p-2">
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons({ root: container });
  }
}
