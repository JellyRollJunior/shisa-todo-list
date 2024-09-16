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

    const projectRoot = getElement("ul.projects");
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

    const taskDialog = getElement("#task-dialog");

    /** Create DOM elements */
    const createDeleteButton = () => {
        const deleteButton = createElement("button");
        const deleteButtonImg = createElement("img", "icon-button");
        deleteButtonImg.src = deleteIcon;
        deleteButton.appendChild(deleteButtonImg);
        return deleteButton;
    }

    const createDeleteProjectButton = () => {
        const deleteProjectButton = createDeleteButton();
        deleteProjectButton.classList.add("delete-project-button");
        return deleteProjectButton;
    }

    const createSidebar = (projects) => {
        const sidebarElements = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const projectElement = createElement(
                "li",
                "project",
                "sidebar-section-title"
            );

            const projectNameWrapper = createElement(
                "div",
                "center-content",
                "icon-title-gap"
            );
            projectNameWrapper.setAttribute("data-index", i);
            const projectColor = createElement("div", "project-color");
            const projectTitle = createElement("h3");
            projectTitle.textContent = project.title;
            projectNameWrapper.append(projectColor, projectTitle);

            const deleteButton = createDeleteProjectButton();
            deleteButton.setAttribute("data-index", i);

            projectElement.append(projectNameWrapper, deleteButton);
            sidebarElements.push(projectElement);
        }
        return sidebarElements;
    };

    const createProjectHeader = (project) => {
        const headerElements = [];
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
        headerElements.push(projectTitleWrapper, projectDescription, lineSeparator);
        return headerElements;
    }

    const createNewSubtaskButton = () => {
        const newSubtaskButton = createElement(
            "button",
            "add-project",
            "center-content",
            "new-subtask-button"
        );
        newSubtaskButton.addEventListener("click", handleAddSubtaskButtonClick);
        const newSubtaskButtonIcon = createElement("img", "icon-button");
        newSubtaskButtonIcon.setAttribute("alt", "Add subtask button");
        newSubtaskButtonIcon.src = plusIcon;
        newSubtaskButton.appendChild(newSubtaskButtonIcon);
        return newSubtaskButton;
    }

    const createDeleteTaskButton = () => {
        const deleteTaskButton = createDeleteButton();
        deleteTaskButton.classList.add("delete-task-button");
        return deleteTaskButton;
    }

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
        taskTitle.setAttribute("data-index", index);
        task.append(checkbox, taskTitle);

        const newSubtaskButton = createNewSubtaskButton();
        newSubtaskButton.setAttribute("data-index", index);
        
        const deleteButton = createDeleteTaskButton();
        deleteButton.setAttribute("data-index", index);
        const buttonHolder = createElement("div", "center-content");
        buttonHolder.append(newSubtaskButton, deleteButton);

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

    const createAllTasks = (project) => {
        const tasks = project.getTasks();
        const taskElementArray = [];
        for (let i = 0; i < tasks.length; i++) {
            const taskElement = createElement("div", "task");
            taskElement.setAttribute("data-index", i);

            const task = tasks[i];
            const mainTask = createMainTask(task.title, i);
            taskElement.append(mainTask);
            const subTasks = createAllSubtasks(task.getSubtasks());
            taskElement.append(subTasks);

            const lineSeparator = createElement("hr");
            taskElementArray.push(taskElement, lineSeparator);
        }
        return taskElementArray;
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

    const appendElements = (rootElement, elements) => {
        for (const element of elements) {
            rootElement.appendChild(element);
        }
    }

    /* Render DOM elements */
    const renderSidebar = (projects) => {
        const sidebarElements = createSidebar(projects);
        appendElements(projectRoot, sidebarElements);
    }

    const renderContent = (project) => {
        appendElements(contentRoot, createProjectHeader(project));
        appendElements(contentRoot, createAllTasks(project));
    };

    const renderTaskDialog = (task) => {
        const title = getElement("#task-title");
        const description = getElement("#task-description");
        const duedate = getElement("#due-date");
        const priority = getElement("#priority");
        title.textContent = task.title;
        description.textContent = task.description;
        duedate.textContent = task.dueDate;
        priority.textContent = task.priority;
        taskDialog.showModal();
    }

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

    // provide index of expanded task to controller
    const bindTaskTitleClick = (handler) => {
        const taskTitles = document.querySelectorAll("div.task h3");
        for (const title of taskTitles) {
            title.addEventListener("click", (event) => {
                const target = event.currentTarget;
                const index = target.dataset.index;
                handler(index);
            })
        }
    }

    const bindDeleteProjectButton = (handler) => {
        const deleteProjectButtons = document.querySelectorAll(".delete-project-button");
        for (const button of deleteProjectButtons) {
            button.addEventListener("click", (event) => {
                const target = event.currentTarget;
                const index = target.dataset.index;

                console.log("index: " + index);
                handler(index);
            })
        }
    }

    const bindDeleteTaskButton = (handler) => {
        const deleteButtons = document.querySelectorAll(".delete-task-button");
        for (const button of deleteButtons) {
            button.addEventListener("click", (event) => {
                const target = event.currentTarget;
                const index = target.dataset.index;
                handler(index);
            })
        }
    }

    const bindProjectTitleWrapper = (handler) => {
        const projectElements = document.querySelectorAll(".project > div");
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
            handler(index, title);
        });
    };

    return {
        renderSidebar,
        clearSidebarProjects,
        renderContent,
        clearContent,
        renderTaskDialog,
        bindTaskTitleClick,
        bindConfirmNewProjectButton,
        bindProjectTitleWrapper,
        bindConfirmNewTaskButton,
        bindConfirmNewSubtaskButton,
        bindDeleteProjectButton,
        bindDeleteTaskButton,
    };
})();
