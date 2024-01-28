"use strict";
let body = document.querySelector(".body");
let image = document.querySelector('#profile');
let names = document.querySelector('#names');
let author = document.querySelector('#author');
let title = document.querySelector('#title');
let date_established = document.querySelector('#date');
let profiles = document.querySelector('.profiless');
let buttonOnClick = document.querySelector('#button');
buttonOnClick.addEventListener("click", (() => { }));
let currentIndex;
// Initializing an empty array
let Books = [];
body.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValidBook = names.value.trim() !== "" && image.value.trim() !== "" && author.value.trim() !== "" && title.value.trim() !== "" && date_established.value.trim() !== "";
    if (isValidBook) {
        let newBookDetails = {
            id: Books.length + 1,
            names: names.value.trim(),
            image: image.value.trim(),
            author: author.value.trim(),
            title: title.value.trim(),
            date_established: date_established.value.trim(),
        };
        if (currentIndex !== undefined) {
            Books.splice(currentIndex, 1, newBookDetails);
        }
        else {
            Books.push(newBookDetails);
        }
        instance.displayBooks();
        names.value = "";
        image.value = "";
        author.value = "";
        title.value = "";
        date_established.value = "";
    }
});
class BooksActions {
    displayBooks() {
        if (profiles instanceof HTMLElement) {
            profiles.innerHTML = '';
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
                let deletebtn = document.createElement('button');
                deletebtn.textContent = "Delete";
                deletebtn.style.backgroundColor = 'red';
                deletebtn.addEventListener('click', () => {
                    this.deleteBook(index);
                });
                let updatebtn = document.createElement('button');
                updatebtn.textContent = "Update";
                updatebtn.style.backgroundColor = 'skyblue';
                updatebtn.addEventListener('click', () => {
                    this.updateBook(index);
                });
                newRow.appendChild(numbering);
                newRow.appendChild(name);
                newRow.appendChild(imageCell);
                newRow.appendChild(author);
                newRow.appendChild(title);
                newRow.appendChild(date_established);
                newRow.appendChild(deletebtn);
                newRow.appendChild(updatebtn);
                // Append the new row to the profiles element
                if (profiles instanceof HTMLElement) {
                    profiles.appendChild(newRow);
                }
                else {
                    console.error("Error: profiles element not found");
                }
            }
        });
        this.saveToLocalStorage();
    }
    deleteBook(index) {
        Books.splice(index, 1);
        this.displayBooks();
    }
    updateBook(index) {
        currentIndex = index;
        let user = Books[index];
        names.value = user.names;
        title.value = user.title;
        author.value = user.author;
        date_established.value = user.date_established;
        image.value = user.image;
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(Books));
    }
    loadFromLocalStorage() {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            Books = JSON.parse(storedBooks);
            // this.displayBooks();
        }
    }
}
let instance = new BooksActions();
instance.loadFromLocalStorage();
instance.displayBooks();
