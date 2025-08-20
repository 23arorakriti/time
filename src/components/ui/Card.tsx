import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`bg-slate-900/50 backdrop-blur-sm border border-purple-900/50 rounded-2xl shadow-lg p-6 ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;
