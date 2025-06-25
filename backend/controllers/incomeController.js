const Income = require('../models/Income');

// @desc    Get all income
const getIncome = async (req, res) => {
  try {
    const income = await Income.find().sort({ date: -1 });
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add income
const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;
    const income = new Income({ source, amount, date });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add income' });
  }
};

// @desc    Delete income
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: 'Income deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Income not found' });
  }
};

module.exports = {
  getIncome,
  addIncome,
  deleteIncome
};
