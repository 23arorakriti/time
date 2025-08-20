// src/components/settings/IdealDaySetter.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { useTimeTideStore } from '../store/useTimeTideStore';
import type { IdealAllocation } from '../types';
import Card from '../components/ui/Card';
const IdealDaySetter = () => {
    const { categories, idealDay, setIdealDay } = useTimeTideStore();
    const [allocations, setAllocations] = useState<IdealAllocation[]>(idealDay);

    useEffect(() => {
        const categoryIds = new Set(categories.map(c => c.id));
        const currentAllocations = idealDay.filter(a => categoryIds.has(a.categoryId));
        
        const newAllocations = categories.map(cat => {
            const existing = currentAllocations.find(a => a.categoryId === cat.id);
            return existing || { categoryId: cat.id, hours: 0 };
        });
        setAllocations(newAllocations);
    }, [categories, idealDay]);

    const totalHours = allocations.reduce((sum, alloc) => sum + alloc.hours, 0);

    const handleHourChange = (categoryId: string, hours: number) => {
        const newAllocations = allocations.map(alloc =>
            alloc.categoryId === categoryId ? { ...alloc, hours } : alloc
        );
        setAllocations(newAllocations);
    };

    const handleSave = () => {
        setIdealDay(allocations);
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Set Your Ideal Day</h3>
            <p className="text-slate-400 mb-4">Allocate your 24 hours across your categories.</p>
            <div className="space-y-4">
                {allocations.map(alloc => {
                    const category = categories.find(c => c.id === alloc.categoryId);
                    if (!category) return null;
                    return (
                        <div key={alloc.categoryId}>
                            <label className="flex items-center justify-between mb-1 text-slate-200">
                                <span>{category.emoji} {category.name}</span>
                                <span className="font-semibold">{alloc.hours} hrs</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="24"
                                step="0.5"
                                value={alloc.hours}
                                onChange={(e) => handleHourChange(alloc.categoryId, parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    );
                })}
            </div>
            <div className={`mt-6 p-3 rounded-lg text-center font-bold ${totalHours > 24 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                Total Hours Allocated: {totalHours} / 24
            </div>
            <motion.button
                onClick={handleSave}
                disabled={totalHours > 24}
                whileHover={{ scale: totalHours > 24 ? 1 : 1.02 }}
                whileTap={{ scale: totalHours > 24 ? 1 : 0.98 }}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                <Save size={16} /> Save Ideal Day
            </motion.button>
        </Card>
    );
};

export default IdealDaySetter;
