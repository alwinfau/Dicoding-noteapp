import notesData from './notes.js'; // Import data notes
import './NoteForm.js'; // Menghapus SearchBar jika tidak digunakan

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.notes = [...notesData]; // Salin semua data notes ke dalam array notes
    this.filteredNotes = this.notes; // Catatan yang difilter berdasarkan pencarian
  }

  connectedCallback() {
    this.render();

    const noteForm = this.shadowRoot.querySelector('note-form');

    noteForm.addEventListener('add-note', (event) => {
      this.addNote(event.detail.title, event.detail.body);

      // Reset form setelah menambahkan note
      noteForm.resetForm();
    });
  }

  // Fungsi untuk menambahkan note
  addNote(title, body) {
    if (!title || !body) {
      // Jika salah satu field kosong, tidak menambahkan note
      this.shadowRoot.querySelector('#error-message').style.display = 'block';
      return;
    }

    this.shadowRoot.querySelector('#error-message').style.display = 'none';

    const newNote = {
      id: `notes-${Date.now()}`, // ID unik menggunakan timestamp
      title,
      body,
      createdAt: new Date().toISOString() // Waktu saat catatan dibuat
    };

    this.notes.push(newNote); // Tambahkan catatan baru ke array notes
    this.filteredNotes = this.notes; // Reset filtered notes
    this.render(); // Render ulang dengan catatan baru
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            .note-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 10fr));
                gap: 10px;
                font-family: Arial, sans-serif;
                margin-top: 10px;
            }
            .note {
                border: 1px solid #475569;
                padding: 10px;
                border-radius: 5px;
                background-color: #0f172a;
            }
            .note h2 {
                font-size: 1.2rem;
                margin: 0 0 10px;
                color: #10b981;
            }
            .note p {
                font-size: 1rem;
                color: #94a3b8;
            }
            .note time {
                font-size: 0.8rem;
                color: #888;
            }

            .error-message {
                display: none;
                color: red;
                font-size: 0.9rem;
            }

        </style>

        <div class="error-message" id="error-message">Please fill in both fields!</div>
        <note-form></note-form>
        <div class="note-list">
            ${this.filteredNotes.map(note => `
                <div class="note">
                    <h2>${note.title}</h2>
                    <p>${note.body}</p>
                    <time>${new Date(note.createdAt).toLocaleString()}</time>
                </div>
            `).join('')}
        </div>
    `;
  }
}

// Daftarkan custom element
customElements.define('notes-list', NotesList);