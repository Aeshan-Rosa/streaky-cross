// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // When the app opens at "/", send them to the Tasks tab
  return <Redirect href="/tasks" />;
}
