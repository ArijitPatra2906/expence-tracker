const express = require("express");
const Transaction = require("../models/Transaction")
const router = express.Router()
const moment = require("moment")

// Add a Transaction
router.post("/add-transaction", async function (req, res) {

    try {
        const newTransaction = new Transaction(req.body)
        await newTransaction.save();
        res.send("Transaction added Successfully!!")

    } catch (error) {
        res.status(500).json(error)
    }
})


// Edit a Transaction
router.post("/edit-transaction", async function (req, res) {

    try {
        await Transaction.findByIdAndUpdate({ _id: req.body.transactionId }, req.body.payload)
        res.send("Transaction updated Successfully!!")

    } catch (error) {
        res.status(500).json(error)
    }
})


// Delete a Transaction
router.post("/delete-transaction", async function (req, res) {

    try {
        await Transaction.findOneAndDelete({ _id: req.body.transactionId })
        res.send("Transaction deleted Successfully!!")

    } catch (error) {
        res.status(500).json(error)
    }
})

// get all
router.post("/get-alltransaction", async (req, res) => {
    const { frequency, selectedRange, type } = req.body
    try {
        const transaction = await Transaction.find({
            ...(frequency !== "custom" ? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), "d").toDate()
                },
            } : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                }
            }),
            userId: req.body.userId,
            ...(type !== "alltransaction" && { type })
        });
        res.send(transaction)
    } catch (error) {
        res.status(500).json(error)

    }
})

module.exports = router;