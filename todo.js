
const fs = require('fs')
const filePath = "./tasks.json";
const chalk =  require("chalk");

console.log(chalk.blue.bold("\n AisTask-CLI \n"));

const loadTasks = ()=>{
    try{
      const dataBuffer = fs.readFileSync(filePath);
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON)
    }catch(error){
        return [];
    }
}

const saveTasks = (tasks) => {
     const dataJSON = JSON.stringify(tasks)
     fs.writeFileSync(filePath, dataJSON)
}

const addTask = (task)=>{
    const tasks = loadTasks()
    tasks.push({task});
    saveTasks(tasks);
    console.log(chalk.green("Task added!", task));
    
}

const listTasks = () =>{
    const tasks = loadTasks()
    tasks.forEach((task, index) =>console.log(`${index + 1} - ${task.task}`))
    
}

const removeTask = (index) =>{
    let tasks = loadTasks();
    if(index < 0 || index >= tasks.length) return "Invalid task number"

    const deletedtask = tasks.splice(index,1)[0];
    
    saveTasks(tasks);
    console.log(chalk.yellow(`Task deleted at index ${index} -- ${deletedtask.task}`));
    
}

const command = process.argv[2]
const argument = process.argv[3]
if(command === 'add'){
    addTask(argument)
}else if(command === 'list'){
    console.log(chalk.cyan("\nYour Tasks:\n"));
    listTasks()
}else if(command === 'remove'){
    removeTask(parseInt(argument))
}else{
    console.log(chalk.red("Command not found"));
    
}