// app/(tabs)/achievements.tsx
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
  Task,
} from '../../store/useStreakyStore';
import { AchievementCard } from '../../components/AchievementCard';

export default function AchievementsScreen() {
  const {
    tasks,
    achievements,
    addAchievement,
    deleteAchievement,
  } = useStreakyStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDays, setTargetDays] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const onCreate = () => {
    const days = parseInt(targetDays || '0', 10);
    if (!title.trim() || !selectedTaskId || isNaN(days) || days <= 0) {
      return;
    }
    addAchievement(title, description, selectedTaskId, days);
    setTitle('');
    setDescription('');
    setTargetDays('');
    // lock: cannot edit after this by design
  };

  const getTask = (id: string): Task | undefined =>
    tasks.find((t) => t.id === id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Streaky • Achievements</Text>
        <Text style={styles.subtitle}>
          Link milestones to your tasks. Once created, they are locked 🔒
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Achievement title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5-day reading streak"
          placeholderTextColor="#6b7280"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>For which task?</Text>
        {tasks.length === 0 ? (
          <Text style={styles.helper}>
            Create a task in the Tasks tab first.
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.taskChipsRow}
          >
            {tasks.map((task) => {
              const selected = selectedTaskId === task.id;
              return (
                <Pressable
                  key={task.id}
                  onPress={() => setSelectedTaskId(task.id)}
                  style={[
                    styles.taskChip,
                    selected && styles.taskChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.taskChipText,
                      selected && styles.taskChipTextSelected,
                    ]}
                  >
                    {task.title}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <Text style={styles.label}>Target streak (days)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5"
          placeholderTextColor="#6b7280"
          keyboardType="numeric"
          value={targetDays}
          onChangeText={setTargetDays}
        />

        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="What does this achievement mean?"
          placeholderTextColor="#6b7280"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Pressable
          onPress={onCreate}
          style={[
            styles.createButton,
            (!title.trim() ||
              !selectedTaskId ||
              !targetDays.trim()) && styles.createButtonDisabled,
          ]}
        >
          <Text style={styles.createButtonText}>Create Achievement</Text>
        </Pressable>

        <Text style={styles.lockNote}>
          Note: After you create an achievement, it cannot be edited.
          (You can delete locked ones if you made a mistake.)
        </Text>
      </View>

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {achievements.length === 0 ? (
          <Text style={styles.empty}>
            No achievements yet. Create one above to gamify your streaks 🏆
          </Text>
        ) : (
          achievements.map((ach) => (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              task={getTask(ach.taskId)}
              onDelete={
                ach.unlocked
                  ? undefined // locked fully when unlocked
                  : () => deleteAchievement(ach.id)
              }
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
    marginBottom: 10,
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
  form: {
    marginBottom: 10,
  },
  label: {
    color: '#e5e7eb',
    fontSize: 11,
    marginBottom: 2,
    marginTop: 4,
  },
  helper: {
    color: '#6b7280',
    fontSize: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#020817',
    borderColor: '#111827',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#e5e7eb',
    fontSize: 12,
    marginBottom: 4,
  },
  inputMultiline: {
    minHeight: 40,
    textAlignVertical: 'top',
  },
  taskChipsRow: {
    marginBottom: 4,
    maxHeight: 40,
  },
  taskChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#111827',
    marginRight: 6,
  },
  taskChipSelected: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  taskChipText: {
    color: '#9ca3af',
    fontSize: 11,
  },
  taskChipTextSelected: {
    color: '#020817',
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#f97316',
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 4,
  },
  createButtonDisabled: {
    opacity: 0.4,
  },
  createButtonText: {
    color: '#020817',
    fontWeight: '700',
    fontSize: 13,
  },
  lockNote: {
    color: '#6b7280',
    fontSize: 9,
    marginTop: 4,
  },
  list: {
    flex: 1,
    marginTop: 6,
  },
  empty: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
