import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimeTideState } from '../types';

export const useTimeTideStore = create<TimeTideState>()(
  persist(
    (set, get) => ({
      categories: [
        { id: 'cat_work', name: 'Work', color: '#a78bfa', emoji: '💼' },
        { id: 'cat_sleep', name: 'Sleep', color: '#94a3b8', emoji: '😴' },
        { id: 'cat_family', name: 'Family', color: '#4ade80', emoji: '👨‍👩‍👧‍👦' },
        { id: 'cat_exercise', name: 'Exercise', color: '#f87171', emoji: '🏋️' },
        { id: 'cat_chores', name: 'Chores', color: '#fb923c', emoji: '🧹' },
        { id: 'cat_leisure', name: 'Leisure', color: '#f472b6', emoji: '🎮' },
      ],
      idealDay: [],
      activityLogs: [],

      addCategory: (category) => {
        const newCategory = { ...category, id: `cat_${Date.now()}` };
        set((state) => ({ categories: [...state.categories, newCategory] }));
      },
      updateCategory: (updatedCategory) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === updatedCategory.id ? updatedCategory : c
          ),
        }));
      },
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          idealDay: state.idealDay.filter((a) => a.categoryId !== id),
          activityLogs: state.activityLogs.filter((l) => l.categoryId !== id),
        }));
      },
      setIdealDay: (allocations) => set({ idealDay: allocations }),
      logActivity: (log) => {
        const existingLogIndex = get().activityLogs.findIndex(
          (l) => l.hour === log.hour && l.date === log.date
        );
        if (existingLogIndex > -1) {
          const updatedLogs = [...get().activityLogs];
          updatedLogs[existingLogIndex] = { ...log, id: updatedLogs[existingLogIndex].id };
          set({ activityLogs: updatedLogs });
        } else {
          set((state) => ({
            activityLogs: [...state.activityLogs, { ...log, id: `log_${Date.now()}` }],
          }));
        }
      },
      clearLogForHour: (hour, date) => {
        set((state) => ({
          activityLogs: state.activityLogs.filter(
            (l) => !(l.hour === hour && l.date === date)
          ),
        }));
      },
    }),
    {
      name: 'time-tide-storage',
    }
  )
);
