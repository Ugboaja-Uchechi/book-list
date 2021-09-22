/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// /* eslint-disable no-undef
// eslint-disable no-use-before-define
/* eslint-disable linebreak-style */
// create the book constructor

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI constructor
const selectors = {
  title: 'title',
  author: 'author',
  isbn: 'isbn',
};

class UI {
   addBook = function (book) {
     const list = document.createElement('div');
     list.classList.add('w-100', 'px-3');
     list.innerHTML = `
     <div class="d-flex align-items-center justify-content-between text-align-center w-100">
     <div class="d-flex w-75 align-items-center text-align-center">
    <h5 class="mt-2 w-25">"${book.title}"</h5>
    <h5 class="mt-2 mx-2 w-25"> by </h5>
    <h5 class="mt-2 mx-2 w-25">${book.author}</h5>
    <h5 class = "ml-3 mt-2 mx-2" w-25">${book.isbn}</h5>
    </div>
  <div> <button class="delete">Remove</button></div>
  </div>
  `;
     document.getElementById('book-list').appendChild(list);
   };

   clear = function () {
     document.getElementById(selectors.title).value = '';
     document.getElementById(selectors.author).value = '';
     document.getElementById(selectors.isbn).value = '';
   };

   showAlert = function (message, className) {
     // create a div
     const div = document.createElement('div');
     div.className = `alert ${className}`;
     // addtext
     div.appendChild(document.createTextNode(message));
     // insert into the dom
     const container = document.querySelector('.container');
     const form = document.querySelector('#book-form');
     container.insertBefore(div, form);
     // set the timeout
     setTimeout(() => {
       div.remove();
     }, 1000);
   };

   delete = function (target) {
     if (target.className === 'delete') {
       target.parentElement.parentElement.remove();
     }
   };
}

// local storage class
class Store {
  static get() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static display() {
    const books = Store.get();

    books.forEach((book) => {
      const ui = new UI();

      // add to UI
      ui.addBook(book);
    });
  }

  static add(book) {
    const books = Store.get();
    if (book.isbn === '' || book.title === '' || book.author === '') {
      return;
    }

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static remove(isbn, title) {
    const books = Store.get();
    books.forEach((book, index) => {
      if (book.isbn === isbn || book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
// load listen
// eslint-disable-next-line no-use-before-define
loadEvents();
function loadEvents() {
  document.addEventListener('DOMContentLoaded', Store.display);
  // eslint-disable-next-line no-use-before-define
  document.getElementById('book-form').addEventListener('submit', load);
  // eslint-disable-next-line no-use-before-define
  document.getElementById('book-list').addEventListener('click', deleteListener);
}
// DOM Loa

function load(e) {
  const title = document.getElementById(selectors.title).value;
  const author = document.getElementById(selectors.author).value;
  const isbn = document.getElementById(selectors.isbn).value;

  // instantiate the Book constructor
  const book = new Book(title, author, isbn);
  const ui = new UI();
  // validate form
  if (title === '' || author === '' || isbn === '') {
    // show laert
    ui.showAlert('please fill in all fields', 'error');
  } else {
    ui.addBook(book);
    // add to LS
    Store.add(book);
    // clear fields
    ui.clear();
    // show alert
    ui.showAlert('Book added', 'success');
  }

  e.preventDefault();
}
// delete listener
function deleteListener(e) {
  const ui = new UI();
  // eslint-disable-next-line no-undef
  ui.delete(e.target);
  // remove from LS
  // eslint-disable-next-line no-undef
  Store.remove(e.target.parentElement.previousElementSibling.textContent);
  // show alert
  ui.showAlert('Book deleted', 'success');
  // eslint-disable-next-line no-undef
  e.preventDefault();
}