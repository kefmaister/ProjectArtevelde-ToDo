// import statements
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import cookieParser from "cookie-parser";
import MailTransporter from "./lib/MailTransporter.js";
import { PORT, VIEWS_PATH } from "./constants.js";
import {
  show,
  home,
  login,
  tasks,
  register,
} from "./controllers/PagesController.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";
import {
  getTask,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./controllers/api/TaskController.js";
import * as AuthController from "./controllers/AuthController.js";
import * as TaskController from "./controllers/TaskController.js";
import * as CategoryController from "./controllers/CategoryController.js";
import TaskValidation from "./middleware/validation/TaskValidation.js";
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";
import CategoryValidation from "./middleware/validation/CategoryValidation.js";
import jwtAuth from "./middleware/jwtAuth.js";
import { getDefensieData } from "./controllers/api/DefensieController.js";

// create an instance of express
const app = express();

// serve static files from the public folder
app.use(express.static("public"));

/**
 * Body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Cookie parser
 */
app.use(cookieParser());

// ------------------ Handlebars configuration ------------------

// handlebars instance
const hbs = create({
  extname: ".hbs",
  defaultLayout: "main",
  helpers: HandlebarsHelpers,
});

// set handlebars as the view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH); // location of the handlebars files

// ------------------ End of handlebars config ------------------

/**
 * Auth routes
 */
app.get("/login", AuthController.login);
app.get("/register", AuthController.register);

app.post(
  "/register",
  AuthRegisterValidation,
  AuthController.postRegister,
  AuthController.register
);

app.post(
  "/login",
  AuthLoginValidation,
  AuthController.postLogin,
  AuthController.login
);

app.post("/login", AuthController.postLogin);
/**
 * Task routes.
 */
app.post("/tasks", jwtAuth, TaskValidation, TaskController.handlePost);
app.post(
  "/category",
  jwtAuth,
  CategoryValidation,
  CategoryController.handlePost
);

// page routes
app.get("/", jwtAuth, home);
app.get("/tasks", jwtAuth, tasks);
app.get("/category/:slug", jwtAuth, show);

// logout route
app.post("/logout", AuthController.logout);

app.post("/api/defensie", getDefensieData);

//catch all route, if no other route matches

app.get("*", (req, res) => {
  res.render("errors/message", {
    code: 404,
    title: "Page not found",
    message: "The page you are looking for does not exist.",
  });
});
/**
 * API task routes.
 */
app.get("/api/tasks", getAllTasks);
app.get("/api/task/:id", getTask);
app.post("/api/task", createTask);
app.put("/api/task", updateTask);
app.delete("/api/task/:id", deleteTask);

// start the server, listen on port defined in .env file
app.listen(PORT, () => {
  // callback function that is called when the server starts
  console.log(`Application is running on http://localhost:${PORT}.`);
});
