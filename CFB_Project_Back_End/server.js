const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes'); // Import your auth routes

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

connectDB();

// Mount authRoutes under /api
app.use('/api', authRoutes);

// Sample endpoint to fetch users (you can remove this if not needed)
app.get('/', async (req, res) => {
    try {
        const database = client.db('sample_mflix'); // replace with your database name
        const collection = database.collection('bankData'); // replace with your collection name
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
