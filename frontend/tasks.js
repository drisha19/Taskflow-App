async function loadTasks() {
  const res = await fetch("http://localhost:5000/tasks");
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className =
      "bg-gray-800 p-4 rounded-lg flex justify-between items-center";

    li.innerHTML = `
      <div>
        <h3 class="text-lg font-bold">${task.title}</h3>
        <p>${task.description}</p>
        <p class="text-gray-400 text-sm">Due: ${task.dueDate}</p>
      </div>

      <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              onclick="deleteTask('${task._id}')">
        ✖
      </button>
    `;

    list.appendChild(li);
  });
}

const token = localStorage.getItem("token");

await fetch("http://localhost:5000/tasks", {
  headers: { "Authorization": token }
});


async function deleteTask(id) {
  await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();
