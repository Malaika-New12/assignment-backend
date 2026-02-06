require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://assignment-front-end-malaika.netlify.app'],
    credentials: true
}));
app.use(express.json());

// Health check route (root)
app.get('/', (req, res) => {
    res.json({ message: 'Backend API is running!', status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection (only connect once)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Connect to DB
connectDB();

// Export for Vercel
module.exports = app;
