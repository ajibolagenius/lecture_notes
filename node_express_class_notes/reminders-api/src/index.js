import express from 'express';
// import reminderRoutes from './routes/reminderRoutes.js'
import authRoutes from './routes/authRoutes.js';

// Create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 3000;


/* Mounting the Router */
app.use(express.json())
app.use('/api/v1/auth', authRoutes);

/*  Listening for incoming requests */
app.listen(PORT, () => {
    console.log(`Reminders API listening on port ${PORT}!`);
});
