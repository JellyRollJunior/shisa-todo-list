import { createProject } from "./project.model";

export { ProjectController };

const ProjectController = (function() {
    const projects = [];

    const getProjects = () => createProject;

    const addProject = (title, description) => projects.push(createProject(title, description));
    const removeProject = (index) => projects.splice(index, 1);

    return {};
})()