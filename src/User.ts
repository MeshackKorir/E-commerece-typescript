"use strict";

interface Book {
  names: string;
  image: string;
  price: number;
  title: string;
  date_established: string;
}

type HTMLSpanElementWithClassName = HTMLSpanElement & { className: string };

class DisplayingProducts {
  private divProduct: HTMLDivElement;
  private cart: { book: Book; quantity: number }[];

  constructor() {
    this.divProduct = document.querySelector('.productsDiv') as HTMLDivElement;
    this.cart = this.loadCartFromLocalStorage();

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.divProduct.addEventListener('click', (event) => {
      this.handleButtonClick(event);
    });
  }

  private handleButtonClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('add-to-cart-btn')) {
      const index = target.getAttribute('data-index');

      if (index !== null) {
        const selectedBook = this.getBookFromIndex(index);

        if (selectedBook) {
          this.addToCart(selectedBook);
          this.displayCart();
        }
      }
    }
  }

  private getBookFromIndex(index: string): Book | undefined {
    const storedBooks = localStorage.getItem('books');

    if (storedBooks) {
      const books: Book[] = JSON.parse(storedBooks);
      return books[parseInt(index, 10)];
    }

    return undefined;
  }

  displayBooks(books: Book[]) {
    this.divProduct.innerHTML = '';
  
    books.forEach((book: Book, index: number) => {
      const productContainer = document.createElement('div');
      productContainer.className = 'profiless';
  
      productContainer.innerHTML = `
        <div class="card">
          <img src="${book.image}" alt="Book Image" class="imageSpace">
          <p>${book.names}</p>
          <p>Price: $${book.price}</p> <!-- Include the price information -->
          <div class="button-container">
            <button class="add-to-cart-btn" data-index="${index}" style= " border: none">Add to cart</button>
            <a href="#" class="view-details-link" data-index="${index}" style="background-color: #0a0a23; color: white;">View Details</a>
          </div>
        </div>
      `;
  
      this.divProduct.appendChild(productContainer);
  
      // Attach event listener for the "View Details" link
      const viewDetailsLink = productContainer.querySelector('.view-details-link') as HTMLAnchorElement;
      viewDetailsLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `Product.html?index=${index}`;
      });
    });
  }

  addToCart(book: Book) {
    const existingCartItem = this.cart.find((cartItem) => cartItem.book?.names === book.names);

    if (existingCartItem) {
      // If the item is already in the cart, increase its quantity
      existingCartItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart with quantity 1
      const newCartItem = { book, quantity: 1 };
      this.cart.push(newCartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }

  loadFromLocalStorageAndDisplay() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      const books: Book[] = JSON.parse(storedBooks);
      this.displayBooks(books);
    }
  }

  loadCartFromLocalStorage(): { book: Book; quantity: number }[] {
    const storedCart = localStorage.getItem('cartItems');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    return this.cart;
  }

  displayCart() {
    const cartItems = document.getElementById('cart-items') as HTMLDivElement;
    const cartTotal = document.getElementById('cart-total') as HTMLSpanElementWithClassName;

    if (cartItems && cartTotal) {
      cartItems.innerHTML = '';
      let count = 0;

      this.cart.forEach((cartItem, index) => {
        count += cartItem.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';

        const cartName = document.createElement('div');
        cartName.className = 'cart-name';
        cartName.textContent = cartItem.book.names;

        const cartImg = document.createElement('img');
        cartImg.className = 'cart-img';
        cartImg.setAttribute('src', cartItem.book.image);
        cartImg.className = 'user-images';

        const cartQuantity = document.createElement('div');
        cartQuantity.className = 'cart-quantity';
        cartQuantity.textContent = `Quantity: ${cartItem.quantity}`;

        const delItem = document.createElement('button');
        delItem.className = 'del-item';
        delItem.textContent = 'Delete';

        delItem.style.color = 'white';
        delItem.style.backgroundColor = 'black';
        delItem.style.fontSize = '18px';
        delItem.style.font = 'large';
        delItem.addEventListener('click', () => {
          this.delCartItem(index);
          count -= cartItem.quantity;
          cartTotal.textContent = count.toString();
        });

        cartItemElement.appendChild(cartName);
        cartItemElement.appendChild(cartImg);
        cartItemElement.appendChild(cartQuantity);
        cartItemElement.appendChild(delItem);

        cartItems.appendChild(cartItemElement);
      });

      cartTotal.textContent = count.toString();
    }
  }

  delCartItem(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    this.displayCart();
  }
}

const instances = new DisplayingProducts();

window.onload = () => {
  instances.loadFromLocalStorageAndDisplay();
  instances.loadCartFromLocalStorage(); // Load cart from local storage
  instances.displayCart();
};
