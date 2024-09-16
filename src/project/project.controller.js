import { ProjectHolder } from "./project.model.js";
import { View } from "./project.view.js";

export { ProjectController };

const ProjectController = (function () {
    let activeProject = 0;
    const getCurrentProject = () => ProjectHolder.getProjects()[activeProject];

    const renderSidebar = () => {
        View.clearSidebar();
        View.renderSidebar(ProjectHolder.getProjects());
        View.bindSidebarProjectTitle(switchProject);
        View.bindDeleteProjectButton(removeProject);
    };

    const renderContent = () => {
        View.clearContent();
        View.renderContent(getCurrentProject());
        View.bindTaskTitleClick(displayTask);
        View.bindDeleteTaskButton(removeTask);
    };

    const displayTask = (index) => {
        const task = getCurrentProject().getTasks()[index];
        View.renderTaskDialog(task);
    };

    const addProject = (title, description) => {
        ProjectHolder.addProject(title, description);
        activeProject = ProjectHolder.getProjects().length - 1;
        renderSidebar();
        renderContent();
    };
    const removeProject = (index) => {
        const length = ProjectHolder.getProjects().length;
        if (length > 1) {
            if (activeProject == index) {
                activeProject = (+index + 1) % length;
                renderContent();
            }
            ProjectHolder.removeProject(index);
        }
        renderSidebar();
    };

    const addTask = (title, description, dueDate, priority) => {
        ProjectHolder.addTask(
            activeProject,
            title,
            description,
            dueDate,
            priority
        );
        renderContent();
    };
    const removeTask = (taskIndex) => {
        ProjectHolder.removeTask(activeProject, taskIndex);
        renderContent();
    };

    const addSubtask = (taskIndex, title) => {
        ProjectHolder.addSubtask(activeProject, taskIndex, title);
        renderContent();
    };
    const removeSubtask = (taskIndex, subtaskIndex) => {
        ProjectHolder.removeSubtask(activeProject, taskIndex, subtaskIndex);
    };

    const switchProject = (index) => {
        activeProject = index;
        renderContent();
    };

    const start = () => {
        // bind static buttons
        View.bindConfirmNewProjectButton(addProject);
        View.bindConfirmNewTaskButton(addTask);
        View.bindConfirmNewSubtaskButton(addSubtask);

        // add initial welcome project if there are no projects
        if (ProjectHolder.getProjects().length == 0) {
            addProject(
                "Welcome to Jelly List!",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam amet quo, ab quidem expedita cumque natus doloremque incidunt deleniti id odit. Quidem perferendis animi nulla consectetur repudiandae adipisci, molestias quam."
            );
            addTask(
                "Task Title: Take out the garbage or something",
                "It is very stinky",
                "tomorrow",
                "Low"
            );
            addSubtask(0, "Subtask Title: Bring recycling in too");
            addSubtask(
                0,
                "Subtask Title: Bring compost in too even though we don't compost"
            );
            addTask(
                "Task Title: Remember to call grandma",
                "description 1",
                "due date 1",
                "priority 1"
            );
        }
        renderSidebar();
    };

    return {
        start,
    };
})();
