"use strict";
// // Define the types for the HTML elements
// type HTMLAnchorElementWithHref = HTMLAnchorElement & { href: string };
// type HTMLDivElementWithQuerySelector = HTMLDivElement & { querySelector: typeof document.querySelector };
// type HTMLInputElementWithQuerySelector = HTMLInputElement & { querySelector: typeof document.querySelector };
// type HTMLSpanElementWithClassName = HTMLSpanElement & { className: string };
class displayingProducts {
    constructor() {
        this.divProduct = document.querySelector('.productsDiv');
    }
    displayBooks(books) {
        if (this.divProduct instanceof HTMLElement) {
            this.divProduct.innerHTML = '';
            books.forEach((book, index) => {
                let newRow = document.createElement('div');
                newRow.className = "profiless";
                newRow.innerHTML = `
          <table>
            <tr class="tableheading" style="gap: 15px;">
              
              <th>${book.names}</th>
              <th><img src="${book.image}" alt="Book Image"></th>
              <th>${book.author}</th>
              <th>${book.title}</th>
              <th>${book.date_established}</th>
            </tr>
          </table>
        `;
                this.divProduct.appendChild(newRow);
            });
        }
    }
    loadFromLocalStorageAndDisplay() {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            const books = JSON.parse(storedBooks);
            this.displayBooks(books);
        }
    }
}
// Create an instance of displayingProducts
let instances = new displayingProducts();
window.onload = () => {
    instances.loadFromLocalStorageAndDisplay();
};
