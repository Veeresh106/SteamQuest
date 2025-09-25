const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();
const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// This tells Express to serve all static files from the 'public' folder
app.use(express.static('public'));

// PostgreSQL Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// --- API ROUTES ---
// (All your '/api/...' routes remain the same)
app.post('/api/users/register', async (req, res) => { /* ... */ });
app.post('/api/users/login', async (req, res) => { /* ... */ });
app.get('/api/dashboard', authMiddleware, async (req, res) => { /* ... */ });
app.get('/api/class/:class_level/content', authMiddleware, async (req, res) => { /* ... */ });
app.get('/api/book/:book_id/pages', authMiddleware, async (req, res) => { /* ... */ });
app.get('/api/quiz/:quiz_id', authMiddleware, async (req, res) => { /* ... */ });
app.post('/api/quiz/submit', authMiddleware, async (req, res) => { /* ... */ });


// --- ROUTES to SERVE HTML pages ---
// This final catch-all route is very important.
// It sends the main index.html file for any request that doesn't match an API route or a static file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});