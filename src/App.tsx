// src/App.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LayoutDashboard } from 'lucide-react';

import AnimatedBackground from './components/ui/AnimatedBackground.tsx';
import DashboardPage from './components/dashboard/DashboardPage.tsx';
import SettingsPage from './settings/SettingsPage.tsx';

export default function App() {
  const [activePage, setActivePage] = useState<'dashboard' | 'settings'>('dashboard');

  return (
    <div className="text-slate-200 min-h-screen font-sans">
      <AnimatedBackground />
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-900/50 sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-400">🌊 Time Tide</h1>
          <div className="flex items-center gap-2 bg-slate-900/70 border border-purple-900/50 rounded-full p-1">
            <motion.button
              onClick={() => setActivePage('dashboard')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm transition-colors ${activePage === 'dashboard' ? 'bg-slate-700 text-white' : 'hover:bg-slate-700'}`}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </motion.button>
            <motion.button
              onClick={() => setActivePage('settings')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm transition-colors ${activePage === 'settings' ? 'bg-slate-700 text-white' : 'hover:bg-slate-700'}`}
            >
              <Settings size={16} />
              <span>Settings</span>
            </motion.button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 sm:p-6 relative z-10">
        <AnimatePresence mode="wait">
            <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {activePage === 'dashboard' ? <DashboardPage /> : <SettingsPage />}
            </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="text-center py-4 text-slate-500 text-sm relative z-10">
        <p>Track your time, ride the tide of life.</p>
      </footer>
    </div>
  );
}
