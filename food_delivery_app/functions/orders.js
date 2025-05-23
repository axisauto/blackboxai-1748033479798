const admin = require('firebase-admin');
const db = admin.firestore();

exports.handleOrders = async (req, res) => {
  try {
    const { method } = req;
    const collection = db.collection('orders');

    if (method === 'GET') {
      // Get orders by user role and id query params
      const { role, userId } = req.query;
      if (!role || !userId) {
        return res.status(400).json({ error: 'Missing role or userId parameter' });
      }
      let query = collection;
      if (role === 'restaurant_owner') {
        query = query.where('restaurantOwnerId', '==', userId);
      } else if (role === 'delivery_personnel') {
        query = query.where('deliveryPersonnelId', '==', userId);
      } else if (role === 'customer') {
        query = query.where('customerId', '==', userId);
      } else {
        return res.status(400).json({ error: 'Invalid role' });
      }
      const snapshot = await query.get();
      const orders = [];
      snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return res.status(200).json(orders);
    } else if (method === 'POST') {
      // Place new order
      const data = req.body;
      const docRef = await collection.add(data);
      return res.status(201).json({ id: docRef.id });
    } else if (method === 'PUT') {
      // Update order status
      const { id, status } = req.body;
      if (!id || !status) {
        return res.status(400).json({ error: 'Missing id or status in request body' });
      }
      const docRef = collection.doc(id);
      await docRef.update({ status });
      return res.status(200).json({ id, status });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Orders error:', error);
    return res.status(500).json({ error: error.message });
  }
};
