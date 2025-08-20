// src/components/dashboard/DailyAnalysis.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface AnalysisData {
    name: string;
    value: number;
    color: string;
}

interface DailyAnalysisProps {
    actualData: AnalysisData[];
    idealData: AnalysisData[];
}

const DailyAnalysis: React.FC<DailyAnalysisProps> = ({ actualData, idealData }) => {
    const idealMap = new Map(idealData.map(item => [item.name, item.value]));

    const analysisItems = actualData.map(actualItem => {
        const idealHours = idealMap.get(actualItem.name) || 0;
        const difference = actualItem.value - idealHours;
        return { ...actualItem, difference };
    });

    const totalLoggedHours = actualData.reduce((sum, item) => sum + item.value, 0);

    // Handle case where nothing is logged yet
    if (actualData.length === 0 || actualData[0]?.name.includes('No activity')) {
        return (
            <div className="text-center text-slate-400 py-4">
                <p>Log some activities to see your daily analysis.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h4 className="text-md font-bold text-slate-200 mb-2">Today's Analysis ({totalLoggedHours} hrs logged)</h4>
            {analysisItems.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-sm text-slate-400">({item.value} hrs)</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                        item.difference > 0 ? 'text-yellow-400' : item.difference < 0 ? 'text-green-400' : 'text-slate-400'
                    }`}>
                        {item.difference > 0 && <ArrowUp size={14} />}
                        {item.difference < 0 && <ArrowDown size={14} />}
                        {item.difference === 0 && <Minus size={14} />}
                        <span>{Math.abs(item.difference)} hrs {item.difference > 0 ? 'over' : item.difference < 0 ? 'under' : 'ideal'}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DailyAnalysis;
