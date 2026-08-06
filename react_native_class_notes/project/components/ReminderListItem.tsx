import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Reminder } from '../services/reminderService';
import { colors, radii, spacing } from '../constants/theme';

type Props = {
  reminderItem: Reminder;
  onToggleComplete?: (reminderItem: Reminder) => void;
  onEdit?: (reminderItem: Reminder) => void;
  onDelete?: (reminderItem: Reminder) => void;
};

function formatTime(dueDate?: string) {
  if (!dueDate) return undefined;
  return new Date(dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ReminderListItem({ reminderItem, onToggleComplete, onEdit, onDelete }: Props) {
  function handleLongPress() {
    if (!onDelete) return;
    Alert.alert('Delete reminder', `Delete "${reminderItem.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(reminderItem) },
    ]);
  }

  const subtitle = reminderItem.notes || formatTime(reminderItem.dueDate);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <Pressable
        style={[styles.checkbox, reminderItem.completed && styles.checkboxChecked]}
        onPress={() => onToggleComplete?.(reminderItem)}
        hitSlop={8}
      >
        {reminderItem.completed && <Text style={styles.checkboxMark}>✓</Text>}
      </Pressable>
      <Pressable style={styles.content} onPress={() => onEdit?.(reminderItem)} onLongPress={handleLongPress}>
        <Text style={[styles.title, reminderItem.completed && styles.completedTitle]}>
          {reminderItem.title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </Pressable>
      <Text style={styles.chevron}>›</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: radii.md - 2,
    backgroundColor: colors.accentSoft,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxMark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: colors.textSecondary,
  },
});
