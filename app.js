'use strict';

const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const popup = document.querySelector('.popup-wrapper');
const popupForm = document.querySelector('.popup-form');
const popupId = document.getElementById('userId');
const notification = document.querySelector('.edit-notif');
const deleteContainer = document.querySelector('.delete-wrapper');
const deleteId = document.getElementById('id');

const search = document.querySelector('.search');

console.log('Hey!. Welcome to my to-do App');

let todos = JSON.parse(localStorage.getItem('todos-item'));

if (!todos) {
  todos = [];
}
let html = '';

const generateTemplate = function () {
  html = '';
  list.innerHTML = '';
  if (todos.length) {
    todos.forEach((todoObj, i) => {
      html = `
      <li class="todo-item initial">
     <div class="btn-todo-item">
     <span><button class="todo-item-btn"></button></span>
     <span class="todo-text-width" >${todoObj.todoText}</span>
     </div>
     <div class="delete-edit">
     <button class='delete-edit-btn' onclick='toggleDeleteModal(${i})'><i class="fa-solid fa-trash-can delete"></i></button>
     <button class='delete-edit-btn'  onclick='showEditModal(${i})'><i class="fa-regular fa-pen-to-square edit"></i></button>
     </div>
     </li>`;

      list.innerHTML += html;
    });
  } else list.innerHTML = html;
};

generateTemplate();

const deleteTodo = function () {
  todos.splice(deleteId.id, 1);
  localStorage.setItem('todos-item', JSON.stringify(todos));
  toggleDeleteModal();
  generateTemplate();
};

// FUNCTION THAT SHOWS THE DELETE MODAL
const toggleDeleteModal = i => {
  deleteContainer.classList.toggle('show');
  deleteId.id = i;
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

const showEditModal = i => {
  popup.style.display = 'block';
  popupForm.editText.value = todos[i].todoText;
  popupId.value = i;
};

// FUNCTION THAT HIDES THE POPUP
const hidePopup = () => (popup.style.display = 'none');

// CLICK EVENT THAT HIDES THE POPUP WINDOW
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

// EVENT HANDLER FOR WHEN THE USER EDIT THE TODO ITEM
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

// CLICK EVENT THAT HIDES THE DELETE MODAL
deleteContainer.addEventListener('click', e => {
  const x = e.target.classList.contains('delete-close');
  const y = e.target.classList.contains('delete-wrapper');

  if (x || y) {
    toggleDeleteModal();
  }
});

//SEARCH FEATURE
const filterTodos = term => {
  Array.from(list.children)
    .filter(todo => !todo.textContent.trim().toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter(todo => todo.textContent.trim().toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
