// src/components/EditExpenseModal.js
import React, { useState, useEffect } from "react";

const EditExpenseModal = ({ isOpen, expense, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title || "");
      setAmount(expense.amount || "");
      setCategory(expense.category || "");
    }
  }, [expense]);

  const handleSave = async () => {
    try {
      const updatedExpense = {
        title,
        amount,
        category,
        _id: expense._id, // ✅ Needed for backend update
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/expenses/${expense._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const updated = await response.json();
      onSave(updated); // ✅ Notify parent
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense.");
    }
  };

  // ✅ Only show modal if open
  if (!isOpen || !expense) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Expense</h3>

        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <input
          type="number"
          className="w-full p-2 border rounded mb-3"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 border border-gray-400 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
