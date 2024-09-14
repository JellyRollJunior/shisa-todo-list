import { ProjectHolder } from "./project.model.js";
import { View } from "./project.view.js";

export { ProjectController };

const ProjectController = (function () {

    const renderProjectsSidebarSection = () => {
        View.renderProjectsSidebarSection(ProjectHolder.getProjects());
    }

    const renderProjectContent = (index) => {
        View.renderProjectContent(ProjectHolder.getProjects()[index]);
    }

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
    }
    const removeProject = (index) => {
        ProjectHolder.removeProject(index);
    }

    const addTask = (projectIndex, title, description, dueDate, priority) => {
        ProjectHolder.addTask(projectIndex, title, description, dueDate, priority);
    }
    const removeTask = (projectIndex, taskIndex) => {
        ProjectHolder.removeTask(projectIndex, taskIndex);
    };

    const addSubTask = (projectIndex, taskIndex, description) => {
        ProjectHolder.addSubtask(projectIndex, taskIndex, description);
    };
    const removeSubtask = (projectIndex, taskIndex, subtaskIndex) => {
        ProjectHolder.removeSubtask(projectIndex, taskIndex, subtaskIndex);
    };

    return {
        addProject,
        removeProject,
        addTask,
        removeTask,
        addSubTask,
        removeSubtask,
        renderProjectsSidebarSection,
        renderProjectContent,
    };
})();
