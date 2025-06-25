// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
  <div className="w-64 h-screen fixed left-0 top-0 z-40">
    <Sidebar />
  </div>
  <div className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
