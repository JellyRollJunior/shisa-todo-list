export { ProjectHolder, createProject, createTask };

const ProjectHolder = (function () {
    const projects = [];

    const getProjects = () => projects;

    const addProject = (title, description) => {
        projects.push(createProject(title, description));
    };
    const removeProject = (index) => projects.splice(index, 1);

    return { getProjects, addProject, removeProject };
})();

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
