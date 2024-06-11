import Category from "../models/Category.js";
import Task from "../models/Task.js";
import { validationResult } from "express-validator";

export const index = async (req, res) => {};

export const create = async (req, res) => {
  const errors = validationResult(req); // Get validation errors
  errors.array().forEach((err) => {
    console.log(err.msg);
  });
  if (!errors.isEmpty()) {
    // If there are validation errors, render the page with error messages
    const category = await Category.query();
    const taskList = await Task.query();
    let formErrorsCategory = errors.array().map((err) => {
      return err.msg;
    });
    res.render("home", {
      categories: category,
      tasks: taskList,
      formErrorsCategory: formErrorsCategory,
    });
    return;
  }
  const category = await Category.query().insert({
    title: req.body.title,
    slug: req.body.title.toLowerCase(),
  });
  res.redirect("/tasks");
};

export const update = async (req, res) => {
  const categoryId = req.body.id;
  const category = await Category.query().patchAndFetchById(categoryId, {
    title: req.body.category,
    slug: req.body.category.toLowerCase(),
  });
  res.redirect("/tasks");
};

export const handlePost = async (req, res) => {
  const methode = req.body.method;
  const id = req.body.id;

  if (methode === "POST") {
    create(req, res);
  }
  if (methode === "PUT") {
    update(req, res);
  }
};
