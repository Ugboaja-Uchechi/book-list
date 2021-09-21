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
     const list = document.createElement('tr');
     list.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button class="delete">Remove</button></td>
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