/**
 * LuxeNest - Product Catalog, Filtering, Sorting & Quick View
 */

let LUXE_PRODUCTS = [];

// Fallback in case fetch is blocked by file:// protocol in direct browser opening
const FALLBACK_PRODUCTS = [
  {
    "id": "lx-01",
    "name": "The Le Prestige Midnight Hamper",
    "category": "birthday",
    "categoryName": "Birthday Celebrations",
    "price": 3999,
    "originalPrice": 4799,
    "rating": 4.9,
    "reviewsCount": 128,
    "badge": "Bestseller",
    "isBestseller": true,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1759563874981-9bd689ac7fbf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1764385827253-3d0a5eb813fe?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "An opulent midnight navy gift hamper tied with golden satin, featuring artisanal Belgian truffles, a gold-rimmed ceramic mug, and a soy oud candle.",
    "longDesc": "Presented in our signature rigid midnight navy box with warm champagne gold ribbon, The Le Prestige Midnight Hamper is curated for life's most unforgettable moments. Includes a customized ceramic coffee mug with recipient's initial in 24k gold leaf, artisanal Belgian dark cocoa truffles, our signature Midnight Oud hand-poured soy candle, and a handwritten calligraphed greeting card.",
    "specs": {
      "Box Dimensions": "32cm x 24cm x 12cm",
      "Box Finish": "Embossed Midnight Matte with Gold Foil",
      "Contents": "Personalized Mug, Artisanal Truffles (120g), Soy Candle (200g), Wax-sealed Card",
      "Packaging": "Complimentary Satin Ribbon & Gift Bag"
    },
    "personalization": {
      "type": "Engraved Initials & Custom Card",
      "maxChars": 25
    }
  },
  {
    "id": "lx-02",
    "name": "Sovereign Executive Leather Folio & Pen",
    "category": "corporate",
    "categoryName": "Corporate & Executive",
    "price": 2499,
    "originalPrice": 2999,
    "rating": 4.8,
    "reviewsCount": 94,
    "badge": "Executive Choice",
    "isBestseller": true,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Full-grain Italian calfskin notebook folio paired with a weighted solid brass laser-engraved fountain pen.",
    "longDesc": "Designed for leaders and visionary professionals. Handcrafted from top-tier full-grain leather that develops a magnificent patina over time. The solid brass fountain pen balances effortlessly and can be engraved with a corporate emblem or personal name.",
    "specs": {
      "Folio Material": "100% Full-grain Tuscan Calf Leather",
      "Pen Material": "Solid Polished Brass with Medium German Nib",
      "Paper": "160 GSM Archival Acid-Free Cream Pages",
      "Dimensions": "A5 (21.5cm x 15cm)"
    },
    "personalization": {
      "type": "Name & Company Monogram Engraving",
      "maxChars": 20
    }
  },
  {
    "id": "lx-03",
    "name": "Eternal Bond Couple Keepsake Box",
    "category": "anniversary",
    "categoryName": "Anniversary & Romance",
    "price": 3499,
    "originalPrice": 4200,
    "rating": 5,
    "reviewsCount": 112,
    "badge": "Most Loved",
    "isBestseller": true,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1580657274234-7339717f4541?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1580657274234-7339717f4541?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1672426348294-adbc656163bf?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Gold-foiled hardwood keepsake trunk with dual crystal champagne flutes and custom engraved metallic photo frame.",
    "longDesc": "A celebration of enduring devotion. This romantic suite features a custom photo frame with your favourite anniversary photo printed on archival lustre paper, two gold-rimmed hand-blown crystal flutes, and organic floral bath crystals in glass vials.",
    "specs": {
      "Box Material": "Velvet-lined Hardwood Trunk",
      "Frame Size": "5x7 inch Gold-plated Brass Frame",
      "Flutes": "Lead-free European Crystal (250ml each)",
      "Extras": "Rose petals & Custom Love Letter"
    },
    "personalization": {
      "type": "Couple Names, Date & Framed Photo Upload",
      "maxChars": 35
    }
  },
  {
    "id": "lx-04",
    "name": "Vintage Solid Brass Navigational Compass",
    "category": "souvenirs",
    "categoryName": "Heritage & Souvenirs",
    "price": 1999,
    "originalPrice": 2499,
    "rating": 4.9,
    "reviewsCount": 73,
    "badge": "Heritage Pick",
    "isBestseller": false,
    "isNew": true,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1488375634201-b85b28653a79?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1488375634201-b85b28653a79?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501960660415-25474dd8caa0?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Authentic sundial brass compass in a hand-carved sheesham rosewood keepsake box with custom brass nameplate.",
    "longDesc": "A poignant metaphor for guidance and safe journeys. Antique hand-finished brass compass with working magnetic needle and sundial scale. Resting within an inlaid brass rosewood presentation chest with custom engraving.",
    "specs": {
      "Compass Size": "7.5cm diameter",
      "Chest Material": "Seasoned Rosewood with Velvet Bed",
      "Engraving": "Diamond-drag Brass Plate Engraving",
      "Weight": "420g"
    },
    "personalization": {
      "type": "Name, Coordinates or Quote Engraving",
      "maxChars": 40
    }
  },
  {
    "id": "lx-05",
    "name": "Imperial Saffron & Rose Festive Hamper",
    "category": "festive",
    "categoryName": "Festive & Celebrations",
    "price": 2899,
    "originalPrice": 3500,
    "rating": 4.8,
    "reviewsCount": 64,
    "badge": "Festive Special",
    "isBestseller": false,
    "isNew": true,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Kashmiri Mongra saffron, roasted Iranian pistachios in brass canisters, and two hand-beaten gold brass diyas.",
    "longDesc": "Evoking imperial palace celebrations. Packaged in a regal ivory and gold hexagon box with laser-cut fretwork patterns. Includes pure organic saffron, gourmet dry fruits, and handcrafted brass lanterns.",
    "specs": {
      "Saffron": "2g Grade 1 Kashmiri Mongra",
      "Canisters": "Food-grade Solid Brass Jars (200g each)",
      "Box Style": "Octagonal Ivory Box with Gilded Filigree",
      "Sweetener": "Organic Raw Forest Honey"
    },
    "personalization": {
      "type": "Family Name or Festive Greeting",
      "maxChars": 30
    }
  },
  {
    "id": "lx-06",
    "name": "Monogrammed Tuscan Bifold & Key Vault",
    "category": "accessories",
    "categoryName": "Leather & Accessories",
    "price": 1799,
    "originalPrice": 2200,
    "rating": 4.9,
    "reviewsCount": 156,
    "badge": "Trending",
    "isBestseller": true,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Hand-stitched oil-pull vegetable-tanned leather bifold with RFID shield and solid brass monogrammed keychain.",
    "longDesc": "Artisan craftsmanship meets modern utility. Each wallet is cut from premium vegetable-tanned hides that age gracefully. Monogrammed with hot foil stamping in antique gold or deep debossing.",
    "specs": {
      "Leather": "100% Vegetable-Tanned Italian Cowhide",
      "Features": "6 Card Slots, 2 Hidden Pockets, Full Currency Sleeve, RFID Safe",
      "Hardware": "Solid Brushed Brass Keyring",
      "Color": "Cognac Tan or Obsidian Noir"
    },
    "personalization": {
      "type": "Foil Stamped Initials (Up to 3 Letters)",
      "maxChars": 6
    }
  },
  {
    "id": "lx-07",
    "name": "Midnight Amber Oud Soy Candle in Marble",
    "category": "home-decor",
    "categoryName": "Home Decor & Fragrance",
    "price": 1299,
    "originalPrice": 1599,
    "rating": 4.7,
    "reviewsCount": 89,
    "badge": "Aromatherapy",
    "isBestseller": false,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Hand-poured 100% soy candle in a genuine black Marquina marble vessel with engraved brass lid.",
    "longDesc": "An intoxicating blend of smoky amber, dark cedarwood, and Cambodian oud with delicate notes of vanilla bean. The heavy marble vessel doubles as an enduring luxury desk catchall once the candle has finished burning.",
    "specs": {
      "Vessel": "Solid Turned Nero Marquina Marble",
      "Wax": "Natural Vegan Soy & Coconut Wax (340g)",
      "Burn Time": "65+ Hours with Double Wood Wick",
      "Fragrance Notes": "Smoky Oud, Warm Amber, Bergamot, Sandalwood"
    },
    "personalization": {
      "type": "Custom Brass Lid Monogram",
      "maxChars": 15
    }
  },
  {
    "id": "lx-08",
    "name": "The Royal Wedding Splendor Trunk",
    "category": "wedding",
    "categoryName": "Wedding & Return Gifts",
    "price": 4999,
    "originalPrice": 5999,
    "rating": 5,
    "reviewsCount": 42,
    "badge": "Signature Luxury",
    "isBestseller": false,
    "isNew": true,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Velvet-lined navy trousseau trunk with silver-plated champagne bucket, couple keepsakes, and scented wax melts.",
    "longDesc": "Designed for momentous unions. Encased in a handcrafted midnight navy trunk accented with champagne gold hardware and lock clasps. Includes personalized silver-plated keepsakes, celebration flutes, and hand-embroidered raw silk pouches.",
    "specs": {
      "Trunk Structure": "Reinforced Wood with Velvet Lining",
      "Hardware": "Gold-plated Solid Brass Hinges & Clasps",
      "Dimensions": "38cm x 28cm x 16cm",
      "Includes": "Silver-plated Bucket, 2 Flutes, Custom Scroll"
    },
    "personalization": {
      "type": "Bride & Groom Names + Wedding Date Plaque",
      "maxChars": 40
    }
  },
  {
    "id": "lx-09",
    "name": "Personalized 24k Gold Rim Ceramic Mug Set",
    "category": "birthday",
    "categoryName": "Birthday Celebrations",
    "price": 999,
    "originalPrice": 1299,
    "rating": 4.9,
    "reviewsCount": 210,
    "badge": "Popular",
    "isBestseller": true,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Artisanal stoneware coffee mugs glazed in matte navy with real 24k gold calligraphed names and rim.",
    "longDesc": "Every morning begins in quiet luxury. Handcrafted from fine ceramic stoneware, finished with an ivory interior and velvety midnight navy exterior. Features custom calligraphy fired with genuine liquid gold.",
    "specs": {
      "Capacity": "350ml / 12 fl oz",
      "Material": "Fine High-Fired Stoneware Ceramic",
      "Detailing": "Genuine 24k Gold Luster Calligraphy",
      "Care": "Gentle hand wash recommended"
    },
    "personalization": {
      "type": "Custom Name or Script Initial",
      "maxChars": 15
    }
  },
  {
    "id": "lx-10",
    "name": "The CEO Distinction Desk Clock & Pen Stand",
    "category": "corporate",
    "categoryName": "Corporate & Executive",
    "price": 2799,
    "originalPrice": 3499,
    "rating": 4.8,
    "reviewsCount": 51,
    "badge": "Premium",
    "isBestseller": false,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1428660285748-340f4e33d608?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1428660285748-340f4e33d608?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628519273382-a8fac83d682d?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Solid walnut and brushed gold desk timepiece featuring an integrated rollerball pen holder and engraved plaque.",
    "longDesc": "A commanding statement on any executive desk. Precision Japanese quartz movement encased in brushed champagne gold plating set into American dark walnut wood.",
    "specs": {
      "Wood": "Sustainably Harvested American Walnut",
      "Movement": "Silent Sweep Quartz (Battery included)",
      "Finish": "Brushed Champagne Gold & Natural Wax",
      "Weight": "680g"
    },
    "personalization": {
      "type": "Executive Name & Designation Plaque",
      "maxChars": 35
    }
  },
  {
    "id": "lx-11",
    "name": "Heritage Monument Brass Paperweight Souvenir",
    "category": "souvenirs",
    "categoryName": "Heritage & Souvenirs",
    "price": 1499,
    "originalPrice": 1850,
    "rating": 4.8,
    "reviewsCount": 38,
    "badge": "Limited Edition",
    "isBestseller": false,
    "isNew": true,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1576513308483-f537c6ee28aa?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576513308483-f537c6ee28aa?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Sculptural solid brass architectural souvenir with felted base and customized city coordinates engraving.",
    "longDesc": "Commemorate unforgettable journeys and historic milestones. Cast in solid brass using traditional lost-wax casting methods and polished to a warm glow.",
    "specs": {
      "Metal": "Solid Architectural Brass",
      "Weight": "550g",
      "Base": "Non-scratch Velvet Base Pad",
      "Packaging": "Navy Presentation Box with Ribbon"
    },
    "personalization": {
      "type": "City Name, Coordinates or Personal Date",
      "maxChars": 28
    }
  },
  {
    "id": "lx-12",
    "name": "Florentine Gold Leaf Mirrored Vanity Tray",
    "category": "home-decor",
    "categoryName": "Home Decor & Fragrance",
    "price": 2199,
    "originalPrice": 2699,
    "rating": 4.9,
    "reviewsCount": 77,
    "badge": "Luxe Decor",
    "isBestseller": false,
    "isNew": false,
    "isPersonalizable": true,
    "giftBoxIncluded": true,
    "image": "https://images.unsplash.com/photo-1709971422634-288a0ae25cce?q=80&w=1000&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1709971422634-288a0ae25cce?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"
    ],
    "shortDesc": "Hand-gilded champagne gold vanity tray with beveled mirror base and delicate baroque fretwork.",
    "longDesc": "Reflect beauty across your dresser or coffee table. Ideal for staging luxury fragrances, watches, and precious jewelry.",
    "specs": {
      "Frame": "Hand-hammered Brass with Gold Leaf Patina",
      "Mirror": "4mm High-Definition Beveled Glass",
      "Dimensions": "35cm x 22cm x 4.5cm",
      "Care": "Soft microfiber cloth dusting"
    },
    "personalization": {
      "type": "Subtle Laser Monogram on Mirror Corner",
      "maxChars": 8
    }
  }
];

