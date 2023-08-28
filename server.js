const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line
const logger = require('./logger'); // Adjust the path as needed
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add this line

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('static'));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

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

// Products page route
app.get('/products', (req, res) => {
    res.render('products');
});

// Payment handling route
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { items } = req.body; // Assuming you're sending product details in the request body
        // Calculate total amount based on items

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateTotalAmount(items), // Replace with your logic
            currency: 'usd', // Replace with your desired currency
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Helper function to calculate total amount based on items
function calculateTotalAmount(items) {
    // Implement your logic to calculate the total amount based on items
    // Example: return items.reduce((total, item) => total + item.price, 0);
	return 3000;
}

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
