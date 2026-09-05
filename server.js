const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/foodAppDB')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Updated Order Schema with Address, Phone & Payment Info
const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  phone: String,
  address: String,
  city: String,
  paymentMethod: String,
  items: Array,
  totalBill: Number,
  status: { type: String, default: 'Pending' },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Endpoint to Save Order with Checkout details
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerEmail, phone, address, city, paymentMethod, items, totalBill } = req.body;
    
    const newOrder = new Order({
      customerName,
      customerEmail,
      phone,
      address,
      city,
      paymentMethod,
      items,
      totalBill
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order saved to MongoDB!', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save order', error: error.message });
  }
});

// User ke specific orders fetch karne ka route
app.get('/api/orders/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));