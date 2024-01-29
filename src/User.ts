// // Define the types for the HTML elements
// type HTMLAnchorElementWithHref = HTMLAnchorElement & { href: string };
// type HTMLDivElementWithQuerySelector = HTMLDivElement & { querySelector: typeof document.querySelector };
// type HTMLInputElementWithQuerySelector = HTMLInputElement & { querySelector: typeof document.querySelector };
// type HTMLSpanElementWithClassName = HTMLSpanElement & { className: string };

// // Add types for your product modal elements
// type HTMLDivElementWithModalContent = HTMLDivElement & { querySelector: typeof document.querySelector };
// type HTMLHeadingElementWithId = HTMLHeadingElement & { id: string };
// type HTMLParagraphElementWithId = HTMLParagraphElement & { id: string };
// type HTMLImageElementWithId = HTMLImageElement & { id: string };
// type HTMLInputElementWithId = HTMLInputElement & { id: string };
// type HTMLButtonElementWithId = HTMLButtonElement & { id: string };

// // Navigation links
// const adminLink = document.querySelector('.navs a') as HTMLAnchorElementWithHref;

// // Header elements
// const bannerContent = document.querySelector('.banner-content') as HTMLDivElementWithQuerySelector;
// const cartSection = document.getElementById('cart-section') as HTMLDivElementWithQuerySelector;

// // Product modal elements
// const productModal = document.getElementById('product-modal') as HTMLDivElementWithModalContent;
// const productTitle = productModal.querySelector('#product-title') as HTMLHeadingElementWithId;
// const productDescription = productModal.querySelector('#product-description') as HTMLParagraphElementWithId;
// const productPrice = productModal.querySelector('#product-price') as HTMLParagraphElementWithId;
// const productImage = productModal.querySelector('#product-image') as HTMLImageElementWithId;
// const decrementQuantityBtn = productModal.querySelector('#decrement-quantity') as HTMLButtonElementWithId;
// const productQuantityInput = productModal.querySelector('#product-quantity') as HTMLInputElementWithId;
// const incrementQuantityBtn = productModal.querySelector('#increment-quantity') as HTMLButtonElementWithId;
// const addToCartBtn = productModal.querySelector('#add-to-cart') as HTMLButtonElementWithId;

// // Cart section elements
// const cartItems = document.getElementById('cart-items') as HTMLUListElement;
// const cartTotal = document.getElementById('cart-total') as HTMLSpanElementWithClassName;
// const clearCartBtn = document.getElementById('clear-cart-button') as HTMLButtonElementWithId;

// // Event listeners
// adminLink.addEventListener('click', () => {
//   // Redirect to the admin page
//   window.location.href = './Admin.html';
// });



interface Book {
  names: string;
  image: string;
  author: string;
  title: string;
  date_established: string;
}

class displayingProducts {
  private divProduct: HTMLDivElement;

  constructor() {
    this.divProduct = document.querySelector('.productsDiv') as HTMLDivElement;
  }

  displayBooks(books: Book[]) {
    if (this.divProduct instanceof HTMLElement) {
      this.divProduct.innerHTML = '';

      books.forEach((book: Book, index: number) => {
        let newRow = document.createElement('div');
        newRow.className = "profiless";

        newRow.innerHTML = `
          <table>
            <tr class="tableheading" style="gap: 15px;">

            <th><img src="${book.image}" alt="Book Image"></th>
              <th>${book.names}</th>
              <th>${book.title}</th>
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
      const books: Book[] = JSON.parse(storedBooks);
      this.displayBooks(books);
    }
  }
}

// Create an instance of displayingProducts
let instances = new displayingProducts();
window.onload = () => {
  instances.loadFromLocalStorageAndDisplay();
};


