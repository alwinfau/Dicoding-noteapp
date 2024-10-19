// SearchBar.js
class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
          input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
        </style>
        <input type="text" placeholder="Cari catatan..." />
      `;

        // Tambahkan event listener untuk input
        const input = this.shadowRoot.querySelector('input');
        input.addEventListener('input', () => {
            const query = input.value;
            this.dispatchEvent(new CustomEvent('search', {
                detail: {
                    query
                },
                bubbles: true,
                composed: true
            }));
        });
    }
}

// Daftarkan custom element
customElements.define('search-bar', SearchBar);