import { useState } from 'react';
import { View, Text, Pressable, SectionList, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReminderListItem from '../../components/ReminderListItem';
import { deleteReminder, getReminders, Reminder, updateReminder } from '../../services/reminderService';
import { cancelReminderNotification } from '../../state/notifications';
import { colors, radii, spacing } from '../../constants/theme';

type Filter = 'all' | 'active' | 'done';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
];

function sectionTitleFor(dueDate: string) {
  const date = new Date(dueDate);
  const dayMonth = date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  const weekday = date.toLocaleDateString([], { weekday: 'short' });
  return `${dayMonth}, ${weekday}`;
}

function groupByDueDate(reminders: Reminder[]) {
  const dated = new Map<string, Reminder[]>();
  const undated: Reminder[] = [];

  for (const reminder of reminders) {
    if (!reminder.dueDate) {
      undated.push(reminder);
      continue;
    }
    const dayKey = reminder.dueDate.slice(0, 10);
    const existing = dated.get(dayKey);
    if (existing) existing.push(reminder);
    else dated.set(dayKey, [reminder]);
  }

  const sections = [...dated.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, items]) => ({ title: sectionTitleFor(items[0].dueDate!), data: items }));

  if (undated.length) sections.push({ title: 'No Due Date', data: undated });

  return sections;
}

export default function HomeScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const insets = useSafeAreaInsets();
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

  const filtered = (data ?? []).filter((reminder) => {
    if (filter === 'active') return !reminder.completed;
    if (filter === 'done') return reminder.completed;
    return true;
  });
  const sections = groupByDueDate(filtered);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Reminders</Text>
        <Pressable style={styles.addButton} onPress={() => router.push('/(protected)/createUpdateReminder')}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => String(item.id)}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
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
        ListEmptyComponent={<Text style={styles.emptyText}>Nothing here — tap Add to create one.</Text>}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
      <View style={[styles.filterBarWrapper, { bottom: spacing.lg + insets.bottom }]}>
        <View style={styles.filterBar}>
          {FILTERS.map(({ key, label }) => (
            <Pressable
              key={key}
              style={[styles.filterSegment, filter === key && styles.filterSegmentActive]}
              onPress={() => setFilter(key)}
            >
              <Text style={[styles.filterLabel, filter === key && styles.filterLabelActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  heading: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  addButton: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
  },
  addButtonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  listContent: { paddingBottom: 100 },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: '20%' },
  filterBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    padding: 4,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  filterSegment: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
  },
  filterSegmentActive: {
    backgroundColor: colors.ink,
  },
  filterLabel: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  filterLabelActive: { color: colors.white },
});
