import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ expenses }) => {
  // Group by category (for pie)
  const categoryTotals = {};
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#c084fc'],
    }]
  };

  // Group by month (for bar)
  const monthlyTotals = new Array(12).fill(0);
  expenses.forEach(exp => {
    const month = new Date(exp.date).getMonth();
    monthlyTotals[month] += exp.amount;
  });

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Expenses',
      data: monthlyTotals,
      backgroundColor: '#4f46e5'
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Category Breakdown</h3>
        <Doughnut data={pieData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Monthly Spending</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Chart;
