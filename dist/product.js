"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let body = document.querySelector(".body");
let image = document.querySelector('#profile');
let names = document.querySelector('#names');
let price = document.querySelector('#itemPrice');
let title = document.querySelector('#title');
let date_established = document.querySelector('#date');
let profiles = document.querySelector('.profiless');
let buttonOnClick = document.querySelector('#button');
buttonOnClick.addEventListener("click", (() => { }));
let currentIndex;
let Books = [];
body.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let isValidBook = names.value.trim() !== "" && image.value.trim() !== "" && price.value.trim() !== "" && title.value.trim() !== "" && date_established.value.trim() !== "";
    if (isValidBook) {
        let newBookDetails = {
            id: Books.length + 1,
            names: names.value.trim(),
            image: image.value.trim(),
            price: parseFloat(price.value.trim()), // Parse as float
            title: title.value.trim(),
            date_established: date_established.value.trim(),
        };
        if (currentIndex !== undefined) {
            Books.splice(currentIndex, 1, newBookDetails);
        }
        else {
            Books.push(newBookDetails);
        }
        yield instance.saveToLocalStorage(); // Use await to ensure the data is saved
        instance.displayBooks();
        names.value = "";
        image.value = "";
        price.value = "";
        title.value = "";
        date_established.value = "";
    }
}));
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
                imageElement.className = "prodImg";
                imageElement.src = book.image;
                imageElement.alt = 'Book Image';
                imageCell.appendChild(imageElement);
                let priceCell = document.createElement('td');
                priceCell.textContent = book.price.toString();
                let title = document.createElement('td');
                title.textContent = book.title;
                let date_established = document.createElement('td');
                date_established.textContent = book.date_established;
                let deletebtn = document.createElement('button');
                deletebtn.textContent = "Delete";
                deletebtn.className = "delete-btn";
                deletebtn.style.backgroundColor = 'white';
                deletebtn.addEventListener('click', () => {
                    this.deleteBook(index);
                });
                let updatebtn = document.createElement('button');
                updatebtn.textContent = "Update";
                updatebtn.className = "update-btn";
                updatebtn.style.backgroundColor = 'darkblue';
                updatebtn.addEventListener('click', () => {
                    this.updateBook(index);
                });
                newRow.appendChild(numbering);
                newRow.appendChild(name);
                newRow.appendChild(imageCell);
                newRow.appendChild(priceCell);
                newRow.appendChild(title);
                newRow.appendChild(date_established);
                let buttonContainer = document.createElement('div');
                buttonContainer.className = "button-container";
                buttonContainer.appendChild(deletebtn);
                buttonContainer.appendChild(updatebtn);
                newRow.appendChild(buttonContainer);
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
        price.value = user.price.toString();
        date_established.value = user.date_established;
        image.value = user.image;
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield localStorage.setItem('books', JSON.stringify(Books));
        });
    }
    loadFromLocalStorage() {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            Books = JSON.parse(storedBooks);
        }
    }
}
let instance = new BooksActions();
instance.loadFromLocalStorage();
instance.displayBooks();
