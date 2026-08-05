import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { DEMO_EMAIL, DEMO_PASSWORD, login, loginAsDemo } from '../../services/authService';
import { setSession } from '../../state/session';

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
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
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
  container: { flex: 1, padding: 24, justifyContent: 'center', gap: 12 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#0E7AFE', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  demoButton: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0E7AFE',
  },
  demoButtonText: { color: '#0E7AFE', fontWeight: '600', fontSize: 16 },
  demoHint: { color: '#666', textAlign: 'center', fontSize: 13 },
  link: { color: '#0E7AFE', textAlign: 'center', marginTop: 8 },
});
