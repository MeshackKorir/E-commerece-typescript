"use strict";
// let id = document.querySelector('#name') as HTMLInputElement
let body = document.querySelector(".body");
let image = document.querySelector('#profile');
let names = document.querySelector('#name');
let author = document.querySelector('#author');
let title = document.querySelector('#title');
let date_established = document.querySelector('#date_established');
// let buttOnonClick = document.querySelector('#buttononclick') as HTMLButtonElement;
// buttOnonClick.addEventListener("click", (() =>{
// }))
// let body = document.querySelector('.body') as HTMLFormElement;
let currentIndex;
// Initializing an empty array
let Books = [];
body.addEventListener("submit", (e) => {
    e.preventDefault();
    let book = names.value.trim() != "" && image.value.trim() != "" && author.value.trim() != "" && title.value.trim() != "" && date_established.value.trim() != "";
    if (book) {
        let bookDetails = {
            id: Books.length + 1,
            names: names.value.trim(),
            image: image.value.trim(),
            author: author.value.trim(),
            title: title.value.trim(),
            date_established: date_established.value.trim()
        };
        if (currentIndex) {
            Books.splice(currentIndex, 1, bookDetails);
        }
        else {
            Books.push(bookDetails);
        }
        // instance.displayBooks()
        names.value = "";
        image.value = "";
        author.value = "";
        title.value = "";
        date_established.value = "";
    }
});
