// store/useStreakyStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInCalendarDays, isToday } from 'date-fns';

export type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt: string; // ISO
  lastCheckInDate?: string; // ISO
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
};

export type Achievement = {
  id: string;
  title: string;
  description?: string;
  taskId: string;
  targetDays: number;
  createdAt: string; // ISO
  unlocked: boolean;
  unlockedAt?: string; // ISO
};

type StreakyState = {
  tasks: Task[];
  achievements: Achievement[];

  addTask: (title: string, description?: string) => void;
  deleteTask: (taskId: string) => void;

  markTaskToday: (taskId: string) => void;

  addAchievement: (
    title: string,
    description: string | undefined,
    taskId: string,
    targetDays: number
  ) => void;
  deleteAchievement: (achievementId: string) => void;
};

function calculateCompletionRateForTask(task: Task): number {
  const created = new Date(task.createdAt);
  const today = new Date();
  const days = differenceInCalendarDays(today, created) + 1;
  if (days <= 0) return 0;
  if (task.totalCompletions === 0) return 0;
  return (task.totalCompletions / days) * 100;
}

export const useStreakyStore = create<StreakyState>()(
  persist(
    (set, get) => ({
      tasks: [],
      achievements: [],

      addTask: (title, description) => {
        const now = new Date().toISOString();
        const newTask: Task = {
          id: `task-${now}-${Math.random().toString(36).slice(2, 8)}`,
          title: title.trim(),
          description: description?.trim() || '',
          createdAt: now,
          currentStreak: 0,
          longestStreak: 0,
          totalCompletions: 0,
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
          achievements: state.achievements.filter((a) => a.taskId !== taskId),
        }));
      },

      markTaskToday: (taskId) => {
        const now = new Date();

        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id !== taskId) return task;

            if (task.lastCheckInDate && isToday(new Date(task.lastCheckInDate))) {
              return task; // already done today
            }

            let newCurrentStreak = 1;
            if (task.lastCheckInDate) {
              const diff = differenceInCalendarDays(now, new Date(task.lastCheckInDate));
              if (diff === 1) {
                newCurrentStreak = task.currentStreak + 1;
              } else {
                newCurrentStreak = 1;
              }
            }

            const newLongestStreak = Math.max(task.longestStreak, newCurrentStreak);

            const updatedTask: Task = {
              ...task,
              lastCheckInDate: now.toISOString(),
              currentStreak: newCurrentStreak,
              longestStreak: newLongestStreak,
              totalCompletions: task.totalCompletions + 1,
            };

            return updatedTask;
          });

          // auto-unlock achievements connected to this task
          const updatedAchievements = state.achievements.map((ach) => {
            if (ach.unlocked || ach.taskId !== taskId) return ach;
            const task = updatedTasks.find((t) => t.id === taskId);
            if (!task) return ach;

            if (task.currentStreak >= ach.targetDays) {
              return {
                ...ach,
                unlocked: true,
                unlockedAt: now.toISOString(),
              };
            }
            return ach;
          });

          return {
            tasks: updatedTasks,
            achievements: updatedAchievements,
          };
        });
      },

      addAchievement: (title, description, taskId, targetDays) => {
        const now = new Date().toISOString();
        const newAchievement: Achievement = {
          id: `ach-${now}-${Math.random().toString(36).slice(2, 8)}`,
          title: title.trim(),
          description: description?.trim() || '',
          taskId,
          targetDays,
          createdAt: now,
          unlocked: false,
        };
        set((state) => ({
          achievements: [newAchievement, ...state.achievements],
        }));
      },

      deleteAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.filter((a) => a.id !== achievementId),
        }));
      },
    }),
    {
      name: 'streaky-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        achievements: state.achievements,
      }),
    }
  )
);

// Helpers that screens can reuse
export function getGlobalStats() {
  const { tasks } = useStreakyStore.getState();
  if (!tasks.length) {
    return {
      longestStreak: 0,
      completionRate: 0,
    };
  }

  const longestStreak = Math.max(...tasks.map((t) => t.longestStreak));
  const rates = tasks.map((t) => calculateCompletionRateForTask(t));
  const completionRate =
    rates.reduce((a, b) => a + b, 0) / (rates.length || 1);

  return {
    longestStreak: isFinite(longestStreak) ? longestStreak : 0,
    completionRate: isFinite(completionRate) ? completionRate : 0,
  };
}

export function getTaskCompletionRate(task: Task) {
  return calculateCompletionRateForTask(task);
}
