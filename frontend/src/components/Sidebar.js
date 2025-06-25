// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartPie, FaMoneyBill, FaWallet, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-100 ${
      isActive ? 'bg-purple-200 text-purple-800 font-semibold' : 'text-gray-700'
    }`;

  return (
    <div className="h-screen flex flex-col justify-between bg-white shadow-md w-64 p-4">
      {/* 🔼 Top Content */}
      <div>
        {/* App Logo */}
        <h1 className="text-xl font-bold text-purple-700 mb-6">Expense Tracker</h1>

        {/* Profile */}
        <div className="text-center mb-6">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="User"
            className="w-20 h-20 rounded-full mx-auto shadow"
          />
          <h2 className="mt-2 text-lg font-semibold text-gray-800">Vishnu Reddy</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" className={linkClass}>
            <FaChartPie /> Dashboard
          </NavLink>
          <NavLink to="/income" className={linkClass}>
            <FaMoneyBill /> Income
          </NavLink>
          <NavLink to="/expense" className={linkClass}>
            <FaWallet /> Expenses
          </NavLink>
        </nav>
      </div>

      {/* 🔽 Bottom Logout Button */}
      <div className="pt-4 border-t">
        <button className="flex items-center gap-3 text-red-500 hover:text-red-600 w-full px-4 py-2 rounded-lg hover:bg-red-100">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
