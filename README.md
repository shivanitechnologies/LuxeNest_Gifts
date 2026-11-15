# LuxeNest Gifts – Luxury Personalized Gifting Boutique

> **"Make Every Gift Unforgettable."**  
> An ultra-premium, interactive luxury gifting boutique built with HTML5, Tailwind CSS, JavaScript, and Lucide Icons.

---

## ⚜️ Visual Identity & Design System

- **Brand Name**: LuxeNest Gifts
- **Tagline**: *"Make Every Gift Unforgettable."*
- **Primary Color**: Midnight Navy (`#101C32`)
- **Secondary Color**: Champagne Gold (`#C6A56B` with `#DFCA95` gold accents)
- **Light Background**: Warm Ivory (`#FAF8F3`)
- **Dark Background**: Obsidian Midnight (`#10151F`)
- **Text Color**: Charcoal (`#282828`) for Light Mode; Crisp Ivory (`#FAF8F3`) for Dark Mode
- **Typography**:
  - Headings: `Cormorant Garamond` (Classical Roman Serif)
  - Body: `Inter` (Clean modern sans-serif)
  - Promotional & Accents: `Playfair Display` (Editorial luxury serif)
  - Handwriting & Calligraphy: `Alex Brush` (Letterpress scripts)
- **Icons**: Lucide Icons CDN

---

## 🎁 Signature Interactive Features

### 1. Build Your Own Gift Box (`customization/build-gift-box.html`)
The flagship feature of LuxeNest. Rather than selling generic pre-packed gift hampers, customers design their own gift box using an interactive **3-column interface**:
- **Left Column**: 4-step customization wizard:
  - **Step 1: Choose Your Box**: Classic (₹999, up to 4 items), Premium Luxury (₹1,999, up to 6 items - *Recommended*), or Signature Hardwood Trunk (₹2,999, up to 9 items). Choice of Midnight Navy, Obsidian Noir, Warm Ivory, or Imperial Burgundy.
  - **Step 2: Curate Treasures**: Interactive catalog with instant filters for Mugs, Leather, Stationery, Candles, and Brass Souvenirs. Capacity meter tracks remaining space.
  - **Step 3: Packaging & Ribbon**: Ribbon selection (Champagne Satin, Midnight Silk, Emerald Velvet, Ruby Crimson) + 24k gold monogram hot stamping on box lid.
  - **Step 4: Personalize & Greeting**: Recipient name, custom handwritten message, and instant image upload that renders on archival photo paper inside the box.
- **Center Column**: Live 3D/realistic interactive gift box preview with dynamic interior slots, custom photo frame, letterpress card, and **Virtual Unboxing Experience** toggle button.
- **Right Column**: Real-time budget tracker with dynamic progress bar, calculated total price, "Surprise Me" auto-curator algorithm, "Save Design" (persisted in LocalStorage), and "Add Box to Bag".
- **Mobile Responsive**: Columns stack vertically with a sticky price bar and continue button.

### 2. Digital Greeting Card Designer (`customization/greeting-card.html`)
- Select from 4 letterpress card aesthetics (Botanical Gilded, Midnight Monogram, Ivory Letterpress, Ruby Velvet).
- Interactive **3D folding card flip** with front gold-foil cover and inside handwritten calligraphy letter.
- Realistic heraldic wax seal stamp simulation.

### 3. Surprise Gift Generator (`assets/js/main.js` & Modals)
- Interactive boutique concierge modal accessible from the navigation header on every page.
- Select recipient occasion (Birthday, Anniversary, Wedding, Corporate, Festive) and target budget slider (₹1,000 to ₹6,000) to receive an algorithmic luxury bundle recommendation with instant "Add to Bag".

### 4. Virtual Unboxing Experience (`assets/js/gift-preview.js`)
- Animated ribbon untying, 3D box lid rotation, and celebratory canvas confetti burst revealing inside gifts.

### 5. Corporate Bulk Gift Customizer (`customization/corporate-gifts.html`)
- Real-time quantity slider with volume tier discounts (10% for 10+ units, 15% for 25+ units, 20% for 50+ units, 25% for 100+ units).
- Corporate logo uploader that immediately simulates a 24k gold hot-stamped emblem on the midnight presentation box.
- Instant quotation summary and digital mockup request form.

### 6. Live Personalization Studio (`customization/personalized-gifts.html`)
- Live simulated typography (Classical Serif, Royal Script, Editorial Playfair, Modern Sans) rendered directly onto leather wallets, 24k gold ceramic coffee mugs, solid brass pens, and heirloom photo frames.

