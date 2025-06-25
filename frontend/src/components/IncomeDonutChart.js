import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const IncomeDonutChart = ({ income }) => {
  // 1. Aggregate income by source
  const sourceTotals = {};
  income.forEach((item) => {
    const source = item.source || 'Other';
    sourceTotals[source] = (sourceTotals[source] || 0) + Number(item.amount);
  });

  const labels = Object.keys(sourceTotals);
  const values = Object.values(sourceTotals);
  const colors = ['#8b5cf6', '#f87171', '#facc15', '#34d399', '#60a5fa'];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ₹${context.parsed.toLocaleString()}`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[360px] w-full flex flex-col">
      {/* 🔹 Heading */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Last 60 Days Income
      </h3>

      {/* 🔹 Content layout: Chart (left) + Legend (right) */}
      <div className="flex flex-1 items-center justify-between">
        {/* Donut Chart */}
        <div className="w-[45%] h-[280px] flex justify-center items-center">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        {/* Legend */}
        <div className="w-[50%] space-y-2 pl-6">
          {labels.map((label, idx) => (
            <div key={label} className="flex items-center text-sm text-gray-700">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors[idx] }}
              ></span>
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncomeDonutChart;
