// components/TaskCard.tsx

//this is the task card component
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Task, getTaskCompletionRate } from '../store/useStreakyStore';
import { format } from 'date-fns';

type Props = {
  task: Task;
  onMarkToday: () => void;
  onDelete: () => void;
};

export const TaskCard: React.FC<Props> = ({ task, onMarkToday, onDelete }) => {
  const completionRate = getTaskCompletionRate(task);
  const doneToday =
    task.lastCheckInDate &&
    new Date(task.lastCheckInDate).toDateString() ===
      new Date().toDateString();

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{task.title}</Text>
        <Pressable onPress={onDelete}>
          <Text style={styles.delete}>✕</Text>
        </Pressable>
      </View>

      {task.description ? (
        <Text style={styles.description}>{task.description}</Text>
      ) : null}

      <View style={styles.statsRow}>
        <Text style={styles.stat}>
          🔥 Streak: <Text style={styles.bold}>{task.currentStreak}</Text>
        </Text>
        <Text style={styles.stat}>
          🏆 Best: <Text style={styles.bold}>{task.longestStreak}</Text>
        </Text>
        <Text style={styles.stat}>
          ✅ {completionRate.toFixed(0)}%
        </Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.created}>
          Started:{' '}
          {format(new Date(task.createdAt), 'MMM d, yyyy')}
        </Text>
        <Pressable
          onPress={onMarkToday}
          disabled={!!doneToday}
          style={[
            styles.button,
            doneToday && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {doneToday ? 'Done Today ✅' : 'Mark Today'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#020817',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#111827',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    color: '#f97316',
    fontSize: 16,
  },
  title: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  description: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    color: '#9ca3af',
    fontSize: 12,
  },
  bold: {
    color: '#f9fafb',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  created: {
    color: '#6b7280',
    fontSize: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f97316',
  },
  buttonDisabled: {
    backgroundColor: '#374151',
  },
  buttonText: {
    color: '#020817',
    fontWeight: '700',
    fontSize: 12,
  },
});
