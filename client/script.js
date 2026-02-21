const API = "http://localhost:5000/tasks";

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function loadTasks() {
fetch(API)
    .then((res) => res.json())
    .then((tasks) => {
    list.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center border p-3 rounded";

        li.innerHTML = `
        <span class="${task.completed ? "line-through text-gray-400" : ""}">
            ${task.title}
        </span>

        <div class="space-x-2">
            <button onclick="toggleTask(${task.id})"
                class="text-green-600">✔</button>

            <button onclick="deleteTask(${task.id})"
                class="text-red-600">✖</button>
        </div>
        `;

            list.appendChild(li);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
    }).then(() => {
    input.value = "";
    loadTasks();
    });
});

function toggleTask(id) {
    fetch(`${API}/${id}`, { method: "PATCH" }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(loadTasks);
}

loadTasks();
