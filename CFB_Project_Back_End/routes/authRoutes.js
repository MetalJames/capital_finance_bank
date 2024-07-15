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

router.post('/transfer', async (req, res) => {
    const { fromAccountNumber, toAccountNumber, amount } = req.body;

    console.log('Transfer request received:', { fromAccountNumber, toAccountNumber, amount });

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        // Find the user by their email
        const user = await collection.findOne({ email: 'volodyaruzhak@gmail.com' });

        console.log('User found:', user); // Log user object to inspect accounts

        // Validate accounts and transfer amount
        const fromAccount = user.accounts.find(acc => acc.accountType === fromAccountNumber);
        const toAccount = user.accounts.find(acc => acc.accountType === toAccountNumber);

        if (!fromAccount || !toAccount) {
            console.error('Invalid account types');
            return res.status(400).json({ message: 'Invalid account types' });
        }

        if (fromAccount.balance < amount) {
            console.error('Insufficient funds');
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Perform the transfer
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        // Update the user's accounts in MongoDB
        await collection.updateOne(
            { email: 'volodyaruzhak@gmail.com' },
            { $set: { accounts: user.accounts } }
        );

        // Log the transaction (optional)
        const transaction = {
            id: user.transactions.length + 1,
            date: new Date().toISOString(),
            description: `Transfer from ${fromAccount.accountType} to ${toAccount.accountType}`,
            amount: -amount,
        };
        user.transactions.push(transaction);

        await collection.updateOne(
            { email: 'volodyaruzhak@gmail.com' },
            { $set: { transactions: user.transactions } }
        );

        console.log('Transfer successful:', transaction);
        res.status(200).json({ message: 'Transfer successful', transaction });
    } catch (err) {
        console.error('Transfer error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
