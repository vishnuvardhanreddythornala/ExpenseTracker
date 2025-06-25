import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const IncomeList = ({ income, onDelete, onEdit }) => {
  return (
    <div className="space-y-4">
      {income.length === 0 ? (
        <p className="text-gray-500">No income records found.</p>
      ) : (
        income.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <h4 className="text-md font-semibold text-gray-800">{item.source}</h4>
              <p className="text-sm text-gray-500">
                ₹{item.amount} • {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-4 text-xl items-center">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default IncomeList;
