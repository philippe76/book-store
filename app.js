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

// display userAccount form
document.getElementById('userAcountBtn').onclick = () =>  displayFormModal('userAccountForm');

// fires createAccount function when submitting userAccountForm
document.getElementById('getUserAccount').onclick = createAccount;

// display form to add new book
document.getElementById('getBookForm').onclick = () => displayFormModal('newBookForm');

// fires addBook function when submitting getBookForm
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

// display modal for user loging or creating user account
function displayLoginModal() {

}

// create user account 
function createAccount(event) {


    document.getElementById('userAccountForm').classList.remove('modal');

    event.preventDefault();


    if (!localStorage.user) {
        const userObject = {
            name : userName.value,
            password : userPassword.value,
            books : []
        };
        document.querySelector('.user-name').textContent = userName.value;
        booksToDisplay = [];

        localStorage.user = JSON.stringify(userObject);
    }
    else {

        if (!checkUserAccount()) {
            console.log('ERREUR DE SAISIE');
        }
        else {
            document.querySelector('.user-name').textContent = JSON.parse(localStorage.user).name;
            booksToDisplay = JSON.parse(localStorage.user).books;

        }
    }
    
    displayBooks()

}

// check name and password
function checkUserAccount() {
    if (userName.value !== JSON.parse(localStorage.user).name || userPassword.value !== JSON.parse(localStorage.user).password) {
        return false
    }
    else {
        return true
    }
}


// display all books from storage
function displayBooks() {

    document.getElementById('newBookForm').classList.remove('modal');
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
function displayFormModal(formID) {
    document.getElementById(formID).classList.add('modal');
    document.querySelector('table').classList.add('lessOpacity');
}

