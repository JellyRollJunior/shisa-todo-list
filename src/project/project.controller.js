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
        View.bindDeleteSubtaskButton(removeSubtask);
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
        renderContent();
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
                "Welcome to Shisa List!",
                `Shisa from Chiikawa will stare at you intently until you complete your tasks!\n\n Make sure not to disappoint cute lil Shisa and do your todos! Just kidding, Shisa does not judge and values you even if you do not complete your tasks. She would be happy for you if you could complete them however. She would make you some ramen or give you some satapanbins or something. Real chiikawa-ers know what im sayin.`
            );
            addTask(
                "Task Title: Take out the garbage or something",
                "It is very stinky",
                "2024-09-10",
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
                "2024-09-10",
                "High"
            );
        }
        renderSidebar();
    };

    return {
        start,
    };
})();
