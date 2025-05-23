const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const auth = require('./auth');
const menu = require('./menu');
const orders = require('./orders');
const notifications = require('./notifications');

exports.api = functions.https.onRequest((req, res) => {
  // Basic routing for API endpoints
  const path = req.path.toLowerCase();

  if (path.startsWith('/auth')) {
    return auth.handleAuth(req, res);
  } else if (path.startsWith('/menu')) {
    return menu.handleMenu(req, res);
  } else if (path.startsWith('/orders')) {
    return orders.handleOrders(req, res);
  } else if (path.startsWith('/notifications')) {
    return notifications.handleNotifications(req, res);
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
});
