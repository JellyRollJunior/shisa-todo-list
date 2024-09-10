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
        View.bindExpandTaskButtonClick(displayTask);
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
        onProjectChange();
    };

    const removeProject = (index) => {
        const length = ProjectHolder.getProjects().length;
        if (length > 1) {
            if (activeProject == index) {
                activeProject = (+index + 1) % length;
            }
            ProjectHolder.removeProject(index);
            onProjectChange();
            renderSidebar();
        }
    };

    const addTask = (title, description, dueDate, priority) => {
        ProjectHolder.addTask(
            activeProject,
            title,
            description,
            dueDate,
            priority
        );
        onProjectChange();
    };

    const removeTask = (taskIndex) => {
        ProjectHolder.removeTask(activeProject, taskIndex);
        onProjectChange();
    };

    const addSubtask = (taskIndex, title) => {
        ProjectHolder.addSubtask(activeProject, taskIndex, title);
        onProjectChange();
    };

    const removeSubtask = (taskIndex, subtaskIndex) => {
        ProjectHolder.removeSubtask(activeProject, taskIndex, subtaskIndex);
        onProjectChange();
    };

    const switchProject = (index) => {
        activeProject = index;
        renderContent();
    };

    const onProjectChange = () => {
        renderContent();
        localStorage.setItem("projects", JSON.stringify(ProjectHolder.getProjects()));
    }

    const start = () => {
        const localProjects = localStorage.getItem("projects");

        // bind static buttons
        View.bindConfirmNewProjectButton(addProject);
        View.bindConfirmNewTaskButton(addTask);
        View.bindConfirmNewSubtaskButton(addSubtask);

        // add initial welcome project if there are no projects in local storage
        if (!localProjects) {
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
        } else {
            ProjectHolder.parseJson(localProjects);
            renderContent();
        }
        renderSidebar();
    };

    return {
        start,
    };
})();
