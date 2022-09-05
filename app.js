'use strict';

const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const initialTodos = document.querySelectorAll('.initial');
const popup = document.querySelector('.popup-wrapper');
const popupForm = document.querySelector('.popup-form');
const popupId = document.getElementById('userId');
const notification = document.querySelector('.edit-notif');

console.log('Hey!. Welcome to my to-do App');

let todos = JSON.parse(localStorage.getItem('todos-item'));

if (!todos) {
  todos = [];
}
let html = '';

const generateTemplate = () => {
  html = '';
  list.innerHTML = '';
  if (todos.length) {
    todos.forEach((todoObj, i) => {
      html = `
      <li class="todo-item initial">
     <div class="btn-todo-item">
     <span><button class="todo-item-btn"></button></span>
     <span>${todoObj.todoText}</span>
     </div>
     <div class="delete-edit">
     <button class='delete-edit-btn' onclick='deleteTodo(${i})'><i class="far fa-trash-alt delete"></i></button>
     <button class='delete-edit-btn'  onclick='showPopUp(${i})'><i class="fa-regular fa-pen-to-square edit"></i></button>
     </div>
     </li>`;
      list.innerHTML += html;
    });
  } else list.innerHTML = html;
};

generateTemplate();

const deleteTodo = i => {
  const confirmDelete = confirm('Do you want to delete this todo item?');
  // console.log(confirmDelete);
  if (confirmDelete) {
    todos.splice(i, 1);

    localStorage.setItem('todos-item', JSON.stringify(todos));
  }
  console.log(todos);

  generateTemplate();
};

const addTodo = function () {
  todos[todos.length] = {
    todoText: addForm.add.value.trim(),
  };

  localStorage.setItem('todos-item', JSON.stringify(todos));

  generateTemplate();
};

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = addForm.add.value.trim();

  if (text) {
    addTodo();
    addForm.reset();
  } else {
    addForm.reset();
    alert('you need to type in something for it to be added to your list');
  }
});

const showPopUp = i => {
  popup.style.display = 'block';
  popupForm.editText.value = todos[i].todoText;
  popupId.value = i;
};

const hidePopup = () => (popup.style.display = 'none');

//CLICK EVENT THAT HIDES THE POPUP WINDOW
popup.addEventListener('click', e => {
  if (e.target.classList.contains('popup-close')) hidePopup();
  if (e.target.classList.contains('popup-wrapper')) hidePopup();
});

// SUBMIT EVENT ON THE POPUP WINDOW
const showNotification = () => {
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
  }, 3000);
};
popupForm.addEventListener('submit', e => {
  e.preventDefault();

  hidePopup();

  const openedPopupId = popupId.value;

  const editedTodo = {
    todoText: popupForm.editText.value,
  };
  todos[openedPopupId] = editedTodo;

  localStorage.setItem('todos-item', JSON.stringify(todos));

  generateTemplate();
  showNotification();
});
