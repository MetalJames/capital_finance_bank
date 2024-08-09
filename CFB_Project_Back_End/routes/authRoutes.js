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
        const newUser = {
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
        };

        // Insert the new user into the collection
        await collection.insertOne(newUser);

        // Successful registration
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Forgot Password
router.get('/forgot-password', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Email query parameter is required' });
    }

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');
        const users = await collection.find({}).toArray();
        const user = users.find(user => user.email === email);

        if (user) {
            res.json({ password: user.password });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT /api/updateUser:email route
router.put('/user/:email', async (req, res) => {
    const { email } = req.params;
    const { firstName, lastName, phone, unitNumber, streetAddress, city, province, postalCode, password } = req.body;

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            phone: phone || user.phone,
            unitNumber: unitNumber || user.unitNumber,
            streetAddress: streetAddress || user.streetAddress,
            city: city || user.city,
            province: province || user.province,
            postalCode: postalCode || user.postalCode,
            password: password || user.password
        };

        await collection.updateOne(
            { email: email },
            { $set: updatedUser }
        );

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Update user error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /api/deleteUser route
router.delete('/user/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        const result = await collection.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Destroy session after deletion
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Failed to clear session' });
            }

            res.status(200).json({ message: 'User deleted and session cleared' });
        });

        //res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/// POST /api/transfer route
// router.post('/transfer', async (req, res) => {
//     const { fromAccountNumber, toAccountNumber, amount } = req.body;

//     console.log('Transfer request received:', { fromAccountNumber, toAccountNumber, amount });

//     try {
//         const database = client.db('sample_mflix');
//         const collection = database.collection('bankData');

//         // Find the user by their email
//         const user = await collection.findOne({ email: 'volodyaruzhak@gmail.com' });

//         console.log('User found:', user); // Log user object to inspect accounts

//         // Validate accounts and transfer amount
//         const fromAccount = user.accounts.find(acc => acc.accountType === fromAccountNumber);
//         const toAccount = user.accounts.find(acc => acc.accountType === toAccountNumber);

//         if (!fromAccount || !toAccount) {
//             console.error('Invalid account types');
//             return res.status(400).json({ message: 'Invalid account types' });
//         }

//         const parsedAmount = parseFloat(amount);

//         if (isNaN(parsedAmount) || fromAccount.balance < parsedAmount) {
//             console.error('Insufficient funds or invalid amount');
//             return res.status(400).json({ message: 'Insufficient funds or invalid amount' });
//         }

//         // Perform the transfer
//         fromAccount.balance = Number(fromAccount.balance) - parsedAmount;
//         toAccount.balance = Number(toAccount.balance) + parsedAmount;

//         // Update the user's accounts in MongoDB
//         await collection.updateOne(
//             { email: 'volodyaruzhak@gmail.com' },
//             { $set: { accounts: user.accounts } }
//         );

//         // Log the transaction (optional)
//         const transaction = {
//             id: user.transactions.length + 1,
//             date: new Date().toISOString(),
//             description: `Transfer from ${fromAccount.accountType} to ${toAccount.accountType}`,
//             amount: -parsedAmount,
//         };
//         user.transactions.push(transaction);

//         await collection.updateOne(
//             { email: 'volodyaruzhak@gmail.com' },
//             { $set: { transactions: user.transactions } }
//         );

