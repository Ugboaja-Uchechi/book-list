/* eslint-disable linebreak-style */
const contact = document.querySelector('.contact');
const form = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');
const listLink = document.querySelector('.nav-link');
// const contactLink = document.querySelector('.link-contact');
// const formLink = document.querySelector('.link-form');

listLink.addEventListener('click', () => {
  contact.classList.add('no-show');
  contact.classList.remove('show');
  form.classList.remove('show');
  form.classList.add('no-show');
  bookList.classList.add('show');
  bookList.classList.remove('no-show');
});

// contactLink.addEventListener('click', () => {
//   bookList.classList.add('no-show');
//   bookList.classList.remove('show');
//   form.classList.add('no-show');
//   form.classList.remove('show');
//   contact.classList.add('show');
//   contact.classList.remove('no-show');
// });

// formLink.addEventListener('click', () => {
//   bookList.classList.add('no-show');
//   bookList.classList.remove('show');
//   form.classList.add('show');
//   contact.classList.add('no-show');
//   contact.classList.remove('show');
//   form.classList.remove('no-show');
// });

// window.addEventListener('DOMContentLoaded', () => {
//   bookList.classList.add('show');
//   // eslint-disable-next-line no-undef
//   const { DateTime } = luxon;
//   this.today = DateTime.now();
//   document.getElementById('time').textContent = this.today.toLocaleString(DateTime.DATETIME_MED);
// });
