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
  id: number;
  image: string;
  names: string;
  author: string;
  title: string;
  date_established: string;
}

// Initializing an empty array
// let Books: Book[] = [];

let divProduct = document.querySelector('.productsDiv') as HTMLDivElement;

const user = JSON.parse(localStorage.getItem('books') || '[]')

console.log(user);


user.forEach((used:Book ,index:number)=>{


  const divy = document.createElement('div');

  divy.innerHTML=`

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

  
  
  
  `





  divProduct.appendChild(divy)

})








interface Book {
  names: string;
  image: string;
  author: string;
  title: string;
  date_established: string;
}



class displayingProducts {

  displayBooks() {
      if (divProduct instanceof HTMLElement) {
        divProduct.innerHTML = '';
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

  // loadFromLocalStorage() {
    // console.log("in function");
    
      // const storedBooks = localStorage.getItem('books');
      // if (storedBooks) {
      //     Books = JSON.parse(storedBooks);
      //     console.log(Books);
          
      //     this.displayBooks();
      // }
  // }
// }

// let instances = new displayingProducts();
// window.onload = () => { instances.loadFromLocalStorage(); };



}

