// src/types/index.ts

export interface ActivityCategory {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface IdealAllocation {
  categoryId: string;
  hours: number;
}

export interface ActivityLog {
  id: string;
  categoryId: string;
  hour: number;
  date: string;
}

export interface TimeTideState {
  categories: ActivityCategory[];
  idealDay: IdealAllocation[];
  activityLogs: ActivityLog[];
  addCategory: (category: Omit<ActivityCategory, 'id'>) => void;
  updateCategory: (category: ActivityCategory) => void;
  deleteCategory: (id: string) => void;
  setIdealDay: (allocations: IdealAllocation[]) => void;
  logActivity: (log: Omit<ActivityLog, 'id'>) => void;
  clearLogForHour: (hour: number, date: string) => void;
}