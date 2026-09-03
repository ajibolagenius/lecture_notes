import { z } from 'zod';

// the db reminder structure

export const reminderSchema = z.object({
    id: z.number(),
    title: z.string().min(1, 'Title should be longer').max(255),
    notes: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    completed: z.boolean().optional().default(false),
    userId: z.number(),
    createdAt: z.string().datetime(),    
});

// What's allowed to be sent when CREATING

export const createReminderSchema = reminderSchema.omit({
    id: true,
    completed: true,
    createdAt: true,
    userId: true,
}
)

// What's allowed to be sent when UPDATING

export const updateReminderSchema = z.object({
    title: z.string().min(1, 'Title should be longer').max(255).optional(),
    notes: z.string().nullable().optional(),
    dueDate: z.string().datetime().nullable().optional(),
    completed: z.boolean().optional(),
})