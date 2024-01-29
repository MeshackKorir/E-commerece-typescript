"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve book details from localStorage or any other source
    const storedBooks = localStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    // Get the index of the selected book from the URL parameters or any other source
    const urlParams = new URLSearchParams(window.location.search);
    const selectedIndex = parseInt(urlParams.get('index') || '0', 10);
    const selectedBook = books[selectedIndex];
    // Display book details in the HTML container
    const detailsContainer = document.getElementById('book-details-container');
    if (detailsContainer && selectedBook) {
        detailsContainer.innerHTML = `
        <h2>${selectedBook.names}</h2>
        <p>Author: ${selectedBook.author}</p>
        <p>Title: ${selectedBook.title}</p>
        <p>Date Established: ${selectedBook.date_established}</p>
      `;
    }
});
