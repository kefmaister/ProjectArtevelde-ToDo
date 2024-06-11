import { body } from "express-validator";
import Task from "../../models/Task.js";

export default [
  body("title")
    .notEmpty()
    .withMessage("Vul een titel in")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Titel moet minimaal 10 karakters bevatten"),
];
