/**
 * LuxeNest - Gift Wrapping & Packaging Studio
 */

const WrappingStudio = {
  paper: 'navy-damask',
  ribbon: 'gold-satin',
  wax: 'crimson',
  message: 'With compliments and warmest felicitations on this joyous occasion.',

  papers: {
    'navy-damask': {
      name: 'Midnight Damask Embossed',
      bg: 'radial-gradient(circle at 50% 50%, #152238 0%, #0A111C 100%)',
      border: '#C6A56B'
    },
    'champagne-foil': {
      name: 'Champagne Gilded Leaf',
      bg: 'linear-gradient(135deg, #FAF3E0 0%, #DFCA95 50%, #C6A56B 100%)',
      border: '#9C7D40'
    },
    'botanical-dark': {
      name: 'Botanical Gold Foil Noir',
      bg: 'radial-gradient(circle at 30% 30%, #1E2838 0%, #10151F 100%)',
      border: '#DFCA95'
    },
    'matte-noir': {
      name: 'Obsidian Velvet Matte',
      bg: '#141416',
      border: '#C6A56B'
    }
  },

  ribbons: {
    'gold-satin': {
      name: 'Double Face Champagne Satin',
      gradient: 'linear-gradient(135deg, #F5E5C0 0%, #C6A56B 50%, #9C7D40 100%)'
    },
    'navy-silk': {
      name: 'Midnight Raw Silk',
      gradient: 'linear-gradient(135deg, #243552 0%, #101C32 50%, #0B1321 100%)'
    },
    'emerald-velvet': {
      name: 'Forest Emerald Velvet',
      gradient: 'linear-gradient(135deg, #2A6047 0%, #1B4531 50%, #0C2318 100%)'
    },
    'burgundy-wine': {
      name: 'Royal Burgundy Grosgrain',
      gradient: 'linear-gradient(135deg, #A82838 0%, #7A1926 50%, #4D0E16 100%)'
    }
  },

  waxSeals: {
    'crimson': {
      name: 'Imperial Wax Crimson',
      gradient: 'radial-gradient(circle at 35% 35%, #A82323 0%, #751717 60%, #470D0D 100%)'
    },
    'gold': {
      name: 'Melted Gold Filigree',
      gradient: 'radial-gradient(circle at 35% 35%, #F5E5C0 0%, #C6A56B 60%, #8C6A30 100%)'
    },
    'navy': {
      name: 'Midnight Blue Enamel',
      gradient: 'radial-gradient(circle at 35% 35%, #273A5E 0%, #101C32 60%, #0B111C 100%)'
    }
  },

  init() {
    this.bindEvents();
    this.updatePreview();
  },

  bindEvents() {
    const msg = document.getElementById('wrap-card-msg');
    if (msg) {
      msg.addEventListener('input', (e) => {
        this.message = e.target.value;
        this.updatePreview();
      });
    }
  },

  selectPaper(key) {
    this.paper = key;
    document.querySelectorAll('.wrap-paper-opt').forEach(b => b.classList.remove('ring-4', 'ring-[#C6A56B]'));
    document.getElementById(`wrap-paper-${key}`)?.classList.add('ring-4', 'ring-[#C6A56B]');
    this.updatePreview();
  },

  selectRibbon(key) {
    this.ribbon = key;
    document.querySelectorAll('.wrap-ribbon-opt').forEach(b => b.classList.remove('ring-4', 'ring-[#C6A56B]'));
    document.getElementById(`wrap-ribbon-${key}`)?.classList.add('ring-4', 'ring-[#C6A56B]');
    this.updatePreview();
  },

  selectWax(key) {
    this.wax = key;
    document.querySelectorAll('.wrap-wax-opt').forEach(b => b.classList.remove('ring-4', 'ring-[#C6A56B]'));
    document.getElementById(`wrap-wax-${key}`)?.classList.add('ring-4', 'ring-[#C6A56B]');
    this.updatePreview();
  },

  updatePreview() {
    const box = document.getElementById('wrapping-preview-box');
    const ribbonH = document.getElementById('wrapping-ribbon-h');
    const ribbonV = document.getElementById('wrapping-ribbon-v');
    const waxEl = document.getElementById('wrapping-wax-seal');
    const noteEl = document.getElementById('wrapping-preview-note');

    if (!box) return;

    const paperCfg = this.papers[this.paper] || this.papers['navy-damask'];
    const ribbonCfg = this.ribbons[this.ribbon] || this.ribbons['gold-satin'];
    const waxCfg = this.waxSeals[this.wax] || this.waxSeals['crimson'];

    box.style.background = paperCfg.bg;
    box.style.borderColor = paperCfg.border;

    if (ribbonH && ribbonV) {
      ribbonH.style.background = ribbonCfg.gradient;
      ribbonV.style.background = ribbonCfg.gradient;
    }

    if (waxEl) {
      waxEl.style.background = waxCfg.gradient;
    }

    if (noteEl) {
      noteEl.textContent = this.message || 'With warmest compliments and timeless regards.';
    }
  },

  addWrappingToCart() {
    const wrapProduct = {
      id: 'wrap-service-' + Date.now(),
      name: `Luxury Wrapping: ${this.papers[this.paper].name}`,
      price: 499,
      categoryName: 'Gift Wrapping',
      image: 'https://images.unsplash.com/photo-1759563874981-9bd689ac7fbf?q=80&w=1000&auto=format&fit=crop',
      boxDetails: {
        paper: this.papers[this.paper].name,
        ribbon: this.ribbons[this.ribbon].name,
        wax: this.waxSeals[this.wax].name
      }
    };
    addToCart(wrapProduct, 1, `Wax Seal: ${this.waxSeals[this.wax].name}`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('wrapping-preview-box')) {
    WrappingStudio.init();
  }
});
