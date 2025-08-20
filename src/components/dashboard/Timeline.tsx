import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useTimeTideStore } from '../../store/useTimeTideStore';
import type { ActivityCategory } from '../../types';
import Card from '../ui/Card';
import LogActivityModal from './LogActivityModal';

const Timeline = () => {
  const { activityLogs, categories, clearLogForHour } = useTimeTideStore();
  const [modalState, setModalState] = useState<{ isOpen: boolean; hour: number | null }>({ isOpen: false, hour: null });
  const today = new Date().toISOString().split('T')[0];

  const logsByHour = useMemo(() => {
    const logsMap = new Map<number, ActivityCategory>();
    const todayLogs = activityLogs.filter(log => log.date === today);
    const categoryMap = new Map(categories.map(c => [c.id, c]));

    todayLogs.forEach(log => {
      const category = categoryMap.get(log.categoryId);
      if (category) {
        logsMap.set(log.hour, category);
      }
    });
    return logsMap;
  }, [activityLogs, categories, today]);

  const openModal = (hour: number) => setModalState({ isOpen: true, hour });
  const closeModal = () => setModalState({ isOpen: false, hour: null });

  const handleClear = (e: React.MouseEvent, hour: number) => {
      e.stopPropagation();
      clearLogForHour(hour, today);
  }

  return (
    <>
      <Card>
        <h3 className="text-xl font-bold mb-4 text-slate-100">Today's Timeline</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {Array.from({ length: 24 }).map((_, hour) => {
            const loggedCategory = logsByHour.get(hour);
            return (
              <motion.div
                key={hour}
                onClick={() => openModal(hour)}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer"
                style={{ backgroundColor: loggedCategory ? `${loggedCategory.color}55` : '#1e293b' }}
              >
                <span className="absolute top-1 left-1 text-xs font-medium text-slate-400">{hour}:00</span>
                {loggedCategory ? (
                  <>
                    <span className="text-3xl">{loggedCategory.emoji}</span>
                    <motion.button whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} onClick={(e) => handleClear(e, hour)} className="absolute bottom-1 right-1 p-0.5 bg-slate-800/50 rounded-full text-red-500 hover:bg-red-500 hover:text-white">
                        <Trash2 size={12}/>
                    </motion.button>
                  </>
                ) : (
                  <Plus size={24} className="text-slate-500" />
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
      <AnimatePresence>
        {modalState.isOpen && modalState.hour !== null && (
            <LogActivityModal hour={modalState.hour} date={today} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Timeline;
