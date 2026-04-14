// =====================
// NOVA SHOP — BACKEND SERVER
// Node.js + Express REST API
// =====================

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== IN-MEMORY DATA STORE =====
// In production, replace with a real database (MongoDB, PostgreSQL, etc.)
let orders = [];
let users = [];
let nextOrderId = 1000;

const PRODUCTS = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'electronics', price: 129.99, oldPrice: 179.99, rating: 4.8, reviews: 2341, emoji: '🎧', badge: 'Bestseller', stock: 45 },
  { id: 2, name: 'Ultra-Slim Laptop Pro 14"', category: 'electronics', price: 899.00, oldPrice: 1099.00, rating: 4.7, reviews: 876, emoji: '💻', badge: 'Sale', stock: 12 },
  { id: 3, name: 'Smart Watch Series X', category: 'electronics', price: 249.99, oldPrice: 299.99, rating: 4.6, reviews: 1543, emoji: '⌚', badge: 'New', stock: 30 },
  { id: 4, name: '4K OLED Gaming Monitor', category: 'electronics', price: 449.99, oldPrice: 549.99, rating: 4.9, reviews: 623, emoji: '🖥️', badge: null, stock: 8 },
  { id: 5, name: 'True Wireless Earbuds Pro', category: 'electronics', price: 89.99, oldPrice: 119.99, rating: 4.5, reviews: 3201, emoji: '🎵', badge: 'Hot', stock: 60 },
  { id: 6, name: 'Portable Bluetooth Speaker', category: 'electronics', price: 59.99, oldPrice: null, rating: 4.4, reviews: 921, emoji: '🔊', badge: null, stock: 25 },
  { id: 7, name: 'Mechanical Gaming Keyboard RGB', category: 'electronics', price: 109.99, oldPrice: 139.99, rating: 4.7, reviews: 1102, emoji: '⌨️', badge: 'Sale', stock: 18 },
  { id: 8, name: 'Premium Leather Jacket', category: 'fashion', price: 189.99, oldPrice: 249.99, rating: 4.8, reviews: 432, emoji: '🧥', badge: 'Trending', stock: 15 },
  { id: 9, name: 'Classic Slim-Fit Chinos', category: 'fashion', price: 59.99, oldPrice: null, rating: 4.5, reviews: 879, emoji: '👖', badge: null, stock: 40 },
  { id: 10, name: 'Designer Sneakers X1', category: 'fashion', price: 139.99, oldPrice: 179.99, rating: 4.7, reviews: 2134, emoji: '👟', badge: 'New', stock: 22 },
  { id: 11, name: 'Luxury Silk Scarf', category: 'fashion', price: 49.99, oldPrice: null, rating: 4.6, reviews: 543, emoji: '🧣', badge: null, stock: 50 },
  { id: 12, name: 'Minimalist Leather Wallet', category: 'fashion', price: 39.99, oldPrice: 54.99, rating: 4.9, reviews: 3421, emoji: '👛', badge: 'Sale', stock: 35 },
  { id: 13, name: 'Ceramic Pour-Over Coffee Set', category: 'home', price: 79.99, oldPrice: 99.99, rating: 4.8, reviews: 1234, emoji: '☕', badge: 'Popular', stock: 28 },
  { id: 14, name: 'Adjustable LED Desk Lamp', category: 'home', price: 44.99, oldPrice: null, rating: 4.6, reviews: 767, emoji: '💡', badge: 'New', stock: 33 },
  { id: 15, name: 'Bamboo Organizer Set', category: 'home', price: 34.99, oldPrice: 44.99, rating: 4.5, reviews: 892, emoji: '🪴', badge: null, stock: 44 },
  { id: 16, name: 'Scented Soy Candle Collection', category: 'home', price: 29.99, oldPrice: null, rating: 4.7, reviews: 1567, emoji: '🕯️', badge: null, stock: 70 },
  { id: 17, name: 'Vitamin C Brightening Serum', category: 'beauty', price: 49.99, oldPrice: 64.99, rating: 4.8, reviews: 2876, emoji: '✨', badge: 'Bestseller', stock: 55 },
  { id: 18, name: 'Retinol Night Cream Advanced', category: 'beauty', price: 54.99, oldPrice: null, rating: 4.7, reviews: 1432, emoji: '🌙', badge: 'New', stock: 20 },
  { id: 19, name: 'Hydrating Face Mask Set', category: 'beauty', price: 24.99, oldPrice: 34.99, rating: 4.5, reviews: 3209, emoji: '💆', badge: 'Sale', stock: 80 },
  { id: 20, name: 'Rose Hip Oil Elixir', category: 'beauty', price: 39.99, oldPrice: null, rating: 4.9, reviews: 987, emoji: '🌹', badge: null, stock: 30 },
  { id: 21, name: 'Premium Yoga Mat Pro', category: 'sports', price: 69.99, oldPrice: 89.99, rating: 4.8, reviews: 2341, emoji: '🧘', badge: 'Trending', stock: 40 },
  { id: 22, name: 'Adjustable Resistance Bands Set', category: 'sports', price: 29.99, oldPrice: null, rating: 4.6, reviews: 1876, emoji: '💪', badge: null, stock: 65 },
  { id: 23, name: 'Smart Jump Rope Counter', category: 'sports', price: 34.99, oldPrice: 44.99, rating: 4.5, reviews: 765, emoji: '⚡', badge: 'New', stock: 25 },
  { id: 24, name: 'Insulated Water Bottle 1L', category: 'sports', price: 24.99, oldPrice: null, rating: 4.7, reviews: 4321, emoji: '💧', badge: 'Bestseller', stock: 90 },
];

