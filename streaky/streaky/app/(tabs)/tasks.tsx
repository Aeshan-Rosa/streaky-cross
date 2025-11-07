// app/(tabs)/tasks.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  useStreakyStore,
  getGlobalStats,
} from '../../store/useStreakyStore';
import { TaskCard } from '../../components/TaskCard';

export default function TasksScreen() {
  const { tasks, addTask, markTaskToday, deleteTask } = useStreakyStore();
  const { longestStreak, completionRate } = getGlobalStats();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onAdd = () => {
    if (!title.trim()) return;
    addTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      {/* Header / Summary */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Streaky • Tasks</Text>
        <Text style={styles.subtitle}>
          Build streaks with tile-style tasks.
        </Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Tasks</Text>
            <Text style={styles.summaryValue}>{tasks.length}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Best Streak</Text>
            <Text style={styles.summaryValue}>{longestStreak}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Avg Completion</Text>
            <Text style={styles.summaryValue}>
              {completionRate.toFixed(0)}%
            </Text>
          </View>
        </View>
      </View>

      {/* New Task Form */}
      <View style={styles.form}>
        <Text style={styles.formLabel}>Add a new task</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Read 10 pages"
          placeholderTextColor="#6b7280"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Short description (optional)"
          placeholderTextColor="#6b7280"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Pressable onPress={onAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </Pressable>
      </View>

      {/* Tasks List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {tasks.length === 0 ? (
          <Text style={styles.empty}>
            No tasks yet. Start by adding one above 👆
          </Text>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMarkToday={() => markTaskToday(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020817',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 14,
  },
  appTitle: {
    color: '#f97316',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#020817',
    borderWidth: 1,
    borderColor: '#111827',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  summaryLabel: {
    color: '#6b7280',
    fontSize: 10,
  },
  summaryValue: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    marginBottom: 10,
  },
  formLabel: {
    color: '#e5e7eb',
    fontSize: 13,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#020817',
    borderColor: '#111827',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#e5e7eb',
    fontSize: 13,
    marginBottom: 6,
  },
  inputMultiline: {
    minHeight: 40,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#f97316',
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#020817',
    fontWeight: '700',
    fontSize: 13,
  },
  list: {
    flex: 1,
    marginTop: 4,
  },
  empty: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
