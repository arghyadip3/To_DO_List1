const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors()); 
app.use(express.json()); 


let tasks = [
    { id: 1, text: "Learn Git Branching" },
    { id: 2, text: "Connect Frontend with Backend" }
];


app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
    const newTaskText = req.body.text;
    
    if (!newTaskText) {
        return res.status(400).json({ message: "Task text is required!" });
    }

    const newTask = {
        id: Date.now(), 
        text: newTaskText
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ৩. টাস্ক ডিলিট করার API (DELETE Request)
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: "Task deleted successfully!" });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});