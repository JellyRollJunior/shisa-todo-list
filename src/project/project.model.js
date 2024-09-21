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

    const addSubtask = (projectIndex, taskIndex, title) => {
        projects[projectIndex].addSubtask(taskIndex, title);
    };
    const removeSubtask = (projectIndex, taskIndex, subtaskIndex) => {
        projects[projectIndex].removeSubtask(taskIndex, subtaskIndex);
    };

    return {
        projects,
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

    const addSubtask = (taskIndex, title) => {
        tasks[taskIndex].addSubtask(title);
    };
    const removeSubtask = (taskIndex, subtaskIndex) => {
        tasks[taskIndex].removeSubtask(subtaskIndex);
    };

    return {
        tasks,
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

    const addSubtask = (title) => subtasks.push(createSubtask(title));
    const removeSubtask = (index) => subtasks.splice(index, 1);

    return {
        subtasks,
        title,
        description,
        dueDate,
        priority,
        getSubtasks,
        addSubtask,
        removeSubtask,
    };
}

function createSubtask(title) {
    return { title };
}
