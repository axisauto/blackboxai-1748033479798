const admin = require('firebase-admin');

exports.handleNotifications = async (req, res) => {
  try {
    const { method } = req;

    if (method === 'POST') {
      const { token, title, body, data } = req.body;
      if (!token || !title || !body) {
        return res.status(400).json({ error: 'Missing token, title, or body' });
      }
      const message = {
        notification: {
          title,
          body,
        },
        data: data || {},
        token,
      };
      const response = await admin.messaging().send(message);
      return res.status(200).json({ messageId: response });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Notifications error:', error);
    return res.status(500).json({ error: error.message });
  }
};
