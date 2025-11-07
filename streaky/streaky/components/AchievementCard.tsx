// components/AchievementCard.tsx

// AchievementCard component to display achievement details
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Achievement, Task } from '../store/useStreakyStore';
import { format } from 'date-fns';

type Props = {
  achievement: Achievement;
  task?: Task;
  onDelete?: () => void;
  compact?: boolean; // for My Streaky view
};

export const AchievementCard: React.FC<Props> = ({
  achievement,
  task,
  onDelete,
  compact,
}) => {
  const unlocked = achievement.unlocked;

  return (
    <View
      style={[
        styles.card,
        unlocked ? styles.cardUnlocked : styles.cardLocked,
        compact && styles.compactCard,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>
          {unlocked ? '⭐ ' : '🔒 '}
          {achievement.title}
        </Text>
        {onDelete && !unlocked && (
          <Pressable onPress={onDelete}>
            <Text style={styles.delete}>✕</Text>
          </Pressable>
        )}
      </View>

      {task && (
        <Text style={styles.linked}>
          Task: <Text style={styles.linkedName}>{task.title}</Text>
        </Text>
      )}

      {achievement.description ? (
        <Text style={styles.description}>
          {achievement.description}
        </Text>
      ) : null}

      <Text style={styles.meta}>
        🎯 Target: {achievement.targetDays} day streak
      </Text>

      {unlocked && achievement.unlockedAt && (
        <Text style={styles.unlockedText}>
          Streaky Done on{' '}
          {format(new Date(achievement.unlockedAt), 'MMM d, yyyy')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
  },
  compactCard: {
    marginBottom: 6,
    padding: 8,
  },
  cardLocked: {
    backgroundColor: '#020817',
    borderColor: '#111827',
  },
  cardUnlocked: {
    backgroundColor: '#022c22',
    borderColor: '#22c55e',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    color: '#f97316',
    fontSize: 14,
  },
  title: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  linked: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 2,
  },
  linkedName: {
    color: '#e5e7eb',
    fontWeight: '500',
  },
  description: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 4,
  },
  meta: {
    color: '#6b7280',
    fontSize: 10,
    marginTop: 4,
  },
  unlockedText: {
    color: '#bbf7d0',
    fontSize: 10,
    marginTop: 4,
  },
});
