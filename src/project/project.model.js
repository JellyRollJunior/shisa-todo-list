export { createProject, createTask };

function createProject(title, description) {
    const tasks = [];

    const getTasks = () => tasks;

    const addTask = (title, description, dueDate, priority) => {
        tasks.push(createTask(title, description, dueDate, priority));
    };
    const removeTask = (index) => tasks.splice(index, 1);

    return {
        title,
        description,
        getTasks,
        addTask,
        removeTask,
    };
}

function createTask(title, description, dueDate, priority) {
    const subtasks = [];

    const getSubtasks = () => subtasks;

    const addSubtask = (description) => subtasks.push(description);
    const removeSubtask = (index) => subtasks.splice(index, 1);

    return {
        title,
        description,
        dueDate,
        priority,
        getSubtasks,
        addSubtask,
        removeSubtask,
    };
}
