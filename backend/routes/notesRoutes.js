const mongoose = require("mongoose");

const {getNotes, createNote, likeNote, unlikeNote,deleteNote} = require("../controller/notesController");

const noteRouter = require("express").Router();

noteRouter.get("/", getNotes);
noteRouter.post("/notes", createNote);
noteRouter.patch("/notes/:id/like", likeNote);
noteRouter.patch("/notes/:id/unlike", unlikeNote);
noteRouter.delete("/notes/:id", deleteNote);

module.exports = noteRouter;
