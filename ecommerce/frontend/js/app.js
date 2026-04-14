// =====================
// NOVA SHOP — HOME APP JS
// =====================

let currentTab = 'all';
let wishlist = getWishlist();

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured('all');
  renderRecommendations();
  initSearch();
});

function renderFeatured(category) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const prods = getProductsByCategory(category);
  grid.innerHTML = prods.slice(0, 8).map((p, i) => buildProductCard(p, i * 0.06)).join('');
  restoreWishlistUI();
}

function renderRecommendations() {
  const grid = document.getElementById('rec-grid');
  if (!grid) return;
  const recs = getRecommendations(null, null, 6);
  grid.innerHTML = recs.map((p, i) => buildProductCard(p, i * 0.06)).join('');
  restoreWishlistUI();
}

function restoreWishlistUI() {
  const wl = getWishlist();
  wl.forEach(id => {
    const btn = document.getElementById('wish-' + id);
    if (btn) { btn.classList.add('active'); btn.innerHTML = '<i class="fas fa-heart"></i>'; }
  });
}

function setTab(el, category) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentTab = category;
  renderFeatured(category);
}

function filterCategory(category) {
  // navigate to products page with filter
  window.location.href = `products.html?cat=${category}`;
}

// Search
function initSearch() {
  const toggle = document.getElementById('search-toggle');
  const close = document.getElementById('search-close');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  toggle?.addEventListener('click', () => {
    overlay.classList.add('open');
    input?.focus();
  });
  close?.addEventListener('click', () => overlay.classList.remove('open'));

  input?.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { results.innerHTML = ''; return; }
    const found = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    ).slice(0, 6);
    results.innerHTML = found.length
      ? found.map(p => `
          <div class="product-card" onclick="addToCart(${p.id}); document.getElementById('search-overlay').classList.remove('open')">
            <div class="product-img" style="height:100px;">${p.emoji}</div>
            <div class="product-info">
              <div class="product-name" style="font-size:0.82rem;">${p.name}</div>
              <div class="product-price">$${p.price.toFixed(2)}</div>
            </div>
          </div>`).join('')
      : `<p style="color:#888;text-align:center;padding:2rem">No products found for "${q}"</p>`;
  });
}
