const dotenv = require('dotenv');
dotenv.config();
const pool = require('./model/pool');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define routes 
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling route 
// 404 handler
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'views', '404.html');
    res.status(404).sendFile(filePath);
});

// General error handler
app.use((err, req, res, next) => {
    const code = err.status || 500;
    const filePath = path.join(__dirname, 'views', `${code}.html`);
    res.status(code).sendFile(filePath);
});

module.exports = app;
