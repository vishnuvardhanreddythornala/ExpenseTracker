import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TransactionList = ({ expenses }) => {
  const navigate = useNavigate();
  const showSeeAll = expenses.length > 5;
  const recentExpenses = expenses.slice(0, 5); // Only show 5

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">Expenses</h3>
        {showSeeAll && (
          <button
            onClick={() => navigate('/expense')}
            className="text-sm text-gray-500 hover:underline"
          >
            See All →
          </button>
        )}
      </div>
      <ul className="space-y-4">
        {recentExpenses.map((e, i) => (
          <li key={i} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <FaShoppingBag className="text-purple-600" />
              <div>
                <p className="font-semibold text-gray-700">{e.title}</p>
                <p className="text-sm text-gray-500">{new Date(e.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-red-500 font-semibold">- ₹{e.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
