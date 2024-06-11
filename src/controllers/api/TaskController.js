import Task from "../../models/Task.js";

// get task by id
export const getTask = async (req, res) => {
  const id = req.params.id;
  const taskList = await Task.query().findById(id);
  res.status(200).json({
    taskList,
  });
};

// get all tasks

export const getAllTasks = async (req, res) => {
  const taskList = await Task.query();
  res.status(200).json({
    taskList,
  });
};

// create a task
export const createTask = async (req, res) => {
  const title = req.body.title;
  const isDone = req.body.isDone || false;
  const category = req.body.category;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  if (!category) {
    return res.status(400).json({
      error: "Category is required",
    });
  }


  //if isDone is not provided, default to false
  const task = await Task.query().insert({ title, isDone, category });
  res.status(201).json({
    message: "Task created successfully",
    task,
  });
};

// update a task

export const updateTask = async (req, res) => {
  //step 1 validate if id & title are present in the request body
  if (!req.body.id || !req.body.title) {
    res.status(400).json({
      error: "id and title are required",
    });
    return;
  }
  //step 2 check if the task with id exists
  const id = req.body.id;
  const task = await Task.query().findById(id);
  if (!task) {
    res.status(404).json({
      error: "Task not found",
    });
    return;
  }
  //step 3 check if no other task with the same title exists
  const title = req.body.title;
  const taskWithSameTitle = await Task.query().where("title", title).first();
  if (taskWithSameTitle) {
    res.status(400).json({
      error: "Task with the same title exists",
    });
    return;
  }

  //step 4 update the task
  const updatedTask = await Task.query().patchAndFetchById(id, { title });

  //step 5 return the updated task

  res.status(200).json({
    message: "Task updated successfully",
    task: updatedTask,
  });
};

// delete a task
export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const task = await Task.query().deleteById(id);
  res.json({
    message: "Task deleted successfully",
    task,
  });
};
