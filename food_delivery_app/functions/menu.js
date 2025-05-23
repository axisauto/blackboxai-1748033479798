const admin = require('firebase-admin');
const db = admin.firestore();

exports.handleMenu = async (req, res) => {
  try {
    const { method } = req;
    const collection = db.collection('menuItems');

    if (method === 'GET') {
      // Get menu items by delivery slot query param
      const slot = req.query.slot;
      let query = collection;
      if (slot) {
        query = query.where('deliverySlots', 'array-contains', slot);
      }
      const snapshot = await query.get();
      const items = [];
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return res.status(200).json(items);
    } else if (method === 'POST') {
      // Add or update menu item
      const data = req.body;
      if (!data.id) {
        // Add new menu item
        const docRef = await collection.add(data);
        return res.status(201).json({ id: docRef.id });
      } else {
        // Update existing menu item
        const docRef = collection.doc(data.id);
        await docRef.set(data, { merge: true });
        return res.status(200).json({ id: data.id });
      }
    } else if (method === 'DELETE') {
      // Delete menu item by id
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
      }
      await collection.doc(id).delete();
      return res.status(200).json({ message: 'Menu item deleted' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Menu error:', error);
    return res.status(500).json({ error: error.message });
  }
};
