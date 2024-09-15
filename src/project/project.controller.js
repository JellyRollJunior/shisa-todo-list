import { ProjectHolder } from "./project.model.js";
import { View } from "./project.view.js";

export { ProjectController };

const ProjectController = (function () {
    let currentProjectIndex = 0;

    const renderSidebar = () => {
        View.clearSidebarProjects();
        View.renderSidebar(ProjectHolder.getProjects());
        View.bindProjectElement(switchProject)
    }

    const renderContent = () => {
        View.clearContent();
        View.renderContent(ProjectHolder.getProjects()[currentProjectIndex]);
    }

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
        const newProjectIndex = ProjectHolder.getProjects().length - 1;
        currentProjectIndex = newProjectIndex;
        renderContent();
        renderSidebar();
    }
    const removeProject = (index) => {
        ProjectHolder.removeProject(index);
    }

    const addTask = (title, description, dueDate, priority) => {
        ProjectHolder.addTask(currentProjectIndex, title, description, dueDate, priority);
        renderContent();
    }
    const removeTask = (taskIndex) => {
        ProjectHolder.removeTask(currentProjectIndex, taskIndex);
    };

    const addSubtask = (taskIndex, title) => {
        ProjectHolder.addSubtask(currentProjectIndex, taskIndex, title);
        renderContent();
    };
    const removeSubtask = (taskIndex, subtaskIndex) => {
        ProjectHolder.removeSubtask(currentProjectIndex, taskIndex, subtaskIndex);
    };

    const switchProject = (index) => {
        currentProjectIndex = index;
        renderContent();
    }

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
