/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
const list = document.querySelector('.list');
const form = document.querySelector('.form');
const author = document.querySelector('.author');
const title = document.querySelector('.title');

let booksArray = [];

function displayitem() {
  let display = '';
  if (localStorage.getItem('booksArray') === null) {
    booksArray = [];
  } else {
    booksArray = JSON.parse(localStorage.getItem('booksArray'));
  }
  // eslint-disable-next-line array-callback-return
  booksArray.map((item) => {
    display += `
       <div class="book-list" id= "${item.index}">
         <div class='d-flex flex-column text-speaker'>
       <h4>${item.title}</h4>
       <h5>${item.author}</h5>
        <button type= "button" onClick='deleteBook(event)'>Remove book</button>
       </div>
      </div>
     `;
  });
  list.innerHTML = display;
}

function removeLocalBook(book) {
  // Check if there is something in there?
  // let todos;
  if (localStorage.getItem('booksArray') === null) {
    booksArray = [];
  } else {
    booksArray = JSON.parse(localStorage.getItem('booksArray'));
  }
  const bookIndex = book.children[0].innerText;
  booksArray.splice(booksArray.indexOf(bookIndex), 1);
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
}

// eslint-disable-next-line no-unused-vars
function deleteBook(e) {
  const item = e.target;
  console.log(item);
  const book = item.parentElement;
  book.style.display = 'none';
  // console.log(item);
  removeLocalBook(book);
  book.addEventListener('transitioned', () => {
    book.remove();
  });
}

function saveLocalTodos({ title, author }) {
  if (localStorage.getItem('booksArray') === null) {
    booksArray = [];
  } else {
    booksArray = JSON.parse(localStorage.getItem('booksArray'));
  }
  booksArray.push({ title, author });
  //  totalTodo.innerText = todos.length
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
  deleteBook();
  console.log(booksArray);
}

function addBook(e) {
  e.preventDefault();
  const newBook = document.createElement('div');
  newBook.innerHTML = `
        <h4>${title.value}</h4>
        <h5>${author.value}</h5>
        <button class="delete"> X</button>
    `;
  // const newTitle = document.createElement('h4');
  // const newAuthor = document.createElement('h5');
  // const newDeleteButton = document.createElement('button');
  // // newDeleteButton.innerHTML = '<span class="delete">Remove Book</span>';
  // newDeleteButton.classList.add('delete');
  // newTitle.innerHTML = title.value;
  // newAuthor.innerHTML = author.value;
  // newDeleteButton.innerHTML = 'remove Book';
  // newBook.appendChild(newTitle);
  // newBook.appendChild(newAuthor);
  // newBook.appendChild(newDeleteButton);
  list.append(newBook);
  saveLocalTodos({ title: title.value, author: author.value });
  title.value = '';
  author.value = '';
}

document.addEventListener('DOMContentLoaded', displayitem);
form.addEventListener('submit', addBook);