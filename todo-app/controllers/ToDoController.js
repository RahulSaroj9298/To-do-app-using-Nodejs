const ToDoModel = require('../models/ToDoModels');

module.exports.getToDo = async (_req, res) => {
    const Todo = await ToDoModel.find();
    res.send(Todo);
}


module.exports.saveToDo = async (req, res) => {
    const { text } = req.body;

    ToDoModel
        .create({ text })
        .then(()=> res.set(201).send("Added successfully..."))
        .catch((err)=> console.log(err));   
}

module.exports.deleteToDo =(req, res) => {
    const { _id } = req.body;
    ToDoModel
        .findByIdAndDelete(_id)
        .then(()=> res.set(201).send("Deleted successfully..."))
        .catch((err)=> console.log(err));
}

module.exports.updateToDo = async (req, res) => {
    const { _id, text } = req.body;
    ToDoModel
        .findByIdAndUpdate(_id, { text })
        .then(()=> res.set(201).send("Updated successfully..."))
        .catch((err)=> console.log(err));
}