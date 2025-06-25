import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const ExpenseLineChart = ({ expenses }) => {
  const labels = expenses.map(e => new Date(e.date).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses Over Time',
        data: expenses.map(e => e.amount),
        fill: false,
        borderColor: '#8b5cf6',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Expenses Line Chart</h3>
      <Line data={data} />
    </div>
  );
};

export default ExpenseLineChart;
