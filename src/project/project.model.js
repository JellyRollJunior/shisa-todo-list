export { ProjectHolder, createProject, createTask };

const ProjectHolder = (function () {
    const projects = [];

    const getProjects = () => projects;

    const addProject = (title, description) => {
        projects.push(createProject(title, description));
    };
    const removeProject = (index) => projects.splice(index, 1);

    const addTask = (projectIndex, title, description, dueDate, priority) => {
        projects[projectIndex].addTask(title, description, dueDate, priority);
    };
    const removeTask = (projectIndex, taskIndex) => {
        projects[projectIndex].removeTask(taskIndex);
    };

    const addSubtask = (projectIndex, taskIndex, description) => {
        projects[projectIndex].addSubtask(taskIndex, description);
    };
    const removeSubtask = (projectIndex, taskIndex, subtaskIndex) => {
        projects[projectIndex].removeSubtask(taskIndex, subtaskIndex);
    };

    return {
        getProjects,
        addProject,
        removeProject,
        addTask,
        removeTask,
        addSubtask,
        removeSubtask,
    };
})();

function createProject(title, description) {
    const tasks = [];

    const getTasks = () => tasks;

    const addTask = (title, description, dueDate, priority) => {
        tasks.push(createTask(title, description, dueDate, priority));
    };
    const removeTask = (index) => tasks.splice(index, 1);

    const addSubtask = (taskIndex, description) => {
        tasks[taskIndex].addSubtask(description);
    };
    const removeSubtask = (taskIndex, subtaskIndex) => {
        tasks[taskIndex].removeSubtask(subtaskIndex);
    };

    return {
        title,
        description,
        getTasks,
        addTask,
        removeTask,
        addSubtask,
        removeSubtask,
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
