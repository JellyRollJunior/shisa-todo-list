export { createProject };

function createProject(title, description) {
    const tasks = [];

    const getTasks = () => tasks;
    
    const addTask = (title, description, dueDate, priority) => tasks.push(createTask(title, description, dueDate, priority));
    const removeTask = (index) => tasks.splice(index, 1);

    const addSubtask = (index, description) => tasks[index].addSubtask(description);
    const removeSubtask = (taskIndex, subtaskIndex) => tasks[taskIndex].removeSubtask(subtaskIndex);
    
    return {title, description, getTasks, addTask, removeTask, addSubtask, removeSubtask};
}

function createTask(title, description, dueDate, priority) {
    const subtasks = [];
    
    const getSubtasks = () => subtasks;
    
    const addSubtask = (description) => subtasks.push(description);
    const removeSubtask = (index) => subtasks.splice(index, 1);

    return {title, description, dueDate, priority, getSubtasks, addSubtask, removeSubtask};
}