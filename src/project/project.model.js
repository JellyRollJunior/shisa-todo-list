export { project, task };

function project(title, description) {
    const tasks = [];

    const getTasks = () => tasks;
    
    const addTask = (title, description, dueDate, priority) => tasks.push(task(title, description, dueDate, priority));
    const removeTask = (index) => tasks.splice(index, 1);
    
    return {title, description, getTasks, addTask, removeTask};
}

function task(title, description, dueDate, priority) {
    const subtasks = [];
    
    const getSubtasks = () => subtasks;
    
    const addSubtask = (description) => subtasks.push(description);
    const removeSubtask = (index) => subtasks.splice(index, 1);

    return {title, description, dueDate, priority, getSubtasks, addSubtask, removeSubtask};
}