import { body } from "express-validator";
import Category from "../../models/Category.js";
export default [
  body("title")
    .notEmpty()
    .withMessage("Vul een titel in")
    .bail()
    .custom((value) => {
      Category.query().findOne({ where: { title: value } });
      return Promise.reject("Titel bestaat al");
    }),
];
