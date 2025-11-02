import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#EAF7FF', dark: '#0E1B21' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Header / Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Welcome..
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Tagline */}
      <ThemedView style={styles.taglineContainer}>
        <ThemedText type="subtitle" style={styles.tagline}>
          Build habits, one day at a time.
        </ThemedText>
        <ThemedText style={styles.muted}>
          Track daily check-ins, keep your streak alive, and celebrate progress.
        </ThemedText>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Get Started
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Add your first task (e.g., <ThemedText type="defaultSemiBold">“Read 20 pages”</ThemedText>)
          and tap <ThemedText type="defaultSemiBold">Mark Today</ThemedText> each day you complete it.
        </ThemedText>

        {/* Use your existing /modal route as an example entry point */}
        <Link href="/modal">
          <Link.Trigger>
            <ThemedView style={styles.primaryButton}>
              <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
                ➕ Add Your First Task
              </ThemedText>
            </ThemedView>
          </Link.Trigger>
          <Link.Preview />
        </Link>
      </ThemedView>

      {/* Features */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Why you’ll love Streaky
        </ThemedText>

        <ThemedView style={styles.bullet}>
          <ThemedText type="defaultSemiBold">📅 Daily Check-ins</ThemedText>
          <ThemedText style={styles.bulletText}>
            Tap once a day to keep your streak going—simple and satisfying.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.bullet}>
          <ThemedText type="defaultSemiBold">🔥 Live Streaks</ThemedText>
          <ThemedText style={styles.bulletText}>
            See your current streak and longest streak at a glance.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.bullet}>
          <ThemedText type="defaultSemiBold">💾 Local-First</ThemedText>
          <ThemedText style={styles.bulletText}>
            Your data is stored on your device with offline support.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.bullet}>
          <ThemedText type="defaultSemiBold">🔔 Gentle Reminders</ThemedText>
          <ThemedText style={styles.bulletText}>
            Optional daily reminder at 8:00 PM to never miss a check-in.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Tips & Developer Tools */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Pro Tips
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          • Start small—choose habits you can finish in under 10 minutes.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          • Keep your streak alive—consistency beats intensity.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          • Celebrate milestones—enjoy the progress you’re making!
        </ThemedText>

        <ThemedView style={styles.divider} />

        <ThemedText type="defaultSemiBold" style={styles.devToolsTitle}>
          Developer Tools
        </ThemedText>
        <ThemedText style={styles.muted}>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to customize
          this screen. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: '⌘ + D',
              android: '⌘ + M',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>

        <ThemedText style={[styles.muted, { marginTop: 8 }]}>
          Need a clean slate? Run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to move your current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText> and start fresh.
        </ThemedText>
      </ThemedView>

      {/* Explore / Secondary Actions */}
      <ThemedView style={styles.card}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedView style={styles.secondaryButton}>
              <ThemedText type="defaultSemiBold" style={styles.secondaryButtonText}>
                📖 Explore Demo Screen
              </ThemedText>
            </ThemedView>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>
        <ThemedText style={[styles.muted, { marginTop: 8 }]}>
          This links to your existing <ThemedText type="defaultSemiBold">/modal</ThemedText> route.
          Swap it to your “Add Task” or “Tasks” screen when ready.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Header
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  title: {
    letterSpacing: 0.5,
  },

  // Tagline
  taglineContainer: {
    gap: 6,
    marginBottom: 14,
  },
  tagline: {
    fontSize: 18,
  },
  muted: {
    opacity: 0.7,
  },

  // Cards
  card: {
    gap: 10,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    overflow: 'hidden',
    // Soft surface feel with subtle border
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(127,127,127,0.25)',
  },
  cardTitle: {
    marginBottom: 2,
  },
  paragraph: {
    lineHeight: 20,
  },

  // Bullets
  bullet: {
    marginTop: 6,
    gap: 2,
  },
  bulletText: {
    opacity: 0.9,
  },

  // Buttons
  primaryButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // Slight elevation feel
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    // Adaptive background using opacity so it looks nice in light/dark
    backgroundColor: 'rgba(0, 153, 255, 0.15)',
  },
  primaryButtonText: {
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(127,127,127,0.35)',
  },
  secondaryButtonText: {
    fontSize: 15,
  },

  // Dev Tools
  devToolsTitle: {
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(127,127,127,0.25)',
    marginVertical: 10,
    borderRadius: 1,
  },

  // Header image
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.9,
  },
});
