// src/components/IncomeChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeChart = ({ income }) => {
  if (!income || income.length === 0) {
    return <p className="text-gray-500">No income data available for chart.</p>;
  }

  const labels = income.map(item => item.source);
  const data = {
    labels,
    datasets: [
      {
        label: 'Income (₹)',
        data: income.map(item => item.amount),
        backgroundColor: '#7c3aed',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Income Overview',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Income Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default IncomeChart;
