import { ProjectHolder } from "./project.model.js";
import { View } from "./project.view.js";

export { ProjectController };

const ProjectController = (function () {

    const renderSidebar = () => {
        View.renderSidebar(ProjectHolder.getProjects());
    }

    const renderContent = (index) => {
        View.clearContent();
        View.renderContent(ProjectHolder.getProjects()[index]);
    }

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
        renderContent(ProjectHolder.getProjects().length - 1);
    }
    const removeProject = (index) => {
        ProjectHolder.removeProject(index);
    }

    const addTask = (projectIndex, title, description, dueDate, priority) => {
        ProjectHolder.addTask(projectIndex, title, description, dueDate, priority);
        renderContent(projectIndex);
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

    View.bindConfirmNewTaskButton(addTask);
    View.bindConfirmNewProjectButton(addProject);

    return {
        addProject,
        removeProject,
        addTask,
        removeTask,
        addSubTask,
        removeSubtask,
        renderSidebar,
        renderContent,
    };
})();
