# 🛍️ NOVA Shop — E-Commerce Website

A full-stack intermediate e-commerce web app with product listings, smart recommendations, shopping cart, filters, and checkout.

---

## 🗂️ Project Structure

```
ecommerce/
├── frontend/
│   ├── index.html          ← Homepage with hero, categories, featured products
│   ├── products.html       ← Full shop with filters & sorting
│   ├── checkout.html       ← 3-step checkout (shipping → payment → review)
│   ├── about.html          ← About page
│   ├── css/
│   │   ├── style.css       ← Main styles (dark editorial theme)
│   │   ├── cart.css        ← Cart sidebar styles
│   │   └── checkout.css    ← Checkout page styles
│   └── js/
│       ├── data.js         ← Product data + shared helpers
│       ├── cart.js         ← Cart logic (localStorage)
│       ├── app.js          ← Homepage logic
│       ├── products.js     ← Products page (filter, sort)
│       └── checkout.js     ← Checkout multi-step form
│
├── backend/
│   └── server.js           ← Node.js + Express REST API
│
├── package.json
└── README.md
```

---

## ✨ Features

### Frontend
- **Dark editorial design** with Syne + DM Sans fonts
- **Homepage**: Hero section, category browser, featured products, recommendations
- **Products page**: Sidebar filters (category, price, rating), sorting, live count
- **Shopping cart**: Slide-in sidebar, add/remove/change qty, persists in localStorage
- **Wishlist**: Heart icon per product, persists in localStorage
- **Search**: Overlay search with live results
- **Checkout**: 3-step form (shipping → payment → review), promo codes, order success modal
- **Promo codes**: NOVA10, SAVE20, WELCOME
- **Responsive**: Mobile-friendly layout

### Backend (Node.js + Express)
- `GET /api/products` — list all products with filters (category, price, rating, search, sort)
- `GET /api/products/:id` — single product detail
- `GET /api/recommendations` — randomised recommendations by category
- `GET /api/categories` — category list with counts
- `POST /api/validate-promo` — validate promo codes
- `POST /api/orders` — place order (validates items + calculates total)
- `GET /api/orders/:id` — fetch order by ID
- `GET /api/health` — health check

---

## 🚀 Getting Started

### Option A — Frontend Only (No Node.js required)

Just open `frontend/index.html` directly in your browser. Everything works with localStorage — no server needed.

### Option B — Full Stack (with Backend API)

**Requirements**: Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start
# OR for auto-reload during development:
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## 🔧 Customisation

### Add Products
Edit the `PRODUCTS` array in both:
- `frontend/js/data.js` (frontend display)
- `backend/server.js` (API)

### Change Theme Colors
Edit CSS variables in `frontend/css/style.css`:
```css
:root {
  --bg: #0d0d14;
  --accent: #e94560;   /* ← main accent colour */
  --card-bg: #16162a;
}
```

### Add Promo Codes
In `backend/server.js` and `frontend/js/checkout.js`:
```js
const PROMO_CODES = {
  'NOVA10': 10,   // 10% off
  'SAVE20': 20,   // 20% off
  'YOURCODE': 30, // ← add yours
};
```

### Connect a Real Database
Replace the in-memory `PRODUCTS` and `orders` arrays in `backend/server.js` with your preferred database:
- **MongoDB**: use `mongoose`
- **PostgreSQL**: use `pg` or `prisma`
- **SQLite**: use `better-sqlite3`

---

## 📱 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` or `index.html` | Hero, categories, featured, recommendations |
| Shop | `/products.html` | All products with filters & sort |
| Checkout | `/checkout.html` | 3-step checkout flow |
| About | `/about.html` | Brand story & values |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend HTML | Semantic HTML5 |
| Styling | Vanilla CSS (custom properties, grid, flexbox) |
| Frontend JS | Vanilla ES6+ (no framework) |
| Backend | Node.js + Express.js |
| Fonts | Google Fonts (Syne + DM Sans) |
| Icons | Font Awesome 6 |
| Data persistence | localStorage (cart + wishlist) |

---

## 💡 Next Steps (to make it production-ready)

1. **Database**: Connect MongoDB or PostgreSQL
2. **Auth**: Add user login/signup (JWT or sessions)
3. **Payments**: Integrate Stripe or Razorpay
4. **Images**: Replace emoji with real product images
5. **Admin panel**: Add product management dashboard
6. **Email**: Send order confirmation emails (Nodemailer)
7. **Deployment**: Deploy to Vercel (frontend) + Railway (backend)

---

Made with ❤️ by NOVA Shop
