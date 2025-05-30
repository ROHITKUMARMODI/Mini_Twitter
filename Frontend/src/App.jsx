import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'http://localhost:4000';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ content: '', author: '' });
  const [loading, setLoading] = useState(true);


  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/notes');
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.content.trim() || !newNote.author.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/notes', newNote);
      setNotes(prev => [...prev, res.data]);
      setNewNote({ content: '', author: '' });
    } catch (err) {
      console.error('Error posting note:', err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleLike = async (id) => {
    try {
      const res = await axios.patch(`/notes/${id}/like`);
      setNotes(prev =>
        prev.map(note => (note._id === id ? res.data : note))
      );
    } catch (err) {
      console.error('Error liking note:', err);
    }
  };

  const handleUnlike = async (id) => {
    try {
      const res = await axios.patch(`/notes/${id}/unlike`);
      setNotes(prev =>
        prev.map(note => (note._id === id ? res.data : note))
      );
    } catch (err) {
      console.error('Error unliking note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div className="app">
      <h1>Mini Twitter</h1>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Your name"
          value={newNote.author}
          onChange={(e) => setNewNote(prev => ({ ...prev, author: e.target.value }))}
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={newNote.content}
          onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Note'}
        </button>
      </form>

      <div className="notes-list">
        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map(note => (
            <div key={note._id} className="note">
              <p className="content">{note.content}</p>
              <div className="note-footer">
                <span className="author">@{note.author}</span>
                <span className="date">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <div className="actions">
                  <button
                    onClick={() => handleLike(note._id)}
                    className="like-button"
                  >
                   👍Like ({note.likes?.count ?? 0})
                  </button>
                  <button
                    onClick={() => handleUnlike(note._id)}
                    className="unlike-button"
                  >
                    👎 Unlike
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="delete-button"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
