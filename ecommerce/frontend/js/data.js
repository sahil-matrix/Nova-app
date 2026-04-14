// =====================
// NOVA SHOP — PRODUCT DATA
// =====================

const PRODUCTS = [
  // ELECTRONICS
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'electronics', price: 129.99, oldPrice: 179.99, rating: 4.8, reviews: 2341, emoji: '🎧', badge: 'Bestseller', tags: ['audio', 'wireless', 'premium'], isNew: false },
  { id: 2, name: 'Ultra-Slim Laptop Pro 14"', category: 'electronics', price: 899.00, oldPrice: 1099.00, rating: 4.7, reviews: 876, emoji: '💻', badge: 'Sale', tags: ['laptop', 'work', 'portable'], isNew: false },
  { id: 3, name: 'Smart Watch Series X', category: 'electronics', price: 249.99, oldPrice: 299.99, rating: 4.6, reviews: 1543, emoji: '⌚', badge: 'New', tags: ['watch', 'fitness', 'smart'], isNew: true },
  { id: 4, name: '4K OLED Gaming Monitor', category: 'electronics', price: 449.99, oldPrice: 549.99, rating: 4.9, reviews: 623, emoji: '🖥️', badge: null, tags: ['monitor', 'gaming', '4k'], isNew: false },
  { id: 5, name: 'True Wireless Earbuds Pro', category: 'electronics', price: 89.99, oldPrice: 119.99, rating: 4.5, reviews: 3201, emoji: '🎵', badge: 'Hot', tags: ['earbuds', 'wireless', 'music'], isNew: false },
  { id: 6, name: 'Portable Bluetooth Speaker', category: 'electronics', price: 59.99, oldPrice: null, rating: 4.4, reviews: 921, emoji: '🔊', badge: null, tags: ['speaker', 'bluetooth', 'portable'], isNew: true },
  { id: 7, name: 'Mechanical Gaming Keyboard RGB', category: 'electronics', price: 109.99, oldPrice: 139.99, rating: 4.7, reviews: 1102, emoji: '⌨️', badge: 'Sale', tags: ['keyboard', 'gaming', 'rgb'], isNew: false },

  // FASHION
  { id: 8, name: 'Premium Leather Jacket', category: 'fashion', price: 189.99, oldPrice: 249.99, rating: 4.8, reviews: 432, emoji: '🧥', badge: 'Trending', tags: ['jacket', 'leather', 'style'], isNew: false },
  { id: 9, name: 'Classic Slim-Fit Chinos', category: 'fashion', price: 59.99, oldPrice: null, rating: 4.5, reviews: 879, emoji: '👖', badge: null, tags: ['pants', 'casual', 'slim'], isNew: false },
  { id: 10, name: 'Designer Sneakers X1', category: 'fashion', price: 139.99, oldPrice: 179.99, rating: 4.7, reviews: 2134, emoji: '👟', badge: 'New', tags: ['shoes', 'sneakers', 'designer'], isNew: true },
  { id: 11, name: 'Luxury Silk Scarf', category: 'fashion', price: 49.99, oldPrice: null, rating: 4.6, reviews: 543, emoji: '🧣', badge: null, tags: ['scarf', 'silk', 'luxury'], isNew: false },
  { id: 12, name: 'Minimalist Leather Wallet', category: 'fashion', price: 39.99, oldPrice: 54.99, rating: 4.9, reviews: 3421, emoji: '👛', badge: 'Sale', tags: ['wallet', 'leather', 'minimal'], isNew: false },

  // HOME & LIVING
  { id: 13, name: 'Ceramic Pour-Over Coffee Set', category: 'home', price: 79.99, oldPrice: 99.99, rating: 4.8, reviews: 1234, emoji: '☕', badge: 'Popular', tags: ['coffee', 'ceramic', 'kitchen'], isNew: false },
  { id: 14, name: 'Adjustable LED Desk Lamp', category: 'home', price: 44.99, oldPrice: null, rating: 4.6, reviews: 767, emoji: '💡', badge: 'New', tags: ['lamp', 'desk', 'led'], isNew: true },
  { id: 15, name: 'Bamboo Organizer Set', category: 'home', price: 34.99, oldPrice: 44.99, rating: 4.5, reviews: 892, emoji: '🪴', badge: null, tags: ['organizer', 'bamboo', 'eco'], isNew: false },
  { id: 16, name: 'Scented Soy Candle Collection', category: 'home', price: 29.99, oldPrice: null, rating: 4.7, reviews: 1567, emoji: '🕯️', badge: null, tags: ['candle', 'scented', 'home'], isNew: false },

  // BEAUTY
  { id: 17, name: 'Vitamin C Brightening Serum', category: 'beauty', price: 49.99, oldPrice: 64.99, rating: 4.8, reviews: 2876, emoji: '✨', badge: 'Bestseller', tags: ['serum', 'vitamin-c', 'skincare'], isNew: false },
  { id: 18, name: 'Retinol Night Cream Advanced', category: 'beauty', price: 54.99, oldPrice: null, rating: 4.7, reviews: 1432, emoji: '🌙', badge: 'New', tags: ['cream', 'retinol', 'anti-aging'], isNew: true },
  { id: 19, name: 'Hydrating Face Mask Set (5pk)', category: 'beauty', price: 24.99, oldPrice: 34.99, rating: 4.5, reviews: 3209, emoji: '💆', badge: 'Sale', tags: ['mask', 'hydrating', 'skincare'], isNew: false },
  { id: 20, name: 'Rose Hip Oil Elixir', category: 'beauty', price: 39.99, oldPrice: null, rating: 4.9, reviews: 987, emoji: '🌹', badge: null, tags: ['oil', 'rosehip', 'natural'], isNew: false },

  // SPORTS
  { id: 21, name: 'Premium Yoga Mat Pro', category: 'sports', price: 69.99, oldPrice: 89.99, rating: 4.8, reviews: 2341, emoji: '🧘', badge: 'Trending', tags: ['yoga', 'mat', 'fitness'], isNew: false },
  { id: 22, name: 'Adjustable Resistance Bands Set', category: 'sports', price: 29.99, oldPrice: null, rating: 4.6, reviews: 1876, emoji: '💪', badge: null, tags: ['resistance', 'bands', 'home-gym'], isNew: false },
  { id: 23, name: 'Smart Jump Rope Counter', category: 'sports', price: 34.99, oldPrice: 44.99, rating: 4.5, reviews: 765, emoji: '⚡', badge: 'New', tags: ['jump-rope', 'cardio', 'smart'], isNew: true },
  { id: 24, name: 'Insulated Water Bottle 1L', category: 'sports', price: 24.99, oldPrice: null, rating: 4.7, reviews: 4321, emoji: '💧', badge: 'Bestseller', tags: ['bottle', 'hydration', 'insulated'], isNew: false },
];