const PROMO_CODES = { 'NOVA10': 10, 'SAVE20': 20, 'WELCOME': 15 };

// ===== ROUTES =====

// Root — serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// GET /api/products — list all or filter
app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, minRating, sort, search, limit } = req.query;
  let result = [...PRODUCTS];

  if (category && category !== 'all') result = result.filter(p => p.category === category);
  if (minPrice) result = result.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= parseFloat(maxPrice));
  if (minRating) result = result.filter(p => p.rating >= parseFloat(minRating));
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
  }
  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') result.sort((a,b) => b.rating - a.rating);
  if (limit) result = result.slice(0, parseInt(limit));

  res.json({ success: true, count: result.length, products: result });
});

// GET /api/products/:id — single product
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, product });
});

// GET /api/recommendations — based on category
app.get('/api/recommendations', (req, res) => {
  const { category, excludeId, limit = 6 } = req.query;
  let pool = category ? PRODUCTS.filter(p => p.category === category) : PRODUCTS;
  if (excludeId) pool = pool.filter(p => p.id !== parseInt(excludeId));
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  res.json({ success: true, recommendations: shuffled.slice(0, parseInt(limit)) });
});

// GET /api/categories — list categories with count
app.get('/api/categories', (req, res) => {
  const categories = {};
  PRODUCTS.forEach(p => { categories[p.category] = (categories[p.category] || 0) + 1; });
  res.json({ success: true, categories });
});

// POST /api/validate-promo — validate promo code
app.post('/api/validate-promo', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, error: 'No code provided' });
  const discount = PROMO_CODES[code.toUpperCase()];
  if (discount) {
    res.json({ success: true, discount, message: `${discount}% discount applied!` });
  } else {
    res.status(400).json({ success: false, error: 'Invalid promo code' });
  }
});

// POST /api/orders — place order
app.post('/api/orders', (req, res) => {
  const { customer, items, promoCode, paymentMethod } = req.body;

  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Invalid order data' });
  }

  // Validate items and calculate total
  let subtotal = 0;
  const validatedItems = [];

  for (const item of items) {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return res.status(400).json({ success: false, error: `Product ${item.id} not found` });
    if (item.qty < 1) return res.status(400).json({ success: false, error: 'Invalid quantity' });
    subtotal += product.price * item.qty;
    validatedItems.push({ ...product, qty: item.qty, lineTotal: product.price * item.qty });
  }

  let discount = 0;
  if (promoCode && PROMO_CODES[promoCode.toUpperCase()]) {
    discount = PROMO_CODES[promoCode.toUpperCase()];
  }

  const total = subtotal - (subtotal * discount / 100);
  const orderId = `NOVA-${nextOrderId++}`;

  const order = {
    id: orderId,
    customer,
    items: validatedItems,
    subtotal: +subtotal.toFixed(2),
    discount,
    total: +total.toFixed(2),
    paymentMethod: paymentMethod || 'card',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  console.log(`✅ New order placed: ${orderId} — $${order.total}`);

  res.status(201).json({ success: true, order: { id: orderId, total: order.total, status: order.status } });
});

// GET /api/orders/:id — get order details
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
  res.json({ success: true, order });
});

// GET /api/health — health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), products: PRODUCTS.length, orders: orders.length });
});

// 404 for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// Catch-all: serve frontend for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 NOVA Shop backend running at http://localhost:${PORT}`);
  console.log(`📦 ${PRODUCTS.length} products loaded`);
  console.log(`📋 API endpoints:`);
  console.log(`   GET  /api/products`);
  console.log(`   GET  /api/products/:id`);
  console.log(`   GET  /api/recommendations`);
  console.log(`   GET  /api/categories`);
  console.log(`   POST /api/validate-promo`);
  console.log(`   POST /api/orders`);
  console.log(`   GET  /api/orders/:id`);
  console.log(`   GET  /api/health\n`);
});

module.exports = app;
