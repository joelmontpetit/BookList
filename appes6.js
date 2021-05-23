class Book{
constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    // INsert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
    }

    showAlert(message,className) {
        //CReate DIv 
        const div = document.createElement('div');
        //add classes
        div.className = `alert ${className}`;
        //Add Text
        div.appendChild(document.createTextNode(message));
        //Get a parent
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector('#book-form');
        //Insert alert
        container.insertBefore(div, form);


        //TimneOut after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove(); 
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    

    clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    }

}

//Local Storage Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
         books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));  
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to UI;
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book,index){
         if(book.isbn === isbn) {
            books.splice(index, 1);
         }  
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Dom LoadEvent
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form value
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    //Istantiate book
    const book = new Book(title, author, isbn);

    //Istantiate UI
    const ui = new UI();

    //Validate 
    if(title === '' || author === '' || isbn === '') {
        //error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {

    //Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    //show success
    ui.showAlert('Book Added!', 'succes');

    //clear field 
    ui.clearFields();

    }


    e.preventDefault();
});

//Even listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

     //Istantiate UI
     const ui = new UI();
    
     ui.deleteBook(e.target);

     //Remove from local storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

     //Showw message
     ui.showAlert('Book removed!', 'succes');

    e.preventDefault();
});