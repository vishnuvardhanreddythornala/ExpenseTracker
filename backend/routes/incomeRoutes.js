const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// GET all incomes
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch incomes" });
  }
});

// POST new income
router.post("/", async (req, res) => {
  try {
    const { source, amount, date } = req.body;
    const newIncome = new Income({ source, amount, date });
    const saved = await newIncome.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add income" });
  }
});

// ✅ PUT (Update) income
router.put("/:id", async (req, res) => {
  try {
    const updated = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Income not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating income:", err);
    res.status(500).json({ message: "Failed to update income" });
  }
});

// DELETE income
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Income.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete income" });
  }
});

module.exports = router;
