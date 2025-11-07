// app/index.tsx

// Redirect to the Tasks tab by default
import { Redirect } from 'expo-router';

export default function Index() {
  // When the app opens at "/", send them to the Tasks tab
  return <Redirect href="/tasks" />;
}

