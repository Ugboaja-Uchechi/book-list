/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
const list = document.querySelector('.list');
const form = document.querySelector('.form');
const author = document.querySelector('.author');
const title = document.querySelector('.title');

const books = [
  {
    id: 0,
    title: 'Oliver twist',
    author: 'Enid Blyton',
  },
  {
    id: 1,
    title: 'Oliver twist',
    author: 'Enid Blyton',
  },
  {
    id: 2,
    title: 'Oliver twist',
    author: 'Enid Blyton',
  },
];

function displayitem(book) {
  let display = '';
  // eslint-disable-next-line array-callback-return
  book.map((item) => {
    display += `
     <div class="book-list" id= "${item.id}">
       <div class='d-flex flex-column text-speaker'>
       <h4>${item.title}</h4>
       <h5>${item.author}</h5>
       <button type= "button">Remove book</button>
       </div>
     </div>
     `;
  });
  list.innerHTML = display;
}

function addBook(e) {
  e.preventDefault();
  const newBook = document.createElement('div');
  const newTitle = document.createElement('h4');
  const newAuthor = document.createElement('h5');
  const newDeleteButton = document.createElement('button');
//   <div class="book-list">
//   <div class='d-flex flex-column text-speaker'>
//   <h4>${title.value}</h4>
//   <h5>${author.value}</h5>
//   <button type= "button">Remove book</button>
//   </div>
//  </div>`;
  newTitle.innerHTML = title.value;
  newAuthor.innerHTML = author.value;
  newDeleteButton.innerHTML = 'remove Book';
  newBook.appendChild(newTitle);
  newBook.appendChild(newAuthor);
  newBook.appendChild(newDeleteButton);
  list.append(newBook);
  title.value = '';
  author.value = '';
}

document.addEventListener('DOMContentLoaded', displayitem(books));
form.addEventListener('submit', addBook);