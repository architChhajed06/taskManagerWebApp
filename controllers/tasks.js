const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try{
        console.log("Fetching tasks");
        const tasks = await Task.find({}); //Will find and get all the tasks
        console.log("All the tasks are fetched: ", tasks);
        res.status(200).json({tasks});
    }
    catch( error ){
        res.status(500).json({msg: 'Due to some error, we could not fetch all the tasks'})
    }
}


const createTask = async (req, res) => {
    try{

        console.log(req.body)
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch (error){
        res.status(500).json({msg: error})
    }
}
const getTask = async (req, res) => {
    try{
        const {id:taskID} = req.params;
        const singleTask = await Task.findOne({_id:taskID});
        console.log("SINGLE TASK HAS BEEN FETCHED: ", singleTask);
        if(!singleTask){    //If the single task is not found
            return res.status(404).json({msg: "No task with this particular ID"}); //Here the return keyword is very important since if we do not provide the return keyword we would continue to send in the next responses  
        }
        res.json({singleTask});
    }
    catch( error ){  
        res.json({error});
    }
}
const deleteTask = async (req, res) => {
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        console.log("Task to be deleted", task);
        if(!task){
            return res.status(404).json({ msg: "The task to be deleted does not exist"});
        }
        return res.json({ taskDeleted: {task}, deletionSuccess: true});
    }
    catch( error ){
        console.log("Error", error);
        res.status(500).json({error});
    }
}

const updateTask = async (req, res) => {
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true});
        if(!task){
            return res.json({msg: `No task with ID  ${taskID}`});
        }
        res.status(200).json({taskID:taskID, task: req.body});
    }
    catch( error ){
        res.status(500).json( {msg: "The update was unsuccesful", error: {error}} )
    }
}

module.exports = {getAllTasks,
createTask,
getTask,
updateTask,
deleteTask}