import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { signup } from '../../services/authService';
import { setSession } from '../../state/session';
import { colors, radii, spacing } from '../../constants/theme';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSignup() {
    setSubmitting(true);
    try {
      const token = await signup(email.trim(), password);
      setSession(token);
      router.replace('/(protected)');
    } catch (error: any) {
      Alert.alert('Signup failed', error.message ?? 'Please try again');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.subheading}>Create an account to start tracking reminders.</Text>
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
      <Pressable style={styles.button} onPress={handleSignup} disabled={submitting}>
        <Text style={styles.buttonText}>{submitting ? 'Signing up...' : 'Sign Up'}</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Log in</Text>
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
  link: { color: colors.accent, textAlign: 'center', marginTop: spacing.sm, fontWeight: '600' },
});
