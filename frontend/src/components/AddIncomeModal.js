// src/components/AddIncomeModal.js
import React, { useState } from 'react';

const AddIncomeModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: '',
  });

  if (!isOpen) return null; // ✅ placed AFTER hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({ source: '', amount: '', date: '' }); // reset
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow">
        <h3 className="text-xl font-semibold mb-4">Add Income</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="source"
            placeholder="Income Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
