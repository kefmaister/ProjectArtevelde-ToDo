// import { tasks, categories } from "../data/data.js";
import Task from "../models/Task.js";
import Category from "../models/Category.js";

export const home = async (req, res) => {
  res.redirect("/login");
  // console.log(req.body);
};

export const tasks = async (req, res) => {
  const taskList = await Task.query().where("user_id", req.user.id);
  const category = await Category.query();
  const user = req.user;
  res.render("home", { tasks: taskList, categories: category, user });
};

export const show = async (req, res) => {
  const slug = req.params.slug;
  const category = await Category.query().findOne({ slug });
  const categoryList = await Category.query();
  const user = req.user;

  //find category by slug
  const tasks = await Task.query()
    .where("category_id", category.id)
    .andWhere("user_id", req.user.id);
  // console.log(category);
  res.render("categoryDetail", {
    category,
    tasks,
    categories: categoryList,
    activeSlug: slug,
    user,
  });
};

export const login = async (req, res) => {
  const data = {
    title: "Login Page",
  };
  res.render("login", data);
};
export const register = async (req, res) => {
  const data = {
    title: "Register",
  };
  res.render("register", data);
};
