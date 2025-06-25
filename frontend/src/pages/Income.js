import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeChart from '../components/IncomeChart';
import IncomeList from '../components/IncomeList';
import AddIncomeModal from '../components/AddIncomeModal';
import EditIncomeModal from '../components/EditIncomeModal';
import { saveAs } from 'file-saver';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [incomeToEdit, setIncomeToEdit] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/incomes`);
        setIncome(res.data);
      } catch (err) {
        console.error('Error fetching income:', err);
      }
    };
    fetchIncome();
  }, []);

  const sortedIncome = [...income].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredIncome = selectedMonth
    ? sortedIncome.filter((item) => {
        const itemMonth = new Date(item.date).toLocaleString('default', { month: 'long' });
        return itemMonth === selectedMonth;
      })
    : sortedIncome;

  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0);
  const avgIncome = income.length > 0 ? Math.round(totalIncome / income.length) : 0;
  const topSource =
    income.reduce((acc, curr) => {
      acc[curr.source] = (acc[curr.source] || 0) + Number(curr.amount);
      return acc;
    }, {});
  const topSourceName =
    Object.keys(topSource).length > 0
      ? Object.entries(topSource).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  const addIncome = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/incomes`, data);
      setIncome([res.data, ...income]);
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/incomes/${id}`);
      setIncome(income.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting income:', err);
    }
  };

  const updateIncome = async (updatedItem) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/incomes/${updatedItem._id}`,
        updatedItem
      );
      setIncome((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? res.data : item))
      );
      setEditModalOpen(false);
    } catch (err) {
      console.error('Failed to update income:', err);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const downloadCSV = () => {
    const csvContent = [
      ['Source', 'Amount', 'Date'],
      ...income.map((item) => [item.source, item.amount, new Date(item.date).toLocaleDateString()])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'income_data.csv');
  };

  return (
    <div className="p-6 w-full space-y-6">
      {/* Heading and Add */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Income Overview</h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          + Add Income
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-xl font-semibold text-purple-700">₹{totalIncome.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Total Income</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-xl font-semibold text-orange-600">₹{avgIncome.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Average Income</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-xl font-semibold text-green-600">{topSourceName}</p>
          <p className="text-gray-600 text-sm">Top Source</p>
        </div>
      </div>

      {/* Chart + Income List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="min-h-[460px] bg-white p-4 rounded-xl shadow w-full h-full">
  <IncomeChart income={sortedIncome} />
</div>


        {/* List Section */}
        <div className="flex flex-col h-[420px]">
          {/* Header + Filter */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Income List</h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Scrollable List */}
          <div className="overflow-y-auto flex-1 pr-2">
            <IncomeList
              income={filteredIncome}
              showAll={true}
              onDelete={(item) => deleteIncome(item._id)}
              onEdit={(item) => {
                setIncomeToEdit(item);
                setEditModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Download Button */}
<div className="text-right mt-4">
  <button
    onClick={downloadCSV}
    className="inline-flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition duration-300 ease-in-out"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
    </svg>
    Download CSV
  </button>
</div>



      {/* Modals */}
      <AddIncomeModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={addIncome}
      />
      <EditIncomeModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        incomeToEdit={incomeToEdit}
        onSave={updateIncome}
      />
    </div>
  );
};

export default Income;
