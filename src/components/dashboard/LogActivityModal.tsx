import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTimeTideStore } from '../../store/useTimeTideStore';
import Card from '../ui/Card';

interface LogActivityModalProps {
    hour: number;
    date: string;
    onClose: () => void;
}

const LogActivityModal: React.FC<LogActivityModalProps> = ({ hour, date, onClose }) => {
  const { categories, logActivity } = useTimeTideStore();

  const handleLog = (categoryId: string) => {
    logActivity({ categoryId, hour, date });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-100">Log Activity for {hour}:00</h3>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
              <X size={20} />
            </motion.button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => handleLog(cat.id)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 rounded-lg"
                style={{ backgroundColor: `${cat.color}33` }}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="mt-2 text-sm font-semibold text-center text-slate-200">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LogActivityModal;
