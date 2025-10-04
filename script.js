const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ 
      text: li.querySelector('.task-text').textContent, 
      done: li.classList.contains('done') 
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
function addTask(text, done=false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add('task-text');

  if (done) li.classList.add('done');

  // Toggle done
  span.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTasks();
  });

  // Edit on double click
  span.addEventListener('dblclick', () => {
    const newText = prompt("Edit your task:", span.textContent);
    if (newText && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = "Delete";
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  saveTasks();
}

// Add button click
addBtn.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// Enter key support
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addBtn.click();
});

// Load saved tasks
const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
saved.forEach(t => addTask(t.text, t.done));
