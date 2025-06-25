import React, { useEffect, useState } from 'react';
import axios from 'axios';

import StatsCard from '../components/StatsCard';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/ExpenseChart';
import IncomeDonutChart from '../components/IncomeDonutChart';
import DashboardIncomeList from '../components/DashboardIncomeList';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [expenseRes, incomeRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/expenses`),
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/incomes`),
      ]);
      setExpenses(expenseRes.data);
      setIncome(incomeRes.data);
    } catch (err) {
      console.error('❌ Failed to fetch dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalBalance = totalIncome - totalExpenses;

  const sortedIncome = [...income].sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 transition-colors duration-300">
      {/* Main content (no Navbar) */}
      <div className="p-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Total Balance" amount={totalBalance} color="text-blue-600" />
          <StatsCard title="Total Income" amount={totalIncome} color="text-green-600" />
          <StatsCard title="Total Expenses" amount={totalExpenses} color="text-red-600" />
        </div>

        {/* Expense Transactions & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionList expenses={sortedExpenses} />
          <ExpenseChart expenses={sortedExpenses} />
        </div>

        {/* Income Donut + Income List */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center" style={{ height: '350px' }}>
    <IncomeDonutChart income={sortedIncome} />
  </div>
  <DashboardIncomeList income={sortedIncome} />
</div>
      </div>
    </div>
  );
};

export default Dashboard;
