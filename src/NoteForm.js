import './NoteInput.js';
import './NoteTextarea.js';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  // Render form ke dalam Shadow DOM
  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .note-form-container {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }

          note-input,
          note-textarea,
          button {
            margin-bottom: 15px;
          }

          button {
            background-color: #10b981;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display:flex;
            align-self: flex-end;
          }
          note-input, note-textarea {
            width: 100%;
          }

          .error-message {
            color: red;
            font-size: 0.9rem;
            display: none;
          }
        </style>
        <div class="note-form-container">
          <form id="noteForm">
            <note-input></note-input>
            <div class="error-message" id="titleError">Judul minimal 5 dan maksimal 20 karakter</div>

            <note-textarea></note-textarea>
            <div class="error-message" id="bodyError">Keterangan minimal 5 dan maksimal 250 karakter</div>

            <button type="submit">Add Note</button>
          </form>
        </div>
      `;
  }

  // Menambahkan event listener untuk form submission
  addEventListeners() {
    const form = this.shadowRoot.getElementById('noteForm');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = this.shadowRoot.querySelector('note-input').value;
      const body = this.shadowRoot.querySelector('note-textarea').value;

      // Reset pesan error
      this.shadowRoot.getElementById('titleError').style.display = 'none';
      this.shadowRoot.getElementById('bodyError').style.display = 'none';

      let valid = true;

      // Validasi title
      if (!title || title.length < 5 || title.length > 20) {
        this.shadowRoot.getElementById('titleError').style.display = 'block';
        valid = false;
      }

      // Validasi body
      if (!body || body.length < 5 || body.length > 250) {
        this.shadowRoot.getElementById('bodyError').style.display = 'block';
        valid = false;
      }

      // Jika valid, trigger custom event untuk menambahkan note
      if (valid) {
        this.dispatchEvent(new CustomEvent('add-note', {
          detail: {
            title,
            body
          },
          bubbles: true,
          composed: true
        }));

        // Reset form setelah submit
        this.resetForm();
      }
    });
  }

  // Fungsi untuk mereset form (mengosongkan nilai input dan textarea)
  resetForm() {
    this.shadowRoot.querySelector('note-input').value = '';
    this.shadowRoot.querySelector('note-textarea').value = '';
  }
}

// Daftarkan custom element
customElements.define('note-form', NoteForm);