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

// Serve static HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'UI')));

// Serve main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'UI', 'pages', 'index.html'));
});

// Define routes 
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;
