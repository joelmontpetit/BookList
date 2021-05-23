//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {}

UI.prototype.addBookToList = function(book){
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

//Show alert
UI.prototype.showAlert = function(message, className) {
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

//Delete book
UI.prototype.deleteBook= function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


//CLear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



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

     //Showw message
     ui.showAlert('Book removed!', 'succes');

    e.preventDefault();
});