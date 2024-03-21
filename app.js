import books from './storage.js'

let booksToDisplay = [...books];

displayBooks();


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


function deleteBook(book) {

    booksToDisplay = booksToDisplay.filter(item => item.title !== book)
    displayBooks()
}
