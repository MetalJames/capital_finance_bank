const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
const User = require('../models/User'); // Your Mongoose User model

// Function to generate random account number
const generateAccountNumber = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB from authRoutes!");
    } catch (err) {
        console.error("Failed to connect to MongoDB from authRoutes", err);
    }
}

connectDB();

// POST /api/login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        // Find user by email
        const user = await collection.findOne({ email });

        // Check if user exists and compare passwords
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Successful login
        req.session.user = user; // Store user data in session
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, phone, unitNumber, streetAddress, city, province, postalCode, password } = req.body;
    // Generate random account number
    const accountNumber = generateAccountNumber();

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        // Check if the user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User ({
            firstName,
            lastName,
            email,
            phone,
            unitNumber,
            streetAddress,
            city,
            province,
            postalCode,
            password,
            accounts: [
                {
                    accountNumber: accountNumber.toString(), // Convert to string if needed
                    balance: 5000,
                    accountType: "Checking",
                    openDate: new Date()
                },
                {
                    accountNumber: accountNumber.toString() + '-SAV', // Append suffix to differentiate accounts
                    balance: 3000,
                    accountType: "Saving",
                    openDate: new Date()
                },
                {
                    accountNumber: accountNumber.toString() + '-CRD', // Append suffix to differentiate accounts
                    balance: 1000,
                    accountType: "Credit",
                    openDate: new Date()
                }
            ],
            transactions: [
                { id: 1, date: "2023-06-01", description: "Grocery Store", amount: -54.23 },
                { id: 2, date: "2023-06-02", description: "Salary", amount: 2000.00 },
                { id: 3, date: "2023-06-03", description: "Electricity Bill", amount: -123.45 },
            ],
            activities: [
                { id: 1, date: "2023-06-01", description: "Logged in from IP 123.456.789.000" },
                { id: 2, date: "2023-06-02", description: "Transferred $200 to Savings" },
                { id: 3, date: "2023-06-03", description: "Changed password" },
            ],
        });

        // Insert the new user into the collection
        await collection.insertOne(newUser);

        // Successful registration
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
