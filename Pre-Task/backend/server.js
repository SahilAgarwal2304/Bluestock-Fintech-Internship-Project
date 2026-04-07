const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const db = require('./src/config/db'); // Points to your existing db.js

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Allow frontend connection
app.use(express.json()); // Parse JSON data

// 1. Simple Test Route
app.get('/', (req, res) => {
  res.send('✅ Bluestock Backend is Running!');
});

// 2. Database Connection Test Route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ 
      success: true, 
      message: 'Database connected successfully', 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
});