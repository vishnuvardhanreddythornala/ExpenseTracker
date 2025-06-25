import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="space-y-3">
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        expenses.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">
                ₹{item.amount} • {item.category} •{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(item)}
                className="text-yellow-600 hover:text-yellow-800 transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(item._id)}
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

export default ExpenseList;
