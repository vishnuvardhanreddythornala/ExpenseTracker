// src/components/DashboardIncomeList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';

const DashboardIncomeList = ({ income = [] }) => {
  const navigate = useNavigate();

  const sortedIncome = [...income].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const displayIncome = sortedIncome.slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">Income</h3>
        {income.length > 5 && (
          <button
            onClick={() => navigate('/income')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            See All →
          </button>
        )}
      </div>
      <ul className="space-y-4">
        {displayIncome.map((item, index) => (
          <li key={item._id || index} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <FaMoneyBillWave className="text-green-500" />
              <div>
                <p className="font-semibold text-gray-700">{item.source}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-green-600 font-semibold">+ ₹{item.amount}</p>
          </li>
        ))}
        {displayIncome.length === 0 && (
          <p className="text-gray-500">No income entries found.</p>
        )}
      </ul>
    </div>
  );
};

export default DashboardIncomeList;