// Get products by category
function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === cat);
}

// Get recommendations based on category or random
function getRecommendations(excludeId = null, category = null, count = 6) {
  let pool = category ? PRODUCTS.filter(p => p.category === category) : PRODUCTS;
  if (excludeId) pool = pool.filter(p => p.id !== excludeId);
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Render stars
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  return s;
}

// Build product card HTML
function buildProductCard(product, delay = 0) {
  return `
    <div class="product-card" style="animation-delay:${delay}s" onclick="viewProduct(${product.id})">
      <div class="product-img">
        <span>${product.emoji}</span>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="product-wishlist" id="wish-${product.id}" onclick="event.stopPropagation(); toggleWishlist(${product.id})" title="Wishlist">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            $${product.price.toFixed(2)}
            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}

// Wishlist in localStorage
function getWishlist() { return JSON.parse(localStorage.getItem('nova_wishlist') || '[]'); }
function toggleWishlist(id) {
  let wl = getWishlist();
  const btn = document.getElementById('wish-' + id);
  if (wl.includes(id)) {
    wl = wl.filter(x => x !== id);
    if (btn) { btn.classList.remove('active'); btn.innerHTML = '<i class="far fa-heart"></i>'; }
    showToast('Removed from wishlist');
  } else {
    wl.push(id);
    if (btn) { btn.classList.add('active'); btn.innerHTML = '<i class="fas fa-heart"></i>'; }
    showToast('❤️ Added to wishlist!');
  }
  localStorage.setItem('nova_wishlist', JSON.stringify(wl));
}

function viewProduct(id) {
  // In a full app this navigates to product detail
  const p = PRODUCTS.find(x => x.id === id);
  if (p) showToast(`👀 Viewing: ${p.name}`);
}
