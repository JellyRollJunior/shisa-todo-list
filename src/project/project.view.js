import deleteIcon from "../images/delete.png"

export { View };

const View = (function() {
    const createElement = (tag, ...className) => {
        const element = document.createElement(tag);
        if (className) element.classList.add(...className);
        return element;
    }

    const getElement = (selector) => {
        return document.querySelector(selector);
    }

    const renderSidebar = (projects) => {
        const projectRoot = getElement("ul.projects");
        for (const project of projects) {
            const projectElement = createElement("li", "project", "sidebar-section-title");
            
            const projectNameWrapper = createElement("div", "center-content", "icon-title-gap");
            const projectColor = createElement("div", "project-color");
            const projectTitle = createElement("h3");
            projectTitle.textContent = project.title;
            projectNameWrapper.append(projectColor, projectTitle);

            const deleteButton = createElement("button");
            const deleteButtonImg = createElement("img", "icon-button");
            deleteButtonImg.src = deleteIcon;
            deleteButton.appendChild(deleteButtonImg);

            projectElement.append(projectNameWrapper, deleteButton);
            projectRoot.appendChild(projectElement);
        }
    }

    const contentRoot = getElement(".project-content");
    const renderProjectHeader = (project) => {
        const projectTitleWrapper = createElement("div", "align-center-content", "large-icon-title-gap");
        const projectColor = createElement("div", "project-color", "content-title");
        const projectTitle = createElement("h2");
        projectTitle.textContent = project.title;
        projectTitleWrapper.append(projectColor, projectTitle);

        const projectDescription = createElement("p");
        projectDescription.textContent = project.description;
        
        const lineSeparator = createElement("hr");
        contentRoot.append(projectTitleWrapper, projectDescription, lineSeparator);
    }

    const createBaseTask = (title) => {
        const task = createElement("div", "align-center-content", "large-icon-title-gap");
        const checkbox = createElement("input");
        checkbox.setAttribute("type", "checkbox");
        const taskTitle = createElement("h3");
        taskTitle.textContent = title;
        task.append(checkbox, taskTitle);
        return task;
    }

    const createMainTask = (title) => {
        const task = createBaseTask(title);
        task.classList.add("task-content");
        return task;
    }

    const createSubtask = (title) => {
        const subTaskElement = createElement("div", "subtask-content", "align-center-content", "large-icon-title-gap");
        const checkbox = createElement("input");
        checkbox.setAttribute("type", "checkbox");
        const subtaskTitle = createElement("h4");
        subtaskTitle.textContent = title;
        subTaskElement.append(checkbox, subtaskTitle);
        return subTaskElement;
    }

    const createAllSubtasks = (subtasks) => {
        const subtaskRootElement = createElement("div", "subtasks");
        for (const subtask of subtasks) {
            const subtaskElement = createSubtask(subtask.title);
            subtaskRootElement.append(subtaskElement);
        }
        return subtaskRootElement;
    }

    const renderTasks = (project) => {
        for (const task of project.getTasks()) {
            const taskElement = createElement("div", "task");

            const mainTask = createMainTask(task.title);
            taskElement.append(mainTask);
            const subTasks = createAllSubtasks(task.getSubtasks());
            taskElement.append(subTasks);

            contentRoot.append(taskElement);
            const lineSeparator = createElement("hr");
            contentRoot.append(lineSeparator);
        }
    }

    const renderContent = (project) => {
        renderProjectHeader(project);
        renderTasks(project)
    }

    return { renderSidebar, renderContent }
})();