//         console.log('Transfer successful:', transaction);
//         res.status(200).json({ message: 'Transfer successful', transaction });
//     } catch (err) {
//         console.error('Transfer error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// POST /transfer route
router.post('/transfer', async (req, res) => {
    const { email, fromAccountNumber, toAccountNumber, amount } = req.body;

    console.log('Transfer request received:', { email, fromAccountNumber, toAccountNumber, amount });

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        // Find the user by their email
        const user = await collection.findOne({ email: email });

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user); // Log user object to inspect accounts

        // Validate accounts and transfer amount
        const fromAccount = user.accounts.find(acc => acc.accountType === fromAccountNumber);
        const toAccount = user.accounts.find(acc => acc.accountType === toAccountNumber);

        if (!fromAccount || !toAccount) {
            console.error('Invalid account types');
            return res.status(400).json({ message: 'Invalid account types' });
        }

        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedAmount) || fromAccount.balance < parsedAmount) {
            console.error('Insufficient funds or invalid amount');
            return res.status(400).json({ message: 'Insufficient funds or invalid amount' });
        }

        // Perform the transfer
        fromAccount.balance -= parsedAmount;
        toAccount.balance += parsedAmount;

        // Update the user's accounts in MongoDB
        await collection.updateOne(
            { email: email },
            { $set: { accounts: user.accounts } }
        );

        // Log the transaction (optional)
        const transaction = {
            id: user.transactions.length + 1,
            date: new Date().toISOString(),
            description: `Transfer from ${fromAccount.accountType} to ${toAccount.accountType}`,
            amount: -parsedAmount,
        };
        user.transactions.push(transaction);

        await collection.updateOne(
            { email: email },
            { $set: { transactions: user.transactions } }
        );

        console.log('Transfer successful:', transaction);
        res.status(200).json({ message: 'Transfer successful', transaction });
    } catch (err) {
        console.error('Transfer error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// POST /api/activity route
// router.post('/activity', async (req, res) => {
//     const { fromAccountNumber, amount, description } = req.body;

//     console.log('Payment request received:', { fromAccountNumber, amount, description });

//     try {
//         const database = client.db('sample_mflix');
//         const collection = database.collection('bankData');

//         // Find the user by their email
//         const user = await collection.findOne({ email: 'volodyaruzhak@gmail.com' });

//         console.log('User found:', user); // Log user object to inspect accounts

//         // Validate accounts and transfer amount
//         const fromAccount = user.accounts.find(acc => acc.accountType === fromAccountNumber);

//         if (!fromAccount) {
//             console.error('Invalid account types');
//             return res.status(400).json({ message: 'Invalid account types' });
//         }

//         if (fromAccount.balance < amount) {
//             console.error('Insufficient funds');
//             return res.status(400).json({ message: 'Insufficient funds' });
//         }

//         // Ensure amount is a number
//         const parsedAmount = Number(amount);
//         if (isNaN(parsedAmount)) {
//             console.error('Invalid amount');
//             return res.status(400).json({ message: 'Invalid amount' });
//         }

//         // Perform the transfer
//         fromAccount.balance -= parsedAmount;

//         // Update the user's accounts in MongoDB
//         await collection.updateOne(
//             { email: 'volodyaruzhak@gmail.com' },
//             { $set: { accounts: user.accounts } }
//         );

//         // Log the activity
//         const activity = {
//             id: user.activities.length + 1,
//             date: new Date().toISOString(),
//             description: description || `Payment from ${fromAccount.accountType} account`,
//             amount: -parsedAmount,
//         };
//         user.activities.push(activity);

//         await collection.updateOne(
//             { email: 'volodyaruzhak@gmail.com' },
//             { $set: { activities: user.activities } }
//         );

//         console.log('Payment successful:', activity);
//         res.status(200).json({ message: 'Payment successful', activity });
//     } catch (err) {
//         console.error('Payment error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// POST /api/activity route
router.post('/activity', async (req, res) => {
    const { email, fromAccountNumber, amount, description } = req.body;

    console.log('Payment request received:', { email, fromAccountNumber, amount, description });

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        // Find the user by their email
        const user = await collection.findOne({ email: email });

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user); // Log user object to inspect accounts

        // Validate accounts and transfer amount
        const fromAccount = user.accounts.find(acc => acc.accountType === fromAccountNumber);

        if (!fromAccount) {
            console.error('Invalid account types');
            return res.status(400).json({ message: 'Invalid account types' });
        }

        if (fromAccount.balance < amount) {
            console.error('Insufficient funds');
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Ensure amount is a number
        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount)) {
            console.error('Invalid amount');
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Perform the transfer
        fromAccount.balance -= parsedAmount;

        // Update the user's accounts in MongoDB
        await collection.updateOne(
            { email: email },
            { $set: { accounts: user.accounts } }
        );

        // Log the activity
        const activity = {
            id: user.activities.length + 1,
            date: new Date().toISOString(),
            description: description || `Payment from ${fromAccount.accountType} account`,
            amount: -parsedAmount,
        };
        user.activities.push(activity);

        await collection.updateOne(
            { email: email },
            { $set: { activities: user.activities } }
        );

        console.log('Payment successful:', activity);
        res.status(200).json({ message: 'Payment successful', activity });
    } catch (err) {
        console.error('Payment error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// GET /api/user route
// router.get('/user', async (req, res) => {
//     try {
//         const database = client.db('sample_mflix');
//         const collection = database.collection('bankData');

//         // Find the user by their email
//         const user = await collection.findOne({ email: 'volodyaruzhak@gmail.com' });

//         res.status(200).json(user);
//     } catch (err) {
//         console.error('Error fetching user data:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



// GET /api/user route
router.get('/user', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email parameter is required' });
    }

    try {
        const database = client.db('sample_mflix');
        const collection = database.collection('bankData');

        // Find the user by their email
        const user = await collection.findOne({ email: email });

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
module.exports = router;
