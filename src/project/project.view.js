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

    const contentRoot = getElement(".content");

    const renderProjectsSidebarSection = (projects) => {
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

    const renderTasks = (project) => {
        for (const task of project.getTasks()) {
            const taskElement = createElement("div", "task");
            
            const taskContent = createElement("div", "task-content", "align-center-content", "large-icon-title-gap");
            const checkbox = createElement("input");
            checkbox.setAttribute("type", "checkbox");
            const taskTitle = createElement("h3");
            taskTitle.textContent = task.title;
            taskContent.append(checkbox, taskTitle);
            taskElement.append(taskContent);

            // add subtask here
            contentRoot.append(taskElement);
            const lineSeparator = createElement("hr");
            contentRoot.append(lineSeparator);
        }
    }

    const renderProjectContent = (project) => {
        renderProjectHeader(project);
        renderTasks(project)
    }

    return { renderProjectsSidebarSection, renderProjectContent }
})();