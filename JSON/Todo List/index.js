let allTask = JSON.parse(localStorage.getItem('task')) || [];

const submitTask = () => {
    const task = document.getElementById('task').value.trim();
    const editTaskId = document.getElementById('editTaskId').value;

    if (!task) {
        alert('Please enter a task!');
        return;
    }

    if (editTaskId) {
        allTask = allTask.map(t => t.id === parseInt(editTaskId) ? { id: t.id, task: task } : t);
        document.getElementById('editTaskId').value = '';
        alert("Task updated successfully!");
    } else {
        const dup = allTask.some(val => val.task === task);
        if (dup) {
            alert("Task already exists.");
            return;
        }
        const obj = {
            id: Math.floor(Math.random() * 100000000),
            task: task
        };
        allTask.push(obj);
        alert("Task added successfully!");
    }
    document.getElementById('task').value = '';
    localStorage.setItem('task', JSON.stringify(allTask));
    viewTask();
};

const viewTask = () => {
    let tbl = "";
    allTask.forEach((val) => {
        tbl += `
            <tr>
                <td>${val.id}</td>
                <td>${val.task}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteTask(${val.id})">Delete</button>
                    <button class="btn btn-success" onclick="editTask(${val.id})">Edit</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("taskList").innerHTML = tbl;
};

const deleteTask = (id) => {
    allTask = allTask.filter(task => task.id !== id);
    localStorage.setItem('task', JSON.stringify(allTask));
    alert('Task deleted');
    viewTask();
};

const editTask = (id) => {
    const taskToEdit = allTask.find(task => task.id === id);
    document.getElementById('task').value = taskToEdit.task;
    document.getElementById('editTaskId').value = taskToEdit.id.toString();
};

const deleteAllTasks = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        allTask = [];
        localStorage.removeItem('task');
        alert('All tasks deleted!');
        viewTask();
    }
};

viewTask();