### 7. Luxury Gift Wrapping Studio (`customization/gift-wrapping.html`)
- Switch paper patterns (Midnight Damask, Champagne Leaf, Botanical Noir, Obsidian Velvet), satin ribbons, and hand-poured wax stamps (Crimson, Melted Gold, Midnight Blue) with a live visualizer.

### 8. Two Distinct Homepages
- **`index.html` (Home 1: Luxury Gift Store)**: Full commercial storefront with hero banner, dual CTAs, shop by occasion grid, trending collections, signature gift box builder spotlight, bestsellers grid, client reviews, Instagram gallery, VIP newsletter.
- **`home-premium.html` (Home 2: Editorial Luxury Experience)**: High-fashion editorial lookbook aesthetic ("The Art of Giving, Perfected.") with full-width cinematic hero, asymmetric image layouts, large typography, and interactive sensory palette switcher.

### 9. Dark Mode & RTL Support
- One-click Dark Mode toggle (Midnight Dark `#10151F` vs Warm Ivory `#FAF8F3`) persisted in `localStorage`.
- One-click RTL toggle (`dir="rtl"` vs `dir="ltr"`) persisted in `localStorage`.

### 10. Slide-In Cart & Wishlist Drawers (Shared Across All Pages)
- Cart Drawer: live subtotal, promo code coupon system (`LUXE10` for 10% privilege, `VIPGOLD` for 15%), complimentary packaging progress bar, and full checkout demonstration modal with simulated order receipts.
- Wishlist Drawer: live saved favorites, badge counters, and "Move to Bag" controls.

---

## 📂 Project Directory Structure

```
LuxeNest/
├── index.html                   # Home 1: Luxury Gift Store
├── home-premium.html            # Home 2: Editorial Luxury Experience
├── about.html                   # About Us, Story, Philosophy, Master Artisans
├── pricing.html                 # Packages: Classic (₹999), Premium (₹1,999), Signature (₹3,999)
├── contact.html                 # Contact Concierge, Flagship Addresses, Map Placeholder
├── 404.html                     # Luxury Page Not Found
├── coming-soon.html             # Exclusive Holiday Collection Countdown
├── maintenance.html             # Concierge Maintenance Notice
├── shop/
│   ├── products.html            # Catalog with search, category filters, price slider, sorting
│   ├── product-details.html     # Single product view with gallery, specs, tabs, reviews
│   ├── categories.html          # Browse all 8 categories
│   └── collections.html         # Curated Themed Collections
├── customization/
│   ├── build-gift-box.html      # Signature 3-column Custom Gift Box Builder
│   ├── personalized-gifts.html  # Live Personalization Studio
│   ├── gift-wrapping.html       # Luxury Wrapping & Ribbon Studio
│   ├── greeting-card.html       # Digital Greeting Card Designer
│   └── corporate-gifts.html     # Corporate Bulk Gift Customizer
├── services/
│   ├── services.html            # Bespoke Concierge Services Overview
│   └── service-details.html     # Deep dive into individual service packages
├── blog/
│   ├── blog.html                # The Gifting Journal (Articles & Guides)
│   └── blog-details.html        # Editorial Article with pull quotes
└── assets/
    ├── css/
    │   ├── input.css            # Tailwind base input
    │   └── style.css            # Custom luxury gradients, ribbons, 3D flip, wax seals
    ├── js/
    │   ├── theme.js             # Theme, RTL, Toasts & Currency engine
    │   ├── products.js          # Product data loader, card generator, quick view modal
    │   ├── cart.js              # Shopping cart drawer & demo checkout modal
    │   ├── wishlist.js          # Private wishlist drawer & persistence
    │   ├── search.js            # Instant predictive search modal
    │   ├── gift-preview.js      # 3D gift box rendering & unboxing animation
    │   ├── gift-builder.js      # 3-column customization state & budget tracker
    │   ├── personalization.js   # Live engraving simulator
    │   ├── wrapping.js          # Wrapping paper & wax stamp visualizer
    │   ├── validation.js        # Contact, corporate, and auth form validation
    │   └── main.js              # Navigation drawers, surprise gift modal, AOS & Lucide init
    └── data/
        ├── products.json        # 24+ luxury gifts across 8 categories
        └── categories.json      # Complete category directory
```

---

## 🚀 How to Run the Website

This is a pure frontend implementation using standard HTML5, Tailwind CSS, JavaScript, and LocalStorage. **No Node.js backend, React compilation, or database configuration is required.**

1. Simply open `index.html` in any modern web browser (Chrome, Edge, Safari, Firefox).
2. Alternatively, serve via any lightweight static server:
   ```bash
   # Using Python 3:
   python -m http.server 8000
   
   # Or using Node npx:
   npx serve .
   ```
3. Navigate to `http://localhost:8000` to enjoy the LuxeNest boutique experience.
