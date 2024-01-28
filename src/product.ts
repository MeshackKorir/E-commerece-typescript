// let id = document.querySelector('#name') as HTMLInputElement
let body = document.querySelector(".body") as HTMLFormElement
let image = document.querySelector('#profile') as HTMLInputElement
let names = document.querySelector('#names') as HTMLInputElement
let author = document.querySelector('#author') as HTMLInputElement
let title = document.querySelector('#title') as HTMLInputElement
let date_established = document.querySelector('#date') as HTMLInputElement
let profiles = document.querySelector('.profiless')
let buttonOnClick = document.querySelector('#button') as HTMLButtonElement;

buttonOnClick.addEventListener("click", (() =>{

}))

// let body = document.querySelector('.body') as HTMLFormElement;

let currentIndex:number;

interface Book{
    id: number;
    image: string;
    names: string;
    author: string;
    title: string;
    date_established: string
}

// Initializing an empty array
let Books: Book[]=[]

body.addEventListener("submit", (e)=>{
    e.preventDefault()

    console.log(names.value);

    let book = names.value.trim() != "" && image.value.trim() != "" && author.value.trim() != "" && title.value.trim() != "" && date_established.value.trim() != ""

    if(book){
        let newBookDetails = {
            id: Books.length + 1,
            names: names.value.trim(),
            image: image.value.trim(),
            author: author.value.trim(),
            title: title.value.trim(),
            date_established: date_established.value.trim()
        };

        console.log(newBookDetails)
        Books.push(newBookDetails)
    
        if(currentIndex){
            Books.splice(currentIndex, 1, newBookDetails)


        }else{
            Books.push(newBookDetails)
        }

        instance.displayBooks()

        names.value = ""
        image.value = ""
        author.value = ""
        title.value = ""
        date_established.value = ""
    }
})


class BooksActions{

    displayBooks(){


        Books.forEach((book: Book, index:number)=>{

            let profiles = <HTMLTableRowElement >document.createElement('tr')
            profiles.className = "profiless"

            let numbering = document.createElement('td') as HTMLTableCellElement
            numbering.textContent = `${index + 1}`

            let name = document.createElement('td') as HTMLTableCellElement
            name.textContent = book.names

            let image = document.createElement('td') as HTMLTableCellElement
            image.textContent = book.image

            let author = document.createElement('td') as HTMLTableCellElement
            author.textContent = book.author

            let title = document.createElement('td') as HTMLTableCellElement
            title.textContent = book.title

            let date_established = document.createElement('td') as HTMLTableCellElement
            date_established.textContent = book.date_established

            let deletebtn = document.createElement('button') as HTMLButtonElement
            deletebtn.textContent = "Delete"
            deletebtn.style.backfaceVisibility = 'red'
            deletebtn.addEventListener('click', ()=>{
                this.deleteBook(index)
            })

            let updatebtn = document.createElement('button') as HTMLButtonElement
            updatebtn.textContent = "Update"
            updatebtn.style.backfaceVisibility = 'skyblue'
            updatebtn.addEventListener('click', ()=>{
                this.updateBook(index)
            })

            profiles.appendChild(names)
            profiles.appendChild(image)
            profiles.appendChild(name)
            profiles.appendChild(author)
            profiles.appendChild(date_established)
            profiles.appendChild(title)
            profiles.appendChild(deletebtn)
            profiles.appendChild(updatebtn)

          

        })
    }

    deleteBook(index:number){
        Books.splice(index, 1)

        this.displayBooks()
    }

    updateBook(index:number){
        currentIndex = index

        console.log(currentIndex);
        
        // createBookform.style.display = 'flex'

        let user = Books[index]

        names.value = user.names
        title.value = user.title
        author.value = user.author
        date_established.value = user.date_established
        image.value = user.image
    }
}

let instance = new BooksActions();

instance.displayBooks()



















