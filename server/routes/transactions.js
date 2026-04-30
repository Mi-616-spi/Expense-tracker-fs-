// routes/transactions.js
// This file defines all the API routes for transactions

const express = require("express");
const router = express.Router(); // Create a mini-router for transactions
const Transaction = require("../models/Transaction"); // Import the model

// ─────────────────────────────────────────────
// GET /transactions/all → Fetch all transactions
// ─────────────────────────────────────────────
router.get("/all", async (req, res) => {
  try {
    // Find all documents in the Transaction collection, newest first
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions); // Send back as JSON
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// ─────────────────────────────────────────────
// POST /transactions/add → Add a new transaction
// ─────────────────────────────────────────────
router.post("/add", async (req, res) => {
  try {
    const { title, amount, type } = req.body; // Destructure body data

    // Basic server-side validation
    if (!title || !amount || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new transaction document
    const newTransaction = new Transaction({ title, amount, type });

    // Save it to MongoDB
    const saved = await newTransaction.save();

    res.status(201).json(saved); // 201 = Created
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// ─────────────────────────────────────────────
// PUT /transactions/update/:id → Update a transaction
// ─────────────────────────────────────────────
router.put("/update/:id", async (req, res) => {
  try {
    const { title, amount, type } = req.body;

    // Find the document by ID and update it
    // { new: true } returns the updated document
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      { title, amount, type },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// ─────────────────────────────────────────────
// DELETE /transactions/delete/:id → Delete a transaction
// ─────────────────────────────────────────────
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

module.exports = router;
