// =====================
// NOVA SHOP — PRODUCTS JS
// =====================

let maxPrice = 500;
let minRating = 0;

document.addEventListener('DOMContentLoaded', () => {
  // read URL params for category prefilter
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    // tick the right checkbox
    document.querySelectorAll('.sidebar-filter input[type=checkbox]').forEach(cb => {
      if (cb.value === cat) { cb.checked = true; }
      else if (cb.value === 'all') { cb.checked = false; }
    });
  }
  applyFilters();
  initSearch();
});

function applyFilters() {
  const checkedCats = [...document.querySelectorAll('.sidebar-filter input[type=checkbox]:checked')].map(c => c.value);
  maxPrice = parseInt(document.getElementById('price-range').value);
  minRating = parseFloat(document.querySelector('input[name=rating]:checked')?.value || 0);
  const sort = document.getElementById('sort-select').value;

  let filtered = PRODUCTS.filter(p => {
    const catMatch = checkedCats.includes('all') || checkedCats.length === 0 || checkedCats.includes(p.category);
    const priceMatch = p.price <= maxPrice;
    const ratingMatch = p.rating >= minRating;
    return catMatch && priceMatch && ratingMatch;
  });

  // Sort
  if (sort === 'price-low') filtered.sort((a,b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating);
  else if (sort === 'newest') filtered.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  renderProductGrid(filtered);
  document.getElementById('product-count').textContent = `Showing ${filtered.length} products`;
}

function renderProductGrid(products) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  if (products.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:#888"><i class="fas fa-search" style="font-size:3rem;margin-bottom:1rem;display:block;opacity:0.3"></i><p>No products match your filters.</p></div>`;
    return;
  }
  grid.innerHTML = products.map((p, i) => buildProductCard(p, i * 0.04)).join('');
  restoreWishlistUI();
}

function restoreWishlistUI() {
  const wl = getWishlist();
  wl.forEach(id => {
    const btn = document.getElementById('wish-' + id);
    if (btn) { btn.classList.add('active'); btn.innerHTML = '<i class="fas fa-heart"></i>'; }
  });
}

function updatePrice(input) {
  document.getElementById('price-val').textContent = input.value;
  applyFilters();
}

function resetFilters() {
  document.querySelectorAll('.sidebar-filter input[type=checkbox]').forEach(cb => { cb.checked = cb.value === 'all'; });
  document.querySelectorAll('input[name=rating]')[0].checked = true;
  document.getElementById('price-range').value = 500;
  document.getElementById('price-val').textContent = '500';
  document.getElementById('sort-select').value = 'default';
  applyFilters();
}

function initSearch() {
  const toggle = document.getElementById('search-toggle');
  const close = document.getElementById('search-close');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  toggle?.addEventListener('click', () => { overlay.classList.add('open'); input?.focus(); });
  close?.addEventListener('click', () => overlay.classList.remove('open'));

  input?.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { results.innerHTML = ''; return; }
    const found = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.includes(q) || p.tags.some(t=>t.includes(q))
    ).slice(0, 6);
    results.innerHTML = found.map(p => `
      <div class="product-card" onclick="addToCart(${p.id}); overlay.classList.remove('open')">
        <div class="product-img" style="height:100px;">${p.emoji}</div>
        <div class="product-info">
          <div class="product-name" style="font-size:0.82rem;">${p.name}</div>
          <div class="product-price">$${p.price.toFixed(2)}</div>
        </div>
      </div>`).join('') || `<p style="color:#888;text-align:center;padding:2rem">No results found</p>`;
  });
}
