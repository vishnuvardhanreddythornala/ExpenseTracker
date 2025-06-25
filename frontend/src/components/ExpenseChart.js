// src/components/ExpenseChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

// Get last 6 months (labels)
const getLast6Months = () => {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = date.toLocaleString("default", { month: "short" });
    months.push(label);
  }
  return months;
};

const ExpenseChart = ({ expenses }) => {
  const labels = getLast6Months();
  const totals = labels.map(() => 0);

  expenses?.forEach((expense) => {
    const date = new Date(expense.date);
    const label = date.toLocaleString("default", { month: "short" });
    const index = labels.indexOf(label);
    if (index !== -1) {
      totals[index] += Number(expense.amount);
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: totals,
        backgroundColor: "#ec4899", // Tailwind pink-500
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md w-full h-[300px]">
      <h2 className="text-xl font-semibold text-white mb-4">Expense Overview (Last 6 Months)</h2>
      <div className="h-[220px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
