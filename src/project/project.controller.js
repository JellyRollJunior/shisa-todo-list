import { ProjectHolder } from "./project.model.js";
import { View } from "./project.view.js";

export { ProjectController };

const ProjectController = (function () {
    let currentProjectIndex = 0;

    const renderSidebar = () => {
        View.clearSidebarProjects();
        View.renderSidebar(ProjectHolder.getProjects());
        View.bindProjectTitleWrapper(switchProject);
        View.bindDeleteProjectButton(removeProject);
    }

    const renderContent = () => {
        const currentProject = ProjectHolder.getProjects()[currentProjectIndex];
        View.clearContent();
        View.renderContent(currentProject);
        View.bindTaskTitleClick(displayTask);
        View.bindDeleteTaskButton(removeTask);
    }

    const displayTask = (index) => {
        const task = ProjectHolder.getProjects()[currentProjectIndex].getTasks()[index];
        console.log(task);
    }

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
        const newProjectIndex = ProjectHolder.getProjects().length - 1;
        currentProjectIndex = newProjectIndex;
        renderContent();
        renderSidebar();
    }
    const removeProject = (index) => {
        const length = ProjectHolder.getProjects().length;
        if (length > 1) {
            if (currentProjectIndex == index) {
                currentProjectIndex = (+index + 1) % length;
                renderContent();
            }
            ProjectHolder.removeProject(index);
        }
        renderSidebar();
    }

    const addTask = (title, description, dueDate, priority) => {
        ProjectHolder.addTask(currentProjectIndex, title, description, dueDate, priority);
        renderContent();
    }
    const removeTask = (taskIndex) => {
        ProjectHolder.removeTask(currentProjectIndex, taskIndex);
        renderContent();
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
