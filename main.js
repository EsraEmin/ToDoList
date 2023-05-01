window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#new-todo-form');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}">`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}


let allbttn = document.getElementById("all");
let activbttn = document.getElementById("active");
let cplbttn = document.getElementById("completed");

allbttn.addEventListener('click', function() {
  showAllItems();
});

activbttn.addEventListener('click', function() {
  hideCompletedItems();
  showActiveItems();
});

cplbttn.addEventListener('click', function() {
  hideActiveItems();
  showCompletedItems();
});

function showAllItems() {
  for (let i = 0; i < document.querySelectorAll("section")[3].childNodes[1].childNodes.length; i++) {
    document.querySelectorAll("section")[3].childNodes[1].childNodes[i].style.display = "flex";
  }
}

function showActiveItems() {
  let items = document.querySelectorAll(".todo-item:not(.done)");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "flex";
  }
}

function showCompletedItems() {
  let items = document.querySelectorAll(".todo-item.done");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "flex";
  }
}

function hideActiveItems() {
  let items = document.querySelectorAll(".todo-item:not(.done)");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";
  }
}

function hideCompletedItems() {
  let items = document.querySelectorAll(".todo-item.done");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";
  }
}