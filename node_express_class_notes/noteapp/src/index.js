import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

// Defining the routes

app.get('/reminders', (req, res) => {
    res.send('Fetch all reminders.')
})

app.get('/reminders/:id', (req, res) => {
    res.send('Fetch one reminder by id.')
})

app.post('/reminders', (req, res) => {
    res.send('Create a new reminder.')
})

app.patch('/reminders/:id', (req, res) => {
    res.send('Update some fields for existing reminder.')
})

app.delete('/reminders/:id', (req, res) => {
    res.send('Delete a reminder.')
})


app.listen(PORT, () => {
    console.log(`Reminders API listening on port ${PORT}`)
})