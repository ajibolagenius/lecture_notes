import express from 'express';

// Create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 3000;


/* Routes — Defining Your First Routes
 */

app.get('/reminders', (req, res) => {
    res.send('Get all reminders.');
});

app.get('/reminders/:id', (req, res) => {
    res.send('Get single reminder by ID.');
});

app.post('/reminders', (req, res) => {
    res.send('Create a new reminder.');
});

app.patch('/reminders/:id', (req, res) => {
    res.send('Update a reminder by ID.');
});

app.delete('/reminders/:id', (req, res) => {
    res.send('Delete a reminder by ID.');
});

/*  Listening for incoming requests */
app.listen(PORT, () => {
    console.log(`Reminders API listening on port ${PORT}`);
});
