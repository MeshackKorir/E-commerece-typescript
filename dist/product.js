"use strict";
// let id = document.querySelector('#name') as HTMLInputElement
let body = document.querySelector(".body");
let image = document.querySelector('#profile');
let names = document.querySelector('#names');
let author = document.querySelector('#author');
let title = document.querySelector('#title');
let date_established = document.querySelector('#date');
let profiles = document.querySelector('.profiless');
let buttonOnClick = document.querySelector('#button');
buttonOnClick.addEventListener("click", (() => {
}));
// let body = document.querySelector('.body') as HTMLFormElement;
let currentIndex;
// Initializing an empty array
let Books = [];
body.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(names.value);
    let book = names.value.trim() != "" && image.value.trim() != "" && author.value.trim() != "" && title.value.trim() != "" && date_established.value.trim() != "";
    if (book) {
        let newBookDetails = {
            id: Books.length + 1,
            names: names.value.trim(),
            image: image.value.trim(),
            author: author.value.trim(),
            title: title.value.trim(),
            date_established: date_established.value.trim()
        };
        console.log(newBookDetails);
        Books.push(newBookDetails);
        if (currentIndex) {
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
        Books.forEach((book, index) => {
            let profiles = document.createElement('tr');
            profiles.className = "profiless";
            let numbering = document.createElement('td');
            numbering.textContent = `${index + 1}`;
            let name = document.createElement('td');
            name.textContent = book.names;
            let image = document.createElement('td');
            image.textContent = book.image;
            let author = document.createElement('td');
            author.textContent = book.author;
            let title = document.createElement('td');
            title.textContent = book.title;
            let date_established = document.createElement('td');
            date_established.textContent = book.date_established;
            let deletebtn = document.createElement('button');
            deletebtn.textContent = "Delete";
            deletebtn.style.backfaceVisibility = 'red';
            deletebtn.addEventListener('click', () => {
                this.deleteBook(index);
            });
            let updatebtn = document.createElement('button');
            updatebtn.textContent = "Update";
            updatebtn.style.backfaceVisibility = 'skyblue';
            updatebtn.addEventListener('click', () => {
                this.updateBook(index);
            });
            profiles.appendChild(names);
            profiles.appendChild(image);
            profiles.appendChild(name);
            profiles.appendChild(author);
            profiles.appendChild(date_established);
            profiles.appendChild(title);
            profiles.appendChild(deletebtn);
            profiles.appendChild(updatebtn);
        });
    }
    deleteBook(index) {
        Books.splice(index, 1);
        this.displayBooks();
    }
    updateBook(index) {
        currentIndex = index;
        console.log(currentIndex);
        // createBookform.style.display = 'flex'
        let user = Books[index];
        names.value = user.names;
        title.value = user.title;
        author.value = user.author;
        date_established.value = user.date_established;
        image.value = user.image;
    }
}
let instance = new BooksActions();
instance.displayBooks();
