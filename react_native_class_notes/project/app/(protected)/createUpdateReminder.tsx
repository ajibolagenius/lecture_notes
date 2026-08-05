import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createReminder, Reminder, updateReminder } from '../../services/reminderService';
import { cancelReminderNotification, scheduleReminderNotification } from '../../state/notifications';

export default function CreateUpdateReminderScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const queryClient = useQueryClient();

  const reminderId = id ? Number(id) : undefined;
  const existingReminder = reminderId
    ? queryClient.getQueryData<Reminder[]>(['reminders'])?.find((reminder) => reminder.id === reminderId)
    : undefined;

  const [title, setTitle] = useState(existingReminder?.title ?? '');
  const [notes, setNotes] = useState(existingReminder?.notes ?? '');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    existingReminder?.dueDate ? new Date(existingReminder.dueDate) : undefined
  );
  const [showPicker, setShowPicker] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const input = { title: title.trim(), notes: notes.trim() || undefined, dueDate: dueDate?.toISOString() };
      return existingReminder ? updateReminder(existingReminder.id, input) : createReminder(input);
    },
    onSuccess: async (savedReminder) => {
      if (existingReminder) {
        await cancelReminderNotification(savedReminder.id);
      }
      if (savedReminder.dueDate) {
        await scheduleReminderNotification(savedReminder.id, savedReminder.title, savedReminder.dueDate);
      }
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      router.back();
    },
    onError: (error: any) => Alert.alert('Could not save reminder', error.message),
  });

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('A title is required');
      return;
    }
    mutation.mutate();
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: existingReminder ? 'Edit Reminder' : 'New Reminder',
          headerRight: () => (
            <Text onPress={handleSave} style={{ color: '#0E7AFE' }}>
              Save
            </Text>
          ),
        }}
      />
      <TextInput style={styles.titleInput} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.notesInput} placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
      <Pressable onPress={() => setShowPicker(true)}>
        <Text style={styles.dueDateText}>
          {dueDate ? dueDate.toLocaleString() : 'Set a due date (optional)'}
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={dueDate ?? new Date()}
          mode="datetime"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  titleInput: { fontSize: 20, fontWeight: '600', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 8 },
  notesInput: { fontSize: 16, minHeight: 80, textAlignVertical: 'top' },
  dueDateText: { fontSize: 16, color: '#0E7AFE' },
});
