class AppBar extends HTMLElement {
  constructor() {
    super();

    // Buat Shadow DOM
    this.attachShadow({
      mode: 'open'
    });

    // Template HTML untuk AppBar
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            background-color: #0f172a;
            margin-bottom: 30px;
            color: white;
            padding: 10px;
            font-family: Arial, sans-serif;
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          header {
            display: flex;
            justify-content: space-between; 
            align-items: center; 
            max-width: 1080px; 
            margin: 0 auto;
          }
          .logo {
            display: flex;
            align-items: center;
          }
          .logo img {
            height: 40px; /* Ukuran logo */
            margin-right: 10px;
          }
          h1 {
            margin: 0;
            font-size: 24px;
          }
          nav {
            margin-top: 8px;
          }
          search-bar {
            margin-left: auto; /* Taruh search bar di sebelah kanan */
          }

          nav a {
            color: white;
            text-decoration: none;
            margin-right: 16px;
          }
          nav a:hover {
            text-decoration: underline;
          }

          /* Responsive styling */
          @media (max-width: 768px) {
            header {
              flex-direction: column;
              align-items: flex-start;
            }
            .logo h1 {
              font-size: 20px; 
              width: 100%;
              margin-bottom: 10px;
              display: flex;
              text-align: center;
            }
            search-bar {
              width: 100%; 
            }
          }
        </style>
  
        <header>
          <div class="logo">
            <h1>NOTE APP</h1>
          </div>
          <search-bar></search-bar>
        </header>
      `;
  }
}

// Daftarkan Custom Element
customElements.define('app-bar', AppBar);