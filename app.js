'use strict';

const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const initialTodos = document.querySelectorAll('.initial');
// console.log(initialTodos);

const todos = [];

const generateTemplate = todo => {
  const html = `
  <li class="todo-item">
  <div>
  <span><button class="todo-item-btn"></button></span>
  <span>${todo}</span>
  </div>
  <i class="far fa-trash-alt delete"></i>
  </li>
  `;

  todos.push(todo);

  initialTodos.forEach(item => item.classList.add('hidden'));

  list.innerHTML += html;
};

(() => {
  const stored = localStorage.getItem('todo-items');
  const storedArray = JSON.parse(stored);
  // console.log(storedArray);

  if (storedArray?.length) {
    storedArray.forEach(todo => {
      generateTemplate(todo);
    });
  }
})();

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

  //set local storage
  localStorage.setItem('todo-items', JSON.stringify(todos));
});

// delete todos
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
    const deletedTodo = e.target.parentElement.textContent.trim();

    // console.log(typeof deletedTodo, deletedTodo);

    const filteredTodos = todos.filter(text => text !== deletedTodo);

    //set local storage
    localStorage.setItem('todo-items', JSON.stringify(filteredTodos));
  }
});
