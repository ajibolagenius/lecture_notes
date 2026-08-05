import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReminderListItem from '../../components/ReminderListItem';
import { deleteReminder, getReminders, Reminder, updateReminder } from '../../services/reminderService';
import { cancelReminderNotification } from '../../state/notifications';

export default function HomeScreen() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: (reminder: Reminder) => updateReminder(reminder.id, { completed: !reminder.completed }),
    onSuccess: async (_updated, reminder) => {
      if (!reminder.completed) {
        await cancelReminderNotification(reminder.id);
      }
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reminder: Reminder) => deleteReminder(reminder.id),
    onSuccess: async (_result, reminder) => {
      await cancelReminderNotification(reminder.id);
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: '20%' }} />;
  if (error) return <Text style={{ alignSelf: 'center', marginTop: '20%' }}>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ReminderListItem
            reminderItem={item}
            onToggleComplete={(reminder) => toggleCompleteMutation.mutate(reminder)}
            onEdit={(reminder) =>
              router.push({ pathname: '/(protected)/createUpdateReminder', params: { id: String(reminder.id) } })
            }
            onDelete={(reminder) => deleteMutation.mutate(reminder)}
          />
        )}
      />
      <Pressable style={styles.addButton} onPress={() => router.push('/(protected)/createUpdateReminder')}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0E7AFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: 'white', fontSize: 28 },
});
