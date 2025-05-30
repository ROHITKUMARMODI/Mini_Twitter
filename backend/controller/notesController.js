const mongoose = require('mongoose');
const noteRouter = require('express').Router();
const Note = require('../models/notesModels');


let getNotes=noteRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

let createNote = noteRouter.post("/notes", async (req, res) => {
    const { content, author,like } = req.body;
    console.log("Content:", content);
    console.log("Author:", author);
    const note = new Note({
        content,
        author,
        like
    });
    try {
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

let likeNote = noteRouter.patch("/notes/:id/like", async (req, res) => {
    const { id } = req.params;
    const { content, author,like } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { content, author,like },
            { new: true, runValidators: true }
        );      
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


let unlikeNote = noteRouter.patch("/notes/:id/unlike", async (req, res) => {
    const { id } = req.params;

    try {
        const updatedNote = await Note.findByIdAndUpdate        
(id, { $inc: { like: -1 } }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


let deleteNote = noteRouter.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports ={
    getNotes,
    createNote,
    likeNote,
    unlikeNote,
    deleteNote
};