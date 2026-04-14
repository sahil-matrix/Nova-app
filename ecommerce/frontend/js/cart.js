// =====================
// NOVA SHOP — CART JS
// =====================

function getCart() {
  return JSON.parse(localStorage.getItem('nova_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('nova_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  let cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
  }
  saveCart(cart);
  renderCart();
  updateCartCount();
  showToast(`🛒 ${product.name} added to cart!`);
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function changeQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function clearCart() {
  saveCart([]);
  renderCart();
  updateCartCount();
}

function getCartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

function updateCartCount() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = total > 0 ? total : '';
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  const headerCount = document.getElementById('cart-header-count');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  if (headerCount) headerCount.textContent = `(${totalQty})`;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
        <a href="products.html" class="btn-outline">Browse Products</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  if (footer) footer.style.display = 'block';
}

function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function proceedToCheckout() {
  if (getCart().length === 0) { showToast('Your cart is empty!'); return; }
  window.location.href = 'checkout.html';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Cart toggle init — runs on every page
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();

  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
});
