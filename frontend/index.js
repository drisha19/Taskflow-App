document.getElementById("addBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;

  if (!title || !description || !dueDate) {
    alert("Please fill all fields!");
    return;
  }

  const newTask = { title, description, dueDate };

  await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });

  alert("Task Added Successfully! 🎉");

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
});
