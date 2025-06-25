// src/components/StatsCard.js
import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const StatsCard = ({ title, amount, color, large = false }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow flex items-center justify-between ${
        large ? 'p-6 text-xl' : 'p-4'
      }`}
    >
      <div>
        <p className={`text-sm text-gray-500 ${large ? 'mb-1' : ''}`}>{title}</p>
        <h3 className={`font-semibold ${color} ${large ? 'text-3xl' : 'text-xl'}`}>
          ₹{amount.toLocaleString()}
        </h3>
      </div>
      <FaMoneyBillWave className={`text-2xl ${color}`} />
    </div>
  );
};

export default StatsCard;
