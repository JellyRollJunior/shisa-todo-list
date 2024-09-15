import deleteIcon from "../images/delete.png";
import plusIcon from "../images/add.png";

export { View };

const View = (function () {
    const createElement = (tag, ...className) => {
        const element = document.createElement(tag);
        if (className) element.classList.add(...className);
        return element;
    };

    const getElement = (selector) => {
        return document.querySelector(selector);
    };

    const contentRoot = getElement(".project-content");

    const newProjectButton = getElement("#new-project-btn");
    const newProjectDialog = getElement("#new-project-dialog");
    const projectTitleInput = getElement("#project-title-input");
    const projectDescriptionTextarea = getElement(
        "#project-description-textarea"
    );

    const newTaskButton = getElement("#new-task-btn");
    const newTaskDialog = getElement("#new-task-dialog");
    const taskTitleInput = getElement("#task-title-input");
    const taskDescriptionTextarea = getElement("#task-description-textarea");
    const taskDueDateInput = getElement("#due-date-input");
    const taskPriorityInput = getElement("#priority-select");

    const newSubtaskDialog = getElement("#new-subtask-dialog");
    const subtaskTitleInput = getElement("#subtask-title-input");

    /** Create DOM elements */
    const createMainTask = (title, index) => {
        const taskRoot = createElement("div", "task-root", "task-content");

        const task = createElement(
            "div",
            "align-center-content",
            "large-icon-title-gap"
        );
        const checkbox = createElement("input");
        checkbox.setAttribute("type", "checkbox");
        const taskTitle = createElement("h3");
        taskTitle.textContent = title;
        task.append(checkbox, taskTitle);

        const buttonHolder = createElement("div", "center-content");
        const newSubtaskButton = createElement(
            "button",
            "add-project",
            "center-content",
            "new-subtask-button"
        );
        newSubtaskButton.setAttribute("data-index", index);
        newSubtaskButton.addEventListener("click", handleAddSubtaskButtonClick);
        const newSubtaskButtonIcon = createElement("img", "icon-button");
        newSubtaskButtonIcon.setAttribute("alt", "Add subtask button");
        newSubtaskButtonIcon.src = plusIcon;
        newSubtaskButton.appendChild(newSubtaskButtonIcon);
        buttonHolder.append(newSubtaskButton);

        taskRoot.append(task, buttonHolder);
        return taskRoot;
    };

    const createSubtask = (title) => {
        const subtaskElement = createElement(
            "div",
            "subtask-content",
            "align-center-content",
            "large-icon-title-gap"
        );
        const checkbox = createElement("input");
        checkbox.setAttribute("type", "checkbox");
        const subtaskTitle = createElement("h4");
        subtaskTitle.textContent = title;
        subtaskElement.append(checkbox, subtaskTitle);
        return subtaskElement;
    };

    const createAllSubtasks = (subtasks) => {
        const subtaskRootElement = createElement("div", "subtasks");
        for (let i = 0; i < subtasks.length; i++) {
            const subtask = subtasks[i];
            const subtaskElement = createSubtask(subtask.title);
            subtaskElement.setAttribute("data-index", i);
            subtaskRootElement.append(subtaskElement);
        }
        return subtaskRootElement;
    };

    const createDeleteButton = () => {
        const deleteButton = createElement("button");
        const deleteButtonImg = createElement("img", "icon-button");
        deleteButtonImg.src = deleteIcon;
        deleteButton.appendChild(deleteButtonImg);
    }

    /** Utilities */
    const clearSidebarProjects = () => {
        const sidebarProjects = getElement("ul.projects");
        sidebarProjects.textContent = "";
    };

    const clearContent = () => {
        contentRoot.textContent = "";
    };

    const resetProjectDialog = () => {
        projectTitleInput.value = "";
        projectDescriptionTextarea.value = "";
    };

    const resetTaskDialog = () => {
        taskTitleInput.value = "";
        taskDescriptionTextarea.value = "";
        taskDueDateInput.value = "";
    };

    const resetSubtaskDialog = () => {
        subtaskTitleInput.value = "";
    };

    /* Render DOM elements */
    const renderSidebar = (projects) => {
        const projectRoot = getElement("ul.projects");
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const projectElement = createElement(
                "li",
                "project",
                "sidebar-section-title"
            );
            projectElement.setAttribute("data-index", i);

            const projectNameWrapper = createElement(
                "div",
                "center-content",
                "icon-title-gap"
            );
            const projectColor = createElement("div", "project-color");
            const projectTitle = createElement("h3");
            projectTitle.textContent = project.title;
            projectNameWrapper.append(projectColor, projectTitle);

            const deleteButton = createDeleteButton();

            projectElement.append(projectNameWrapper, deleteButton);
            projectRoot.appendChild(projectElement);
        }
    };

    const renderProjectHeader = (project) => {
        const projectTitleWrapper = createElement(
            "div",
            "align-center-content",
            "large-icon-title-gap"
        );
        const projectColor = createElement(
            "div",
            "project-color",
            "content-title"
        );
        const projectTitle = createElement("h2");
        projectTitle.textContent = project.title;
        projectTitleWrapper.append(projectColor, projectTitle);

        const projectDescription = createElement("p");
        projectDescription.textContent = project.description;

        const lineSeparator = createElement("hr");
        contentRoot.append(
            projectTitleWrapper,
            projectDescription,
            lineSeparator
        );
    };

    const renderTasks = (project) => {
        const tasks = project.getTasks();
        for (let i = 0; i < tasks.length; i++) {
            const taskElement = createElement("div", "task");
            taskElement.setAttribute("data-index", i);

            const task = tasks[i];
            const mainTask = createMainTask(task.title, i);
            taskElement.append(mainTask);
            const subTasks = createAllSubtasks(task.getSubtasks());
            taskElement.append(subTasks);

            contentRoot.append(taskElement);
            const lineSeparator = createElement("hr");
            contentRoot.append(lineSeparator);
        }
    };

    const renderContent = (project) => {
        renderProjectHeader(project);
        renderTasks(project);
    };

    /** Event listeners / bind functions */
    newProjectButton.addEventListener("click", () => {
        newProjectDialog.showModal();
    });

    newTaskButton.addEventListener("click", () => {
        newTaskDialog.showModal();
    });

    const handleAddSubtaskButtonClick = (event) => {
        // add our task index to the dialog data-task-index
        const target = event.currentTarget;
        const taskIndex = target.dataset.index;
        newSubtaskDialog.setAttribute("data-index", taskIndex);
        newSubtaskDialog.showModal();
    };

    const bindProjectElement = (handler) => {
        const projectElements = document.querySelectorAll(".project");
        for (const projectElement of projectElements) {
            projectElement.addEventListener("click", (event) => {
                const target = event.currentTarget;
                const projectIndex = target.dataset.index;
                handler(projectIndex);
            })
        }
    }

    const bindConfirmNewProjectButton = (handler) => {
        const confirmNewProjectButton = getElement(
            "#new-project-dialog button.confirm"
        );
        confirmNewProjectButton.addEventListener("click", (event) => {
            event.preventDefault();
            const title = projectTitleInput.value;
            const description = projectDescriptionTextarea.value;
            resetProjectDialog();
            newProjectDialog.close();
            handler(title, description);
        });
    };

    const bindConfirmNewTaskButton = (handler) => {
        const confirmNewTaskButton = getElement(
            "#new-task-dialog button.confirm"
        );
        confirmNewTaskButton.addEventListener("click", (event) => {
            event.preventDefault();
            const title = taskTitleInput.value;
            const description = taskDescriptionTextarea.value;
            const dueDate = taskDueDateInput.value;
            const priority = taskPriorityInput.value;
            resetTaskDialog();
            newTaskDialog.close();
            // todo: modify project index
            handler(title, description, dueDate, priority);
        });
    };

    const bindConfirmNewSubtaskButton = (handler) => {
        const confirmNewSubtaskButton = getElement(
            "#new-subtask-dialog button.confirm"
        );
        confirmNewSubtaskButton.addEventListener("click", (event) => {
            event.preventDefault();
            const index = newSubtaskDialog.dataset.index;
            const title = subtaskTitleInput.value;
            resetSubtaskDialog();
            newSubtaskDialog.close();
            // todo: modify project index
            handler(index, title);
        });
    };

    return {
        renderSidebar,
        clearSidebarProjects,
        renderContent,
        clearContent,
        bindConfirmNewProjectButton,
        bindProjectElement,
        bindConfirmNewTaskButton,
        bindConfirmNewSubtaskButton,
    };
})();
