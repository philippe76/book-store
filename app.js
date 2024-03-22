import books from './storage.js'

let booksToDisplay = [...books];

displayBooks();

const sortIcons = [...document.querySelectorAll('th .fa-solid')];

// connect sortBook function to sort icons
sortIcons.forEach(item => {
    item.onclick = function() {

        sortBooks(this);
        displayBooks();
    }
})

// display form to add new book
document.getElementById('getForm').addEventListener('click', function(){
    displayFormModal();
})

// fires addBook function when submitting form
document.getElementById('addBook').addEventListener('click', function(e) {
    e.preventDefault();
    addBook({
        title: title.value,
        author: author.value,
        year: year.value,
    });

    displayBooks();
})


// ******************************** //
// ********  FUNCTIONS  *********** //
// ******************************** //

// display all books from storage
function displayBooks() {

    document.querySelector('form').classList.remove('modal');
    document.querySelector('table').classList.remove('lessOpacity');

    document.querySelector('tbody').innerHTML = '';   

    for (const book of booksToDisplay) {
        document.querySelector('tbody').innerHTML += `<tr data-book="${book.title}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
                <button data-book="${book.title}" class="callToAction"><i class="fa-solid fa-pen"></i></button>
                <button data-book="${book.title}" class="callToAction"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`
    }

    const deleteButtons = document.querySelectorAll('button:has(.fa-trash-alt)');

    deleteButtons.forEach(item => {
        item.onclick =  function() {
            deleteBook(item.dataset.book);
        }   
    })
}

// add a book
function addBook(book) {
    booksToDisplay.unshift(book);
    displayBooks();
}

// delete a book
function deleteBook(book) {

    booksToDisplay = booksToDisplay.filter(item => item.title !== book)
    displayBooks()
}

// sort Books by alphabetic order for date / author / title
function sortBooks(sortIcon) {

    if (sortIcon.className.includes('down')) {

        sortIcon.classList.remove('fa-sort-down');
        sortIcon.classList.add('fa-sort-up')

        switch (sortIcon.dataset.info) {
            case 'title': 
                booksToDisplay.sort( (a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()) );
                break;
            case 'author':
                booksToDisplay.sort( (a, b) => a.author.toUpperCase().localeCompare(b.author.toUpperCase()) );
                break
            default: 
                booksToDisplay.sort( (a, b) => a.year - b.year );
        }
    }
    else {

        sortIcon.classList.remove('fa-sort-up')
        sortIcon.classList.add('fa-sort-down');

        switch (sortIcon.dataset.info) {
            case 'title': 
                booksToDisplay.sort( (a, b) => b.title.localeCompare(a.title) );
                break;
            case 'author':
                booksToDisplay.sort( (a, b) => b.author.localeCompare(a.author) );
                break
            default: 
                booksToDisplay.sort( (a, b) => b.year - a.year );
        }
    }
}

// display modal form to add a new book
function displayFormModal() {
    document.querySelector('form').classList.add('modal');
    document.querySelector('table').classList.add('lessOpacity');
}