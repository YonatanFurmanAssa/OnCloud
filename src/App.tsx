import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import Alerts from './components/Alerts';
import Budget from './components/Budget';
import Recommendations from './components/Recommendations';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="pt-4 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;