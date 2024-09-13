import "./styles.css";
import { ProjectController } from "./project/project.controller.js";

console.log("hello world");

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

ProjectController.addProject("project 1", "descript");
ProjectController.addTask(0, "title 1", "description 1", "due date 1", "priority 1");
ProjectController.addSubTask(0, 0, "Subtask 1");
ProjectController.displayProjects();
console.log("test");