const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({ 
    content: {
    type: String,
    required: true,
    default:null,
    },
    author:{
    type: String,
    required: true,
    },
    like:{
    type: Number,
    default: 0,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
  
});


const Note = mongoose.model('Note', noteSchema);
module.exports = Note;