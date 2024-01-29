"use strict";
// // Define the types for the HTML elements
// type HTMLAnchorElementWithHref = HTMLAnchorElement & { href: string };
// type HTMLDivElementWithQuerySelector = HTMLDivElement & { querySelector: typeof document.querySelector };
// type HTMLInputElementWithQuerySelector = HTMLInputElement & { querySelector: typeof document.querySelector };
// type HTMLSpanElementWithClassName = HTMLSpanElement & { className: string };
// Initializing an empty array
// let Books: Book[] = [];
let divProduct = document.querySelector('.productsDiv');
const user = JSON.parse(localStorage.getItem('books') || '[]');
console.log(user);
user.forEach((used, index) => {
    const divy = document.createElement('div');
    divy.innerHTML = `

  <table class="profiless" >
  <tr class="tableheading" style="gap: 15px;">
      <th>No.</th>
      <th>${used.names}</th>
      <th>${used.image}</th>
      <th>${used.author}</th>
      <th>${used.title}</th>
      <th>${used.date_established}</th>
  </tr>
</table>

  
  
  
  `;
    divProduct.appendChild(divy);
});
class displayingProducts {
    displayBooks() {
        if (divProduct instanceof HTMLElement) {
            divProduct.innerHTML = '';
        }
        Books.forEach((book, index) => {
            let profiles = document.querySelector('.profiless');
            if (profiles) {
                let newRow = document.createElement('tr');
                newRow.className = "profiless";
                let numbering = document.createElement('td');
                numbering.textContent = `${index + 1}`;
                let name = document.createElement('td');
                name.textContent = book.names;
                let imageCell = document.createElement('td');
                let imageElement = document.createElement('img');
                imageElement.src = book.image;
                imageElement.alt = 'Book Image';
                imageCell.appendChild(imageElement);
                let author = document.createElement('td');
                author.textContent = book.author;
                let title = document.createElement('td');
                title.textContent = book.title;
                let date_established = document.createElement('td');
                date_established.textContent = book.date_established;
                newRow.appendChild(numbering);
                newRow.appendChild(name);
                newRow.appendChild(imageCell);
                newRow.appendChild(author);
                newRow.appendChild(title);
                newRow.appendChild(date_established);
                divProduct.appendChild(newRow);
            }
        });
        // this.saveToLocalStorage();
    }
}
