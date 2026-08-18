import db from '../config/db.js'

export const ReminderModel = {
  async getAll(userIdOrFilters, options = {}) {
    let userId;
    let filters;

    if (typeof userIdOrFilters === 'object' && userIdOrFilters !== null) {
      filters = userIdOrFilters;
      userId = filters.userId;
    } else {
      userId = userIdOrFilters;
      filters = options;
    }

    const { completed, overdue, sort, limit = 20, offset = 0 } = filters || {};
    const conditions = [];
    const values = [];

    if (userId !== undefined && userId !== null) {
      values.push(userId);
      conditions.push(`user_id = $${values.length}`);
    }

    if (completed !== undefined) {
      values.push(completed);
      conditions.push(`completed = $${values.length}`);
    }

    if (overdue) {
      conditions.push('due_date < NOW() AND completed = FALSE');
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const orderBy = sort === 'createdAt' ? 'created_at ASC' : 'created_at DESC';

    values.push(limit, offset);
    const query = `
      SELECT * FROM reminders
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT $${values.length - 1} OFFSET $${values.length}
    `;

    const result = await db.query(query, values);
    return result.rows;
  },

  async findById(id) {
    if (isNaN(id)) return null;
    const result = await db.query('SELECT * FROM reminders WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ title, notes, dueDate, due_date, userId, user_id }) {
    const resolvedDueDate = dueDate !== undefined ? dueDate : (due_date ?? null);
    const resolvedUserId = userId !== undefined ? userId : (user_id ?? null);
    const result = await db.query(
      `INSERT INTO reminders (title, notes, due_date, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, notes ?? null, resolvedDueDate, resolvedUserId]
    );
    return result.rows[0];
  },

  async update(id, newValues) {
    if (isNaN(id)) return null;

    const columnMap = {
      title: 'title',
      notes: 'notes',
      completed: 'completed',
      dueDate: 'due_date',
      due_date: 'due_date',
      userId: 'user_id',
      user_id: 'user_id',
    };

    const keys = Object.keys(newValues);
    if (keys.length === 0) {
      return this.findById(id);
    }

    const setClauses = [];
    const values = [];

    for (const key of keys) {
      const colName = columnMap[key] || key;
      values.push(newValues[key]);
      setClauses.push(`${colName} = $${values.length}`);
    }

    values.push(id);

    const query = `
      UPDATE reminders
      SET ${setClauses.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    if (isNaN(id)) return 0;
    const result = await db.query('DELETE FROM reminders WHERE id = $1', [id]);
    return result.rowCount;
  },
};
