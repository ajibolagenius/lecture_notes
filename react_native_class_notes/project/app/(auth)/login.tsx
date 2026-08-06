import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { DEMO_EMAIL, DEMO_PASSWORD, login, loginAsDemo } from '../../services/authService';
import { setSession } from '../../state/session';
import { colors, radii, spacing } from '../../constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function enterApp(getToken: () => Promise<string>) {
    setSubmitting(true);
    try {
      const token = await getToken();
      setSession(token);
      router.replace('/(protected)');
    } catch (error: any) {
      Alert.alert('Login failed', error.message ?? 'Please try again');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log In</Text>
      <Text style={styles.subheading}>Welcome back — your reminders are waiting.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        style={styles.button}
        onPress={() => enterApp(() => login(email.trim(), password))}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>{submitting ? 'Logging in...' : 'Log In'}</Text>
      </Pressable>
      <Pressable style={styles.demoButton} onPress={() => enterApp(loginAsDemo)} disabled={submitting}>
        <Text style={styles.demoButtonText}>Continue as demo</Text>
      </Pressable>
      <Text style={styles.demoHint}>
        Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
      </Text>
      <Pressable onPress={() => router.push('/(auth)/signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: 'center', gap: spacing.md, backgroundColor: colors.background },
  heading: { fontSize: 32, fontWeight: '700', color: colors.textPrimary },
  subheading: { fontSize: 15, color: colors.textSecondary, marginBottom: spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  button: { backgroundColor: colors.ink, padding: spacing.md + 2, borderRadius: radii.pill, alignItems: 'center' },
  buttonText: { color: colors.white, fontWeight: '600', fontSize: 16 },
  demoButton: {
    backgroundColor: colors.surface,
    padding: spacing.md + 2,
    borderRadius: radii.pill,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  demoButtonText: { color: colors.accent, fontWeight: '600', fontSize: 16 },
  demoHint: { color: colors.textSecondary, textAlign: 'center', fontSize: 13 },
  link: { color: colors.accent, textAlign: 'center', marginTop: spacing.sm, fontWeight: '600' },
});
