const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});

// About page route
app.get('/about', (req, res) => {
    res.render('about'); // Create an "about.ejs" view template
});

// Contact page route
app.get('/contact', (req, res) => {
    res.render('contact'); // Create a "contact.ejs" view template
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});