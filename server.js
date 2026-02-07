require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://assignment-front-end-malaika.netlify.app'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection Strategy
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Trigger initial connection (for warm starts)
connectDB().catch(err => console.error('Initial connection failed', err));

// Database Connection Middleware
app.use(async (req, res, next) => {
  // Skip DB check for health check and preflight
  if (req.path === '/' || req.method === 'OPTIONS') return next();

  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection failed in middleware');
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!', status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Local Start
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app
module.exports = app;
