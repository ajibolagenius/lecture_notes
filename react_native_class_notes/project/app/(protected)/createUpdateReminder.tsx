import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createReminder, Reminder, updateReminder } from '../../services/reminderService';
import { cancelReminderNotification, scheduleReminderNotification } from '../../state/notifications';
import { colors, radii, spacing } from '../../constants/theme';

type PickerStep = 'date' | 'time' | null;

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
  // Android has no combined "datetime" mode — pick date, then time.
  const [pickerStep, setPickerStep] = useState<PickerStep>(null);

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

  function openPicker() {
    setPickerStep('date');
  }

  function handlePickerChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === 'dismissed' || !selectedDate) {
      setPickerStep(null);
      return;
    }

    if (Platform.OS === 'ios') {
      setDueDate(selectedDate);
      setPickerStep(null);
      return;
    }

    // Android has no "datetime" mode — date dialog, then time dialog.
    if (pickerStep === 'date') {
      setDueDate(selectedDate);
      setPickerStep('time');
      return;
    }

    const base = dueDate ?? selectedDate;
    const combined = new Date(base);
    combined.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
    setDueDate(combined);
    setPickerStep(null);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: existingReminder ? 'Edit Reminder' : 'New Reminder',
          headerRight: () => (
            <Text onPress={handleSave} style={{ color: colors.accent, fontWeight: '600' }}>
              Save
            </Text>
          ),
        }}
      />
      <TextInput style={styles.titleInput} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.notesInput} placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
      <Pressable onPress={openPicker}>
        <Text style={styles.dueDateText}>
          {dueDate ? dueDate.toLocaleString() : 'Set a due date (optional)'}
        </Text>
      </Pressable>
      {pickerStep && (
        <DateTimePicker
          value={dueDate ?? new Date()}
          mode={Platform.OS === 'ios' ? 'datetime' : pickerStep}
          onChange={handlePickerChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.background },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  notesInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  dueDateText: { fontSize: 16, color: colors.accent, fontWeight: '600' },
});
