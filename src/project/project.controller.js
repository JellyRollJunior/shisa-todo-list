import { createProject } from "./project.model.js";

export { ProjectController };

const ProjectController = (function () {
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

    const addSubTask = (projectIndex, taskIndex, description) => {
        projects[projectIndex].getTasks()[taskIndex].addSubtask(description);
    };
    const removeSubtask = (projectIndex, taskIndex, subtaskIndex) => {
        projects[projectIndex].getTasks()[taskIndex].removeSubtask(subtaskIndex);
    };

    return {
        getProjects,
        addProject,
        removeProject,
        addTask,
        removeTask,
        addSubTask,
        removeSubtask,
    };
})();
