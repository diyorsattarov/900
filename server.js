const express = require('express');
const path = require('path');
const logger = require('./logger'); // Adjust the path as needed

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('static'));

// Middleware to log requests
app.use((req, res, next) => {
    logger.info(`Request made to: ${req.method} ${req.url}`);
    next();
});

// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});

// About page route
app.get('/about', (req, res) => {
    res.render('about');
});

// Contact page route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Contact page route
app.get('/products', (req, res) => {
    res.render('products');
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
