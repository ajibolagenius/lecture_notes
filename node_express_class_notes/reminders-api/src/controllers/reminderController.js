import { ReminderService } from '../services/reminderService.js';

export const ReminderController = {
    async getAllReminders(req, res) {
        try {
            const { completed, overdue, sort, limit, offset } = req.query;
            const filters = {
                completed: completed === undefined ? undefined : completed === 'true',
                overdue: overdue === 'true',
                sort,
                limit: limit ? parseInt(limit, 10) : 20,
                offset: offset ? parseInt(offset, 10) : 0,
            };

            const reminders = await ReminderService.getAllReminders(req.user.id, filters);
            res.status(200).json(reminders);
        } catch (error) {
            console.error('Error in getAllReminders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getReminderById(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id, 10);
            if (isNaN(reminderId)) {
                return res.status(400).json({ error: 'Invalid reminder ID' });
            }
            const reminder = await ReminderService.getReminderById(reminderId, req.user.id);
            res.status(200).json(reminder);
        } catch (error) {
            next(error)
        }
    },

    async createReminder(req, res) {
        try {
            const newReminder = await ReminderService.createReminder({ ...req.body, userId: req.user.id });
            res.status(201).json(newReminder);
        } catch (error) {
            console.error('Error in createReminder:', error);
            if (error.message === 'Title is required') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateReminder(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id, 10);
            if (isNaN(reminderId)) {
                return res.status(400).json({ error: 'Invalid reminder ID' });
            }
            const updated = await ReminderService.updateReminder(reminderId, req.body, req.user.id);
            res.status(200).json(updated);
        } catch (error) {
            next(error)
        }
    },

    async deleteReminder(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id, 10);
            if (isNaN(reminderId)) {
                return res.status(400).json({ error: 'Invalid reminder ID' });
            }
            const result = await ReminderService.deleteReminder(reminderId, req.user.id);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    },
};
