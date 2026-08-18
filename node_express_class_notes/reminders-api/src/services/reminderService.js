import { ReminderModel } from '../models/reminderModel.js'

export const ReminderService = {
    async getAllReminders(userIdOrFilters, filters) {
        // Fetch All Reminders
        return ReminderModel.getAll(userIdOrFilters, filters);
    },

    async getReminderById(reminderId) {
        // Fetch Reminder By Id
        const reminder = await ReminderModel.findById(reminderId);
        if (!reminder) throw new Error('Reminder not found');
        return reminder;
    },

    async createReminder(newReminder) {
        // Create Reminder
        const { title, notes, dueDate, due_date, userId, user_id } = newReminder || {};
        const sanitizedTitle = title?.trim();
        if (!sanitizedTitle) {
            throw new Error('Title is required');
        }

        const sanitized = {
            title: sanitizedTitle,
            notes: notes?.trim() ?? null,
            dueDate: dueDate || due_date || null,
            userId: userId || user_id || null,
        };
        return ReminderModel.create(sanitized);
    },

    async updateReminder(reminderId, newValues) {
        // Update Reminder
        const updated = await ReminderModel.update(reminderId, newValues);
        if (!updated) throw new Error('Reminder not found');
        return updated;
    },

    async deleteReminder(reminderId) {
        // Delete Reminder
        const rowsDeleted = await ReminderModel.delete(reminderId);
        if (rowsDeleted === 0) throw new Error('Reminder not found');
        return { message: 'Reminder deleted successfully' };
    },
};
