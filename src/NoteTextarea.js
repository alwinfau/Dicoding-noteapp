class NoteTextarea extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
          textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #64748b;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #2b3748;
            margin-bottom: 8px;
            color: white; /* Warna teks dalam textarea */
          }
          textarea:focus {
            outline: none;
            border-color: #10b981;
            background-color: #2b3748;
          }
          textarea::placeholder {
            color: #10b981; /* Warna placeholder */
          }
        </style>
        <textarea id="textarea" rows="4" placeholder="Enter note details"></textarea>
      `;
    }

    // Getter untuk value
    get value() {
        return this.shadowRoot.querySelector('#textarea').value;
    }

    // Setter untuk value
    set value(val) {
        this.shadowRoot.querySelector('#textarea').value = val;
    }
}

customElements.define('note-textarea', NoteTextarea);