async function loadProducts() {
  if (LUXE_PRODUCTS.length > 0) return LUXE_PRODUCTS;
  try {
    const basePath = getBasePath();
    const res = await fetch(`${basePath}assets/data/products.json`);
    if (res.ok) {
      LUXE_PRODUCTS = await res.json();
    } else {
      LUXE_PRODUCTS = FALLBACK_PRODUCTS;
    }
  } catch (err) {
    console.warn('Using fallback products dataset:', err);
    LUXE_PRODUCTS = FALLBACK_PRODUCTS;
  }
  return LUXE_PRODUCTS;
}

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/shop/') || path.includes('/customization/') || path.includes('/services/') || path.includes('/blog/') || path.includes('/auth/')) {
    return '../';
  }
  return './';
}

function getProductById(id) {
  return (LUXE_PRODUCTS.length ? LUXE_PRODUCTS : FALLBACK_PRODUCTS).find(p => p.id === id);
}

// Render a single luxury product card
function createProductCardHTML(p) {
  const basePath = getBasePath();
  const detailLink = `${basePath}shop/product-details.html?id=${p.id}`;

  return `
    <div class="group relative bg-white dark:bg-[#161F30] rounded-2xl border border-[#E2D9C8]/80 dark:border-[#2A374F] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      <!-- Image Container -->
      <div class="relative w-full aspect-square overflow-hidden bg-[#101C32]/5 dark:bg-[#10151F]">
        <img 
          src="${p.image}" 
          alt="${p.name}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop'"
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        <!-- Primary Luxury Badge -->
        ${p.badge ? `
          <span class="absolute top-3 left-3 bg-[#101C32] dark:bg-[#FAF8F3] text-[#FAF8F3] dark:text-[#101C32] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-[#C6A56B]/60 shadow-md z-10">
            ${p.badge}
          </span>
        ` : ''}

        <!-- Personalizable Accent Badge -->
        ${p.isPersonalizable ? `
          <span class="absolute top-3 right-3 bg-[#FAF8F3]/95 dark:bg-[#10151F]/90 backdrop-blur-md text-[#C6A56B] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#C6A56B]/40 shadow-sm flex items-center gap-1 z-10">
            <i data-lucide="sparkles" class="w-3 h-3 text-[#C6A56B]"></i> Custom
          </span>
        ` : ''}

        <!-- Quick Actions Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#101C32]/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-2 p-3 pb-4 z-10">
          <button 
            onclick="openQuickView('${p.id}')"
            class="px-4 py-2 rounded-full bg-[#FAF8F3] dark:bg-[#10151F] text-[#101C32] dark:text-[#FAF8F3] hover:text-[#C6A56B] text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            title="Quick View"
          >
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <!-- Card Content -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Category & Rating Bar -->
          <div class="flex items-center justify-between text-xs mb-1.5 gap-2">
            <span class="text-[10px] font-bold tracking-[0.16em] uppercase text-[#C6A56B] truncate">${p.categoryName || p.category}</span>
            <div class="flex items-center gap-1 text-[#C6A56B] shrink-0">
              <i data-lucide="star" class="w-3 h-3 fill-current"></i>
              <span class="font-bold text-xs text-[#101C32] dark:text-gray-200">${p.rating}</span>
              <span class="text-[10px] text-gray-400">(${p.reviewsCount})</span>
            </div>
          </div>

          <!-- Product Name -->
          <h3 class="font-serif text-lg sm:text-xl font-bold text-[#101C32] dark:text-[#FAF8F3] group-hover:text-[#C6A56B] transition-colors line-clamp-1 mt-1 leading-snug">
            <a href="${detailLink}">${p.name}</a>
          </h3>

          <!-- Short Description with min-height for uniform alignment -->
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed min-h-[2rem]">
            ${p.shortDesc}
          </p>
        </div>

        <!-- Price & Action Button Footer -->
        <div class="mt-4 pt-3.5 border-t border-[#E2D9C8]/70 dark:border-[#2A374F] flex items-center justify-between gap-2">
          <div class="flex flex-col">
            <div class="flex items-baseline gap-1.5">
              <span class="font-serif text-xl sm:text-2xl font-bold text-[#101C32] dark:text-[#FAF8F3]">
                ${formatPrice(p.price)}
              </span>
              ${p.originalPrice ? `
                <span class="text-xs text-gray-400 line-through">
                  ${formatPrice(p.originalPrice)}
                </span>
              ` : ''}
            </div>
            ${p.originalPrice ? `
              <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                Save ${formatPrice(p.originalPrice - p.price)}
              </span>
            ` : ''}
          </div>

          <a 
            href="${detailLink}"
            class="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#101C32] hover:bg-[#1A2B4C] dark:bg-[#C6A56B] dark:hover:bg-[#DFCA95] text-white dark:text-[#101C32] font-semibold text-xs shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
            title="Product Details - ${p.name}"
          >
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5 text-[#D6A653] dark:text-[#101C32]"></i>
            <span>Product Details</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Quick View Modal
function openQuickView(productId) {
  const p = getProductById(productId);
  if (!p) return;

  let modal = document.getElementById('luxenest-quickview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'luxenest-quickview-modal';
    modal.className = 'fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300';
    document.body.appendChild(modal);
  }

  const basePath = getBasePath();
  const detailLink = `${basePath}shop/product-details.html?id=${p.id}`;

  modal.innerHTML = `
    <div class="relative w-full max-w-4xl bg-[#FAF8F3] dark:bg-[#10151F] text-[#282828] dark:text-gray-100 rounded-2xl border border-[#C6A56B]/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row transform scale-95 transition-transform duration-300" onclick="event.stopPropagation()">
      <button 
        onclick="closeQuickView()"
        class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#101C32]/80 text-[#FAF8F3] hover:text-[#C6A56B] flex items-center justify-center transition-colors"
      >
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <!-- Image Column -->
      <div class="md:w-1/2 p-6 bg-[#101C32]/5 dark:bg-[#0B1017] flex flex-col justify-center items-center">
        <div class="w-full aspect-square rounded-xl overflow-hidden border border-[#E2D9C8] dark:border-[#2A374F] shadow-md">
          <img id="qv-main-img" src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        </div>
        ${p.gallery && p.gallery.length > 1 ? `
          <div class="flex gap-2 mt-3 overflow-x-auto w-full pb-1">
            ${p.gallery.map(img => `
              <button onclick="document.getElementById('qv-main-img').src='${img}'" class="w-14 h-14 rounded-lg overflow-hidden border border-[#C6A56B]/50 shrink-0 hover:opacity-100 transition-opacity">
                <img src="${img}" class="w-full h-full object-cover">
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Info Column -->
      <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <div class="flex items-center justify-between text-xs text-[#C6A56B] mb-2 font-medium">
            <span class="uppercase tracking-widest">${p.categoryName}</span>
            <div class="flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
              <span>${p.rating} (${p.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 class="font-serif text-2xl lg:text-3xl font-medium text-[#101C32] dark:text-[#FAF8F3] mb-2">
            ${p.name}
          </h2>

          <div class="flex items-baseline gap-3 mb-4">
            <span class="font-serif text-2xl font-bold text-[#101C32] dark:text-[#C6A56B]">
              ${formatPrice(p.price)}
            </span>
            ${p.originalPrice ? `
              <span class="text-sm text-gray-400 line-through">
                ${formatPrice(p.originalPrice)}
              </span>
              <span class="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                Save ${formatPrice(p.originalPrice - p.price)}
              </span>
            ` : ''}
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            ${p.longDesc}
          </p>

          <!-- Personalization Input if available -->
          ${p.isPersonalizable ? `
            <div class="p-3 rounded-xl bg-[#101C32]/5 dark:bg-[#161F30] border border-[#C6A56B]/30 mb-4">
              <label class="block text-xs font-semibold text-[#101C32] dark:text-[#C6A56B] mb-1">
                Complimentary Personalization:
              </label>
              <input 
                id="qv-pers-text"
                type="text" 
                maxlength="25"
                placeholder="e.g., Initials 'A.S' or Name"
                class="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#10151F] text-[#282828] dark:text-white focus:outline-none focus:border-[#C6A56B]"
              />
              <span class="text-[10px] text-gray-400 mt-1 block">Free 24k gold leaf or diamond-engraving</span>
            </div>
          ` : ''}
        </div>

        <div class="pt-4 border-t border-[#E2D9C8] dark:border-[#2A374F] flex flex-col gap-3">
          <div class="flex gap-3">
            <a 
              href="${detailLink}"
              class="w-full py-3.5 px-6 rounded-xl bg-[#101C32] dark:bg-[#C6A56B] text-[#FAF8F3] dark:text-[#101C32] hover:bg-[#C6A56B] hover:text-[#101C32] dark:hover:bg-[#DFCA95] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center"
              title="Product Details - ${p.name}"
            >
              <i data-lucide="shopping-bag" class="w-4 h-4 text-[#DFCA95] dark:text-[#101C32]"></i>
              <span>Product Details</span>
            </a>
          </div>

          <a 
            href="${detailLink}"
            class="text-center text-xs font-medium text-[#C6A56B] hover:underline"
          >
            View Full Product Specifications & Packaging Details &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  modal.onclick = closeQuickView;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.firstElementChild.classList.remove('scale-95');
  modal.firstElementChild.classList.add('scale-100');

  if (window.lucide) {
    lucide.createIcons({ root: modal });
  }
}

function closeQuickView() {
  const modal = document.getElementById('luxenest-quickview-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.add('scale-95');
    modal.firstElementChild.classList.remove('scale-100');
  }
}

function addFromQuickView(productId) {
  const p = getProductById(productId);
  if (!p) return;
  const persInput = document.getElementById('qv-pers-text');
  const persText = persInput ? persInput.value.trim() : '';
  addToCart(p, 1, persText);
  closeQuickView();
}

function quickAddToCart(productId) {
  const p = getProductById(productId);
  if (!p) return;
  addToCart(p, 1);
}
