import "./styles.css";
import { ProjectController } from "./project/project.controller.js";

console.log("hello world");

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

ProjectController.addProject("Project Title", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam amet quo, ab quidem expedita cumque natus doloremque incidunt deleniti id odit. Quidem perferendis animi nulla consectetur repudiandae adipisci, molestias quam.");
ProjectController.addTask(0, "Task Title: Take out the garbage or something", "description 1", "due date 1", "priority 1");
ProjectController.addSubTask(0, 0, "Subtask Title: Bring recycling in too");
ProjectController.addSubTask(0, 0, "Subtask Title: Bring compost in too even though we don't compost");
ProjectController.addTask(0, "Task Title: Remember to call grandma", "description 1", "due date 1", "priority 1");

ProjectController.renderSidebar();
ProjectController.renderContent(0);
console.log("test");