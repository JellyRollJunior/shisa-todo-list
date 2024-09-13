export { project } ;

function project(title, description) {

    const tasks = [];

    const getTasks = () => tasks;
    
    const addTask = (task) => tasks.push(task);

    const removeTask = (index) => tasks.splice(index, 1);
    
    return {title, description, getTasks, addTask, removeTask};
}