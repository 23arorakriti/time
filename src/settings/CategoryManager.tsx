// src/components/settings/CategoryManager.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { useTimeTideStore } from '../store/useTimeTideStore.ts';
import type { ActivityCategory } from '../types/index.ts';
import Card from '../components/ui/Card.tsx';

const EMOJI_OPTIONS = ['💼', '😴', '👨‍👩‍👧‍👦', '🏋️', '🧹', '🎮', '📚', '🧘', '🍽️', '✈️', '💡', '💸'];
const COLOR_OPTIONS = ['#a78bfa', '#94a3b8', '#4ade80', '#f87171', '#fb923c', '#f472b6', '#22d3ee', '#e879f9'];

const CategoryManager = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useTimeTideStore();
    const [isAdding, setIsAdding] = useState(false);
    const [editingCategory, setEditingCategory] = useState<ActivityCategory | null>(null);
    const [newCategory, setNewCategory] = useState({ name: '', color: COLOR_OPTIONS[0], emoji: EMOJI_OPTIONS[0] });

    const handleSave = () => {
        if (newCategory.name.trim() === '') return;
        if (editingCategory) {
            updateCategory({ ...editingCategory, ...newCategory });
            setEditingCategory(null);
        } else {
            addCategory(newCategory);
        }
        setNewCategory({ name: '', color: COLOR_OPTIONS[0], emoji: EMOJI_OPTIONS[0] });
        setIsAdding(false);
    };

    const handleEdit = (category: ActivityCategory) => {
        setEditingCategory(category);
        setNewCategory({ name: category.name, color: category.color, emoji: category.emoji });
        setIsAdding(true);
    };
    
    const handleCancel = () => {
        setIsAdding(false);
        setEditingCategory(null);
        setNewCategory({ name: '', color: COLOR_OPTIONS[0], emoji: EMOJI_OPTIONS[0] });
    }

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4 text-slate-100">Manage Categories</h3>
            <div className="space-y-3">
                {categories.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{cat.emoji}</span>
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }}></span>
                            <span className="text-slate-200">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(cat)} className="p-2 hover:bg-slate-600 rounded-full"><Edit size={16} /></motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => deleteCategory(cat.id)} className="p-2 hover:bg-slate-600 rounded-full text-red-500"><Trash2 size={16} /></motion.button>
                        </div>
                    </div>
                ))}
            </div>
            <AnimatePresence>
            {isAdding && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4 p-4 border border-purple-900/50 rounded-lg overflow-hidden"
                >
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="w-full p-2 border border-slate-600 rounded bg-slate-800 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <div>
                        <label className="block mb-2 text-sm text-slate-400">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {COLOR_OPTIONS.map(color => (
                                <motion.button whileHover={{ scale: 1.1 }} key={color} onClick={() => setNewCategory({ ...newCategory, color })} className={`w-8 h-8 rounded-full ${newCategory.color === color ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-500' : ''}`} style={{ backgroundColor: color }}></motion.button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-slate-400">Emoji</label>
                        <div className="flex flex-wrap gap-2">
                            {EMOJI_OPTIONS.map(emoji => (
                                <motion.button whileHover={{ scale: 1.1 }} key={emoji} onClick={() => setNewCategory({ ...newCategory, emoji })} className={`p-2 rounded-lg text-2xl ${newCategory.emoji === emoji ? 'bg-purple-500/20' : 'bg-slate-700'}`}>{emoji}</motion.button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCancel} className="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 flex items-center gap-2"><X size={16}/> Cancel</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-2"><Save size={16}/> Save</motion.button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
            {!isAdding && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsAdding(true)} className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                    <Plus size={16} /> Add New Category
                </motion.button>
            )}
        </Card>
    );
};

export default CategoryManager;
