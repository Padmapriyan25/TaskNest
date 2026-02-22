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

    li.className = `bg-white/30 backdrop-blur-md px-5 py-4 rounded-2xl flex justify-between items-center transition-all duration-300 hover:bg-white/40 hover:scale-[1.02] shadow-md `;

    li.innerHTML = `
        <span class="text-white font-medium tracking-wide 
            ${task.completed ? "line-through opacity-60" : ""}">
            ${task.title}
        </span>

        <div class="flex items-center gap-3">
            <button onclick="toggleTask(${task.id})" class="w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 hover:bg-green-500 hover:text-white text-green-300 transition duration-200"> ✓ </button>
            <button onclick="deleteTask(${task.id})" class="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500 hover:text-white text-red-300 transition duration-200"> ✗ </button>
        </div>
    `;

    taskList.appendChild(li);
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
    fetch(`${API}/${id}`, {
        method: "PATCH" 
    }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`${API}/${id}`, { 
        method: "DELETE" 
    }).then(loadTasks);
}

loadTasks();
