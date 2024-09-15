import { ProjectHolder } from "./project.model.js";
import { View } from "./project.view.js";

export { ProjectController };

const ProjectController = (function () {

    const renderSidebar = () => {
        View.clearSidebarProjects();
        View.renderSidebar(ProjectHolder.getProjects());
    }

    const renderContent = (index) => {
        View.clearContent();
        View.renderContent(ProjectHolder.getProjects()[index]);
    }

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
        renderContent(ProjectHolder.getProjects().length - 1);
        renderSidebar();
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

    const addSubtask = (projectIndex, taskIndex, title) => {
        ProjectHolder.addSubtask(projectIndex, taskIndex, title);
        renderContent(projectIndex);
    };
    const removeSubtask = (projectIndex, taskIndex, subtaskIndex) => {
        ProjectHolder.removeSubtask(projectIndex, taskIndex, subtaskIndex);
    };

    View.bindConfirmNewProjectButton(addProject);
    View.bindConfirmNewTaskButton(addTask);
    View.bindConfirmNewSubtaskButton(addSubtask);

    return {
        addProject,
        removeProject,
        addTask,
        removeTask,
        addSubtask,
        removeSubtask,
        renderSidebar,
        renderContent,
    };
})();
