"use strict";

let body = document.querySelector(".body") as HTMLFormElement;
let image = document.querySelector('#profile') as HTMLInputElement;
let names = document.querySelector('#names') as HTMLInputElement;
let author = document.querySelector('#author') as HTMLInputElement;
let title = document.querySelector('#title') as HTMLInputElement;
let date_established = document.querySelector('#date') as HTMLInputElement;
let profiles: Element | null = document.querySelector('.profiless');
let buttonOnClick = document.querySelector('#button') as HTMLButtonElement;

buttonOnClick.addEventListener("click", (() => {}));

let currentIndex: number;

interface Book {
    id: number;
    image: string;
    names: string;
    author: string;
    title: string;
    date_established: string;
}

// Initializing an empty array
let Books: Book[] = [];

body.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValidBook = names.value.trim() !== "" && image.value.trim() !== "" && author.value.trim() !== "" && title.value.trim() !== "" && date_established.value.trim() !== "";

    if (isValidBook) {
        let newBookDetails: Book = {
            id: Books.length + 1,
            names: names.value.trim(),
            image: image.value.trim(),
            author: author.value.trim(),
            title: title.value.trim(),
            date_established: date_established.value.trim(),
        };

        if (currentIndex !== undefined) {
            Books.splice(currentIndex, 1, newBookDetails);
        } else {
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
    
        Books.forEach((book: Book, index: number) => {
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
                } else {
                    console.error("Error: profiles element not found");
                }
            }
        });

        this.saveToLocalStorage();
    }

    deleteBook(index: number) {
        Books.splice(index, 1);
        this.displayBooks();
    }

    updateBook(index: number) {
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



// class Admin {
//     private observers: User[] = [];

//     addObserver(observer: User): void {
//         this.observers.push(observer);
//     }

//     notifyObservers(product: Product): void {
//         this.observers.forEach(observer => {
//             observer.update(product);
//         });
//     }

//     addProduct(product: Product): void {
//         // Logic to add product
//         // ...

//         // Notify observers (user pages)
//         this.notifyObservers(product);
//     }
// }

// Example usage
// const admin = new Admin();

// Assuming you have a button or form to add a product
const addButton = document.getElementById('add-product-btn');
if (addButton) {
    addButton.addEventListener('click', () => {
        const product: Product = {
            title: 'New Product',
            description: 'Product description',
            price: 19.99,
            image: 'new-product.jpg',
        };

        // admin.addProduct(product);
    });
}


let instance = new BooksActions();
instance.loadFromLocalStorage();
instance.displayBooks();
