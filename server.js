const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line
const logger = require('./logger'); // Adjust the path as needed
const stripe = require('stripe')('sk_test_51NjyTTLWuSm1CyQDFfJMmRoXUPyWFbBUeSSkcNERcgDjQgNsUlhhPnz7kw4nzhj9VxlRwGSWFouyBVOF6BK7HBub00gdQGjrct');

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
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1Nk06mLWuSm1CyQDSzbEvhtQ', // Replace with your actual price ID
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        });

        res.json({ redirectUrl: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error.message);
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
