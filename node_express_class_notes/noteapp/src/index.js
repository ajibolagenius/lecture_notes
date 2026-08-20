import express from 'express';
import reminderRoutes from './routes/reminderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/v1/reminders', reminderRoutes);

app.listen(PORT, () => {
  console.log(`Reminders API listening on port ${PORT}`);
});
