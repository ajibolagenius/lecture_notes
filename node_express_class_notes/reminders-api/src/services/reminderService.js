import { ReminderModel } from '../models/reminderModel.js'
import { CustomError } from '../utils/CustomError.js';
import ERROR_MESSAGES from '../constants/errorMessages.js';

export const ReminderService = {
    async getAllReminders(userId, filters) {
        // Fetch All Reminders
        return ReminderModel.getAll(userId, filters);
    },

    async getReminderById(reminderId, userId) {
        // Fetch Reminder By Id
        const reminder = await ReminderModel.findById(reminderId);
        if (!reminder) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        if (reminder.userId !== userId) throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
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

    async updateReminder(reminderId, newValues, userId) {
        const reminder = await ReminderModel.findById(reminderId);
        if (!reminder) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        if (reminder.userId !== userId) throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
        // Update Reminder
        const updated = await ReminderModel.update(reminderId, newValues);
        if (!updated) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        return updated;
    },

    async deleteReminder(reminderId, userId) {
        const reminder = await ReminderModel.findById(reminderId);
        if (!reminder) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        if (reminder.userId !== userId) throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
        // Delete Reminder
        const rowsDeleted = await ReminderModel.delete(reminderId);
        if (rowsDeleted === 0) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        return { message: 'Reminder deleted successfully' };
    },
};
