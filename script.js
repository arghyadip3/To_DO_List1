const API_URL = 'http://todo-backend-idzd.onrender.com/api/tasks';

// ১. পেজ ওপেন হওয়ার সাথে সাথে ব্যাকএন্ড থেকে টাস্কগুলো নিয়ে আসা
window.onload = async function() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        tasks.forEach(task => renderTask(task));
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

// ২. নতুন টাস্ক যোগ করে ব্যাকএন্ডে পাঠানো (POST)
async function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please write something!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: taskText })
        });

        const newTask = await response.json();
        renderTask(newTask); 
        input.value = "";
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// ৩. স্ক্রিনে টাস্ক দেখানোর ফাংশন
function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg";
    li.setAttribute('data-id', task.id);

    li.innerHTML = `
        <span class="text-slate-700 text-sm">${task.text}</span>
        <button onclick="removeTask(${task.id}, this)" class="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
    `;

    taskList.appendChild(li);
}

// ৪. ব্যাকএন্ড থেকে টাস্ক ডিলিট করা (DELETE)
async function removeTask(id, button) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        button.parentElement.remove(); 
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}