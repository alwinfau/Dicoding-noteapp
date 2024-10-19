class NoteInput extends HTMLElement {
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
          input {
            width: 100%;
            padding: 10px;
            border: 1px solid #64748b;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #2b3748;
            margin-bottom: 8px;
            color: white; /* Warna teks input */
          }
          input:focus {
            outline: none;
            border-color: #10b981;
            background-color: #2b3748;
          }
          input::placeholder {
            color: #10b981; /* Warna placeholder */
          }
        </style>
        <input type="text" id="input" placeholder="Enter note title" />
      `;
    }

    // Getter untuk value
    get value() {
        return this.shadowRoot.querySelector('#input').value;
    }

    // Setter untuk value
    set value(val) {
        this.shadowRoot.querySelector('#input').value = val;
    }
}

customElements.define('note-input', NoteInput);