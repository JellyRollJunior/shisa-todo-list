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

    const displayProjects = (projects) => {
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

    return { displayProjects }
})();