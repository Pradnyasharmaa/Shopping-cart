const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Read products from JSON file
const getProducts = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'items.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading items.json:', error);
    return [];
  }
};

// API Routes

// GET /api/products - Return hardcoded JSON list of products
app.get('/api/products', (req, res) => {
  try {
    const products = getProducts();
    console.log(`✅ Products fetched: ${products.length} items`);
    
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// POST /api/checkout - Accept cart data and log to console
app.post('/api/checkout', (req, res) => {
  try {
    const { cartItems } = req.body;
    
    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart data. Expected cartItems array.'
      });
    }

    // Log order to console (as required by project specs)
    console.log('\n🛒 NEW ORDER RECEIVED:');
    console.log('='.repeat(50));
    console.log('📅 Date:', new Date().toLocaleString());
    console.log('📦 Items:');
    
    let totalAmount = 0;
    const products = getProducts();
    
    cartItems.forEach(item => {
      const product = products.find(p => p.id === item.id);
      const itemTotal = (product?.price || 0) * item.quantity;
      totalAmount += itemTotal;
      
      console.log(`   • ${product?.name || 'Unknown Product'} (ID: ${item.id})`);
      console.log(`     Quantity: ${item.quantity} x ₹${product?.price || 0} = ₹${itemTotal}`);
    });
    
    console.log('💰 Total Amount: ₹' + totalAmount);
    console.log('='.repeat(50));
    console.log('✅ Order logged successfully!\n');

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: `ORDER-${Date.now()}`,
      totalAmount: totalAmount,
      itemCount: cartItems.length
    });

  } catch (error) {
    console.error('❌ Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Checkout failed. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚀 E-commerce Backend Server Started!');
  console.log('='.repeat(40));
  console.log(`🛍️  Products API: http://localhost:${PORT}/api/products`);
  console.log(`💳 Checkout API: http://localhost:${PORT}/api/checkout`);
  console.log('='.repeat(40));
});

module.exports = app;