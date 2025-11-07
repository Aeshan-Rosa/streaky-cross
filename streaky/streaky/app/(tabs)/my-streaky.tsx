// app/(tabs)/my-streaky.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  useStreakyStore,
  Task,
} from '../../store/useStreakyStore';
import { AchievementCard } from '../../components/AchievementCard';

export default function MyStreakyScreen() {
  const { achievements, tasks } = useStreakyStore();

  const unlocked = achievements.filter((a) => a.unlocked);

  const getTask = (id: string): Task | undefined =>
    tasks.find((t) => t.id === id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>My Streaky</Text>
        <Text style={styles.subtitle}>
          Your completed milestones live here. Every unlocked achievement
          is a <Text style={styles.highlight}>Streaky Done ✅</Text>
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {unlocked.length === 0 ? (
          <Text style={styles.empty}>
            No Streaky Done yet. Go crush some streaks in Tasks & Achievements 💪
          </Text>
        ) : (
          unlocked.map((ach) => (
            <View key={ach.id} style={styles.doneWrapper}>
              <Text style={styles.doneLabel}>Streaky Done</Text>
              <AchievementCard
                achievement={ach}
                task={getTask(ach.taskId)}
                compact
              />
            </View>
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
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  highlight: {
    color: '#f97316',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    marginTop: 6,
  },
  empty: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
  },
  doneWrapper: {
    marginBottom: 8,
  },
  doneLabel: {
    color: '#22c55e',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
});
