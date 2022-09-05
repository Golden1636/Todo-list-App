'use strict';

const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const initialTodos = document.querySelectorAll('.initial');
const popup = document.querySelector('.popup-wrapper');
const popupForm = document.querySelector('.popup-form');

// console.log(initialTodos);

console.log('Hey!. Welcome to my to-do App');
// localStorage.clear();
const todos = [];

const generateTemplate = todo => {
  const html = `
  <li class="todo-item initial">
    <div class="btn-todo-item">
      <span><button class="todo-item-btn"></button></span>
      <span>${todo}</span>
    </div>
    <div class="delete-edit">
      <i class="far fa-trash-alt delete"></i>
      <i class="fa-regular fa-pen-to-square edit"></i>
    </div>
  </li>`;

  todos.push(todo);

  initialTodos.forEach(item => item.classList.add('hidden'));

  list.innerHTML += html;
};

const init = function () {
  const stored = localStorage.getItem('todo-items');
  const storedArray = JSON.parse(stored);
  console.log(storedArray);

  if (storedArray?.length) {
    storedArray.forEach(todo => {
      generateTemplate(todo);
    });
  }
};
init();

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo) {
    generateTemplate(todo);
    addForm.reset();
  } else {
    addForm.reset();
    alert('you need to type in something for it to be added to your list');
  }
  console.log(todos);
  //set local storage
  // localStorage.setItem('todo-items', JSON.stringify(todos));
});

// delete todos
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.closest('.todo-item').remove();
    // e.target.parentElement.remove();
    // const deletedTodo = e.target.parentElement.textContent.trim();
    const deletedTodo = e.target.closest('.todo-item').textContent.trim();

    // console.log(typeof deletedTodo, deletedTodo);

    const filteredTodos = todos.filter(text => text !== deletedTodo);

    //set local storage
    localStorage.setItem('todo-items', JSON.stringify(filteredTodos));
    // init();
    console.log(filteredTodos);
  }
});

//EDIT TODO

//CLICK EVENT THAT DISPLAYS THE POPUP WINDOW
list.addEventListener('click', e => {
  // console.log(e.target.classList.contains('edit'));

  if (e.target.classList.contains('edit')) popup.style.display = 'block';
});

const hidePopup = () => (popup.style.display = 'none');

//CLICK EVENT THAT HIDES THE POPUP WINDOW
popup.addEventListener('click', e => {
  if (e.target.classList.contains('popup-close')) hidePopup();
  if (e.target.classList.contains('popup-wrapper')) hidePopup();
});

// SUBMIT EVENT ON THE POPUP WINDOW
popupForm.addEventListener('submit', e => {
  e.preventDefault();
  const matilda = popupForm.editText.value.trim();
  console.log(matilda);

  hidePopup();
});
