import React, { useState, useEffect } from 'react';

const EditIncomeModal = ({ isOpen, onClose, onSave, incomeToEdit }) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: ''
  });

  useEffect(() => {
    if (incomeToEdit) {
      setFormData({
        source: incomeToEdit.source,
        amount: incomeToEdit.amount,
        date: incomeToEdit.date ? incomeToEdit.date.substring(0, 10) : ''
      });
    }
  }, [incomeToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, _id: incomeToEdit._id }); // ✅ FIX: use _id
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Income</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Source"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1 bg-purple-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIncomeModal;
