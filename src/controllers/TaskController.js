import Task from "../models/Task.js";
import Category from "../models/Category.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import MailTransporter from "../lib/MailTransporter.js";

export const index = async (req, res) => {
  console.log(req.body);
};

export const create = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req); // Get validation errors
  // const userId = req.user;
  errors.array().forEach((err) => {
    console.log(err.msg);
  });
  if (!errors.isEmpty()) {
    // If there are validation errors, render the page with error messages
    const taskList = await Task.query();
    const category = await Category.query();
    let formErrors = errors.array().map((err) => {
      return err.msg;
    });
    res.render("home", {
      tasks: taskList,
      categories: category,
      formErrors: formErrors,
    });
    return;
  }

  const task = await Task.query().insert({
    title: req.body.title,
    isDone: req.body.isDone ? true : false,
    category_id: parseInt(req.body.category),
    user_id: req.user.id,
  });

  try {
    MailTransporter.sendMail({
      from: "noreply@TodoApp.be",
      to: req.user.email,
      subject: "New Task",
      text: "There is a new task added to your list: " + task.title,
    });

    req.flash = {
      type: "success",
      message: "Email has been sent",
    };
  } catch (error) {
    req.flash = {
      type: "danger",
      message:
        "Er is een fout opgetreden bij het versturen van je bericht <br>" +
        error.message,
    };
    return next();
  }

  res.redirect("/tasks");
};

export const update = async (req, res, next) => {
  const taskId = req.body.id;
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    // If there are validation errors, render the page with error messages
    const taskList = await Task.query().where("user_id", req.user.id);
    const currentTaskIndex = taskList.findIndex((task) => {
      console.log(task.id, taskId);
      return task.id == taskId;
    });
    console.log(taskList);

    const category = await Category.query();
    let taskErrorsUpdate = errors.array().map((err) => {
      return err.msg;
    });

    if (currentTaskIndex) {
      taskList[currentTaskIndex].errors = taskErrorsUpdate;
    }

    res.render("home", {
      tasks: taskList,
      categories: category,
    });
    return;
  }

  const task = await Task.query().patchAndFetchById(taskId, {
    title: req.body.title,
    isDone: req.body.isDone ? true : false,
    category_id: parseInt(req.body.category_id),
  });
  res.redirect("/tasks");
};

export const destroy = async (req, res) => {
  const id = req.body.id;
  const deleted = await Task.query().deleteById(id);
  if (deleted) {
    res.redirect("/tasks");
  }
};

export const send = async (req, res, next) => {
  const taskList = await Task.query().where("user_id", req.user.id);
  p;
  try {
    MailTransporter.sendMail({
      from: "noreply@TodoApp.be",
      to: req.body.email,
      subject: "Your Task List",
      html: `<h1>This is your task list:</h1>
              <ul>
              ${taskList.map((task) => "<li>" + task.title + "</li>")},
              </ul>
              `,
    });

    req.flash = {
      type: "success",
      message: "Email has been sent",
    };
  } catch (error) {
    req.flash = {
      type: "danger",
      message:
        "Er is een fout opgetreden bij het versturen van je bericht <br>" +
        error.message,
    };
    return next();
  }

  res.redirect("/tasks");
};

export const handlePost = async (req, res, next) => {
  const methode = req.body.method;
  const isDelete = req.body.isDelete || false;
  const id = req.body.id;

  if (isDelete) {
    destroy(req, res, next);
    return;
  } else if (methode === "POST") {
    create(req, res, next);
    return;
  } else if (methode === "SEND") {
    send(req, res, next);
    return;
  }

  update(req, res, next);
};
