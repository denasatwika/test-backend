const { nanoid } = require('nanoid');

class notesService {
  constructor() {
    this.notes = [];
  }

  addNote({ title, tags, body }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this.notes.push(newNote);

    const isSuccess = this.notes.some((note) => note.id === id);

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getAllNotes() {
    return this.notes;
  }

  getNoteById(id) {
    // Lebih efisien, berhenti saat ketemu
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, tags, body }) {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this.notes[index] = {
      ...this.notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this.notes.splice(index, 1);
  }
}

module.exports = notesService;
