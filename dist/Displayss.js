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
      <img src="${selectedBook.image}" alt="${selectedBook.title}" id="book-image">
      <p>Author: ${selectedBook.price}</p>
      <p>Title: ${selectedBook.title}</p>
      <p>Date Established: ${selectedBook.date_established}</p>
    `;
        // Add a click event listener to the book image
        const bookImage = document.getElementById('book-image');
        if (bookImage) {
            bookImage.addEventListener('click', () => {
                // Create a modal to display additional information
                const modal = document.createElement('div');
                modal.className = 'modal';
                // Add modal content
                modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${selectedBook.names}</h2>
            <img src="${selectedBook.image}" alt="${selectedBook.title}">
            <p>Author: ${selectedBook.price}</p>
            <p>Title: ${selectedBook.title}</p>
            <p>Date Established: ${selectedBook.date_established}</p>
          </div>
        `;
                // Append modal to the body
                document.body.appendChild(modal);
                // Add event listener to close the modal when clicking the close button
                const closeButton = modal.querySelector('.close');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        modal.remove();
                    });
                }
            });
        }
    }
});
