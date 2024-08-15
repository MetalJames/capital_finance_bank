const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true},
    balance: { type: Number,  required: true},
    accountType: { type: String, required: true, enum: ['Checking', 'Saving', 'Credit'] },
    openDate: { type: Date, required: true}
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    unitNumber: { type: String },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    password: { type: String, required: true },
    accounts: [accountSchema],
    transactions: { type: Array, default: [] },
    activities: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userSchema);