const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3001;
const DATA_DIR = path.join(__dirname, 'data');

const readJson = (fileName) => {
  const filePath = path.join(DATA_DIR, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
};

const dishes = readJson('dishes.json');
const categories = readJson('categories.json');
const profiles = readJson('profiles.json');
const promotions = readJson('promotions.json');
const cart = readJson('cart.json');
const orders = readJson('orders.json');

const logRequest = (req) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload, null, 2));
};

const routeHandlers = {
  '/api/home': () => ({
    message: 'FoodExpress home data',
    featured: promotions[0],
    dishes: dishes.slice(0, 6),
    categories,
    profile: profiles[0],
    cart,
    orders: orders.slice(0, 2),
  }),
  '/api/dishes': () => ({ dishes }),
  '/api/categories': () => ({ categories }),
  '/api/cart': () => ({ cart }),
  '/api/orders': () => ({ orders }),
  '/api/profile': () => ({ profile: profiles[0] }),
  '/api/promotions': () => ({ promotions }),
};

const server = http.createServer((req, res) => {
  try {
    logRequest(req);

    if (req.method === 'OPTIONS') {
      sendJson(res, 204, {});
      return;
    }

    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'Only GET requests are supported.' });
      return;
    }

    const url = new URL(req.url, 'http://localhost');
    const route = url.pathname.toLowerCase();
    const handler = routeHandlers[route];

    if (!handler) {
      sendJson(res, 404, { error: 'Route not found. Available routes: /api/home, /api/dishes, /api/categories, /api/cart, /api/orders, /api/profile, /api/promotions' });
      return;
    }

    const payload = handler();
    sendJson(res, 200, payload);
  } catch (error) {
    console.error('Server error:', error);
    sendJson(res, 500, { error: 'Internal server error.', details: error.message });
  }
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`FoodExpress backend running on http://localhost:${PORT}`);
});
