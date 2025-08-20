// src/components/dashboard/DashboardPage.tsx

import React, { useMemo } from 'react';
import { useTimeTideStore } from '../../store/useTimeTideStore';
import PieChartComponent from './PieChartComponent.tsx';
import Timeline from './Timeline.tsx';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const DashboardPage = () => {
  const { categories, idealDay, activityLogs } = useTimeTideStore();
  const today = getTodayDateString();

  const categoryMap = useMemo(() => new Map(categories.map(c => [c.id, c])), [categories]);

  const actualData = useMemo(() => {
    const todayLogs = activityLogs.filter(log => log.date === today);
    const hoursByCategory = new Map<string, number>();

    todayLogs.forEach(log => {
      hoursByCategory.set(log.categoryId, (hoursByCategory.get(log.categoryId) || 0) + 1);
    });

    const data = Array.from(hoursByCategory.entries()).map(([categoryId, hours]) => {
      const category = categoryMap.get(categoryId);
      return {
        name: category?.name || 'Unknown',
        value: hours,
        color: category?.color || '#cccccc',
      };
    });

    if (data.length === 0) {
      return [{ name: 'No activity logged', value: 24, color: '#374151' }];
    }
    return data;
  }, [activityLogs, categoryMap, today]);

  const idealData = useMemo(() => {
    const data = idealDay
      .map(allocation => {
        const category = categoryMap.get(allocation.categoryId);
        return {
          name: category?.name || 'Unknown',
          value: allocation.hours,
          color: category?.color || '#cccccc',
        };
      })
      .filter(item => item.value > 0);

    if (data.length === 0) {
      return [{ name: 'Ideal day not set', value: 24, color: '#374151' }];
    }
    return data;
  }, [idealDay, categoryMap]);

  const totalLoggedHours = useMemo(() => {
    return activityLogs
      .filter(log => log.date === today)
      .reduce((sum) => sum + 1, 0);
  }, [activityLogs, today]);

  const dailyAnalysis = useMemo(() => {
    const actualHoursMap = new Map(actualData.map(item => [item.name, item.value]));
    const idealHoursMap = new Map(idealData.map(item => [item.name, item.value]));

    const analysisItems = categories.map(category => {
      const actualHours = actualHoursMap.get(category.name) || 0;
      const idealHours = idealHoursMap.get(category.name) || 0;
      const difference = actualHours - idealHours;

      return {
        name: category.name,
        color: category.color,
        actualHours,
        idealHours,
        difference,
      };
    });

    return (
      <div className="space-y-3 mt-6">
        <h4 className="text-md font-bold text-slate-200 mb-2">
          Ideal vs. Actual Analysis
        </h4>
        {analysisItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="font-semibold">{item.name}</span>
              <span className="text-sm text-slate-400">
                ({item.actualHours} / {item.idealHours > 0 ? item.idealHours : '–'} hrs)
              </span>
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                item.difference > 0
                  ? 'text-yellow-400'
                  : item.difference < 0
                  ? 'text-green-400'
                  : 'text-slate-400'
              }`}
            >
              {item.idealHours === 0 ? (
                <span className="text-slate-500">Not set</span>
              ) : (
                <>
                  {item.difference > 0 && <ArrowUp size={14} />}
                  {item.difference < 0 && <ArrowDown size={14} />}
                  {item.difference === 0 && item.actualHours > 0 && <Minus size={14} />}
                  {item.difference !== 0 ? (
                    <span>
                      {Math.abs(item.difference)} hrs {item.difference > 0 ? 'over' : 'under'}
                    </span>
                  ) : item.actualHours > 0 ? (
                    <span>Perfect</span>
                  ) : (
                    <span className="text-slate-500">Not started</span>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }, [actualData, idealData, categories]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Daily usage + Analysis */}
        <div className="lg:col-span-2 flex flex-col">
          <PieChartComponent
            data={actualData}
            title={`Daily Time Usage (${totalLoggedHours}/24 hrs)`}
          />
          {dailyAnalysis}
        </div>

        {/* Right column: Ideal + Actual */}
        <div className="flex flex-col gap-6 self-start">
          <PieChartComponent data={idealData} title="Ideal Day" />
          <PieChartComponent data={actualData} title="Actual Day" />
        </div>
      </div>

      <Timeline />
    </div>
  );
};

export default DashboardPage;
