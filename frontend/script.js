const API_URL = "http://localhost:5000/tasks";

const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


// Load tasks when page loads
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  
  taskList.innerHTML = ""; // clear list

  tasks.forEach(task => {
    addTaskToUI(task);
  });
}


// Add task to UI
function addTaskToUI(task) {
  const li = document.createElement("li");
  li.className = "bg-gray-700 p-3 rounded flex justify-between items-center";

  li.innerHTML = `
    <div>
      <p class="font-bold">${task.title}</p>
      <p class="text-sm text-gray-300">${task.description}</p>
      <p class="text-xs text-gray-400">Due: ${task.dueDate}</p>
    </div>

    <button class="bg-red-500 px-2 py-1 rounded delete-btn" data-id="${task._id}">
      ❌
    </button>
  `;

  taskList.appendChild(li);

  // Delete button event
  li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task._id));
}


// Add new task
addBtn.addEventListener("click", async () => {
  const newTask = {
    title: titleInput.value,
    description: descInput.value,
    dueDate: dateInput.value
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask)
  });

  const createdTask = await res.json();

  window.location.href = "tasks.html";


  // clear inputs
  titleInput.value = "";
  descInput.value = "";
  dateInput.value = "";
});


// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

const token = localStorage.getItem("token");

await fetch("http://localhost:5000/tasks", {
  headers: { "Authorization": token }
});


