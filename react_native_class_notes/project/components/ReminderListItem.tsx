import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Reminder } from '../services/reminderService';

type Props = {
  reminderItem: Reminder;
  onToggleComplete?: (reminderItem: Reminder) => void;
  onEdit?: (reminderItem: Reminder) => void;
  onDelete?: (reminderItem: Reminder) => void;
};

export default function ReminderListItem({ reminderItem, onToggleComplete, onEdit, onDelete }: Props) {
  function handleLongPress() {
    if (!onDelete) return;
    Alert.alert('Delete reminder', `Delete "${reminderItem.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(reminderItem) },
    ]);
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <Pressable
        style={[styles.checkbox, reminderItem.completed && styles.checkboxChecked]}
        onPress={() => onToggleComplete?.(reminderItem)}
        hitSlop={8}
      />
      <Pressable style={styles.content} onPress={() => onEdit?.(reminderItem)} onLongPress={handleLongPress}>
        <Text style={[styles.title, reminderItem.completed && styles.completedTitle]}>
          {reminderItem.title}
        </Text>
        {reminderItem.notes ? <Text style={styles.notes}>{reminderItem.notes}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#0E7AFE',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#0E7AFE',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  notes: {
    fontSize: 14,
    color: '#666',
  },
});
