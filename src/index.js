import "./styles.css";
import { ProjectController } from "./project/project.controller.js";

console.log("hello world");

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

ProjectController.addProject("Project Title", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam amet quo, ab quidem expedita cumque natus doloremque incidunt deleniti id odit. Quidem perferendis animi nulla consectetur repudiandae adipisci, molestias quam.");
ProjectController.addTask(0, "title 1", "description 1", "due date 1", "priority 1");
ProjectController.addSubTask(0, 0, "Subtask 1");
ProjectController.renderProjectsSidebarSection();
ProjectController.renderProjectContent(0);
console.log("test");