import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseList from '../components/ExpenseList';
import AddExpenseModal from '../components/AddExpenseModal';
import EditExpenseModal from '../components/EditExpenseModal';
import { FaDownload } from 'react-icons/fa';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/expenses`);
        setExpenses(res.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };
    fetchExpenses();
  }, []);

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredExpenses = selectedMonth
    ? sortedExpenses.filter((item) => {
        const month = new Date(item.date).toLocaleString('default', { month: 'long' });
        return month === selectedMonth;
      })
    : sortedExpenses;

  const addExpense = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/expenses`, data);
      setExpenses([res.data, ...expenses]);
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/expenses/${id}`);
      setExpenses(expenses.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const updateExpense = async (updatedItem) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/expenses/${updatedItem._id}`,
        updatedItem
      );
      setExpenses((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? res.data : item))
      );
      setEditModalOpen(false);
    } catch (err) {
      console.error('Failed to update expense:', err);
    }
  };

  const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const avgExpense = expenses.length > 0 ? Math.round(totalExpense / expenses.length) : 0;
  const topCategory = (() => {
    const freq = {};
    expenses.forEach((e) => {
      freq[e.category] = (freq[e.category] || 0) + Number(e.amount);
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || 'N/A';
  })();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const downloadCSV = () => {
    const csv = [
      ['Title', 'Amount', 'Category', 'Date'],
      ...filteredExpenses.map((e) => [e.title, e.amount, e.category, new Date(e.date).toLocaleDateString()])
    ].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Expense Overview</h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          + Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white px-4 py-4 rounded-lg shadow text-center">
          <p className="text-xl font-semibold text-pink-600">₹{totalExpense.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Total Expenses</p>
        </div>
        <div className="bg-white px-4 py-4 rounded-lg shadow text-center">
          <p className="text-xl font-semibold text-orange-500">₹{avgExpense.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Average Expense</p>
        </div>
        <div className="bg-white px-4 py-4 rounded-lg shadow text-center">
          <p className="text-xl font-semibold text-green-600">{topCategory}</p>
          <p className="text-gray-600 text-sm">Top Category</p>
        </div>
      </div>

      {/* Chart + Expense List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Chart */}
        <div className="bg-white p-6 rounded-lg shadow h-[500px]">
          <h3 className="text-lg font-semibold mb-2">Expense Chart</h3>
          <div className="h-[420px]">
            <ExpenseChart expenses={sortedExpenses} />
          </div>
        </div>

        {/* Expense List with Fixed Header */}
        <div className="bg-white p-6 rounded-lg shadow h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Expense List</h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded p-1"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          {/* Scrollable Expense Items only */}
          <div className="overflow-y-auto flex-1 pr-2">
  {filteredExpenses.length > 0 ? (
    <ExpenseList
      expenses={filteredExpenses}
      showAll={true}
      onDelete={(item) => deleteExpense(item._id)}
      onEdit={(item) => {
        setExpenseToEdit(item);
        setEditModalOpen(true);
      }}
    />
  ) : (
    <p className="text-gray-500 text-sm">No expenses found for this month.</p>
  )}
</div>

        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
        >
          <FaDownload className="text-white" />
          Download CSV
        </button>
      </div>

      {/* Modals */}
      <AddExpenseModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={addExpense}
      />
      <EditExpenseModal
  isOpen={editModalOpen}
  expense={expenseToEdit}
  onClose={() => setEditModalOpen(false)}
  onSave={updateExpense}
/>

    </div>
  );
};

export default Expense;
