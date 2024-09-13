import { ProjectHolder } from "./project.model.js";

export { ProjectController };

const ProjectController = (function () {

    const getProjects = () => {
        ProjectHolder.getProjects();
    }

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
    };
    const removeProject = (index) => ProjectHolder.removeProject(index);

    const addTask = (projectIndex, title, description, dueDate, priority) => {
        ProjectHolder.getProjects()[projectIndex].addTask(title, description, dueDate, priority);
    };
    const removeTask = (projectIndex, taskIndex) => {
        ProjectHolder.getProjects[projectIndex].removeTask(taskIndex);
    };

    const addSubTask = (projectIndex, taskIndex, description) => {
        ProjectHolder.getProjects[projectIndex].getTasks()[taskIndex].addSubtask(description);
    };
    const removeSubtask = (projectIndex, taskIndex, subtaskIndex) => {
        ProjectHolder.getProjects[projectIndex].getTasks()[taskIndex].removeSubtask(subtaskIndex);
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
