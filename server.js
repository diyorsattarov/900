const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./logger'); 
const stripe = require('stripe')('sk_test_51NjyTTLWuSm1CyQDFfJMmRoXUPyWFbBUeSSkcNERcgDjQgNsUlhhPnz7kw4nzhj9VxlRwGSWFouyBVOF6BK7HBub00gdQGjrct');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.info(`Request made to: ${req.method} ${req.url}`);
    next();
});
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    if (req.query.success === 'true') {
        res.render('success');
    } else if (req.query.canceled === 'true') {
        res.render('cancel');
    } else {
        res.render('index');
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/products', (req, res) => {
    res.render('products');
});

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
        res.render('checkout-page', { redirectUrl: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
