// =====================
// NOVA SHOP — CHECKOUT JS
// =====================

let currentStep = 1;
let discount = 0;

const PROMO_CODES = {
  'NOVA10': 10,
  'SAVE20': 20,
  'WELCOME': 15,
};

document.addEventListener('DOMContentLoaded', () => {
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'index.html';
    return;
  }
  renderOrderSummary();
  updateCartCount();
});

function renderOrderSummary() {
  const cart = getCart();
  const itemsEl = document.getElementById('order-summary-items');
  const subEl = document.getElementById('summary-sub');
  const totalEl = document.getElementById('summary-total');

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="order-item">
        <div class="order-item-emoji">${item.emoji}</div>
        <div class="order-item-info">
          <p>${item.name}</p>
          <span>Qty: ${item.qty}</span>
        </div>
        <div class="order-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `).join('');
  }

  const sub = getCartTotal();
  const total = sub - (sub * discount / 100);
  if (subEl) subEl.textContent = `$${sub.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function goToStep(step) {
  if (step === 2 && !validateStep1()) return;
  if (step === 3 && !validateStep2()) return;

  currentStep = step;

  // Show/hide step contents
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('step' + i);
    if (el) el.style.display = i === step ? 'block' : 'none';
    const tab = document.getElementById('step' + i + '-tab');
    if (tab) {
      tab.classList.remove('active', 'done');
      if (i === step) tab.classList.add('active');
      else if (i < step) tab.classList.add('done');
    }
  }

  if (step === 3) renderReviewStep();
}

function validateStep1() {
  const fields = ['fname', 'lname', 'email', 'address', 'city', 'zip'];
  for (const id of fields) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      el?.focus();
      showToast('Please fill in all shipping fields');
      return false;
    }
  }
  const email = document.getElementById('email').value;
  if (!/\S+@\S+\.\S+/.test(email)) {
    showToast('Please enter a valid email address');
    return false;
  }
  return true;
}

function validateStep2() {
  const cardNum = document.getElementById('card-number')?.value.replace(/\s/g,'');
  const expiry = document.getElementById('expiry')?.value;
  if (!cardNum || cardNum.length < 16) {
    showToast('Please enter a valid card number');
    return false;
  }
  if (!expiry || expiry.length < 5) {
    showToast('Please enter a valid expiry date');
    return false;
  }
  return true;
}

function renderReviewStep() {
  const cart = getCart();
  const el = document.getElementById('review-items');
  if (!el) return;

  const sub = getCartTotal();
  const total = sub - (sub * discount / 100);

  el.innerHTML = `
    ${cart.map(item => `
      <div class="review-item">
        <div class="review-item-left">
          <span class="review-item-emoji">${item.emoji}</span>
          <div>
            <div class="review-item-name">${item.name}</div>
            <div class="review-item-qty">Qty: ${item.qty}</div>
          </div>
        </div>
        <div class="review-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `).join('')}
    <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:1rem;padding-top:1rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;color:#888">
        <span>Subtotal</span><span>$${sub.toFixed(2)}</span>
      </div>
      ${discount > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;color:#2ecc71"><span>Discount (${discount}%)</span><span>-$${(sub*discount/100).toFixed(2)}</span></div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:1.1rem;font-weight:700">
        <span>Total</span><span style="color:#e94560">$${total.toFixed(2)}</span>
      </div>
    </div>
  `;
}

function placeOrder() {
  const orderId = 'NOVA-' + Date.now().toString(36).toUpperCase();
  document.getElementById('order-id-text').textContent = orderId;
  document.getElementById('success-modal').style.display = 'flex';
  clearCart();
}

function applyPromo() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  const msgEl = document.getElementById('promo-msg');
  if (PROMO_CODES[code]) {
    discount = PROMO_CODES[code];
    msgEl.textContent = `✅ Code applied! ${discount}% off`;
    msgEl.style.color = '#2ecc71';
    renderOrderSummary();
    showToast(`🎉 Promo code applied: ${discount}% off!`);
  } else {
    msgEl.textContent = '❌ Invalid promo code';
    msgEl.style.color = '#e94560';
  }
}

// Card number formatter
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
  input.value = val;
}
