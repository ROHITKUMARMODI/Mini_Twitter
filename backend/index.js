const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`));

const {getNotes, createNote, likeNote, unlikeNote, deleteNote} = require('./controller/notesController');

const noteRouter = require('./routes/notesRoutes');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
// app.use('/', noteRouter);

app.use(cors());


app.get("/",getNotes);
app.post("/notes", createNote);
app.patch("/notes/:id/like", likeNote);
app.patch("/notes/:id/unlike", unlikeNote);
app.delete("/notes/:id", deleteNote);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
module.exports = app;