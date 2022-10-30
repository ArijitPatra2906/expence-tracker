const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    reference: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        require: true
    },
}, { timestamps: true })

const TransactionModel = mongoose.model("Transaction", TransactionSchema)

module.exports = TransactionModel;