function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please write something!");
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg shadow-sm";

    li.innerHTML = `
        <span class="text-slate-700 text-sm">${taskText}</span>
        <button onclick="removeTask(this)" class="text-red-500 hover:text-red-700 text-xs font-semibold">Delete</button>
    `;

    taskList.appendChild(li);
    input.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
}