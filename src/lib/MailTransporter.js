import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import hbs from "nodemailer-express-handlebars";
import path from "path";
import { VIEWS_PATH } from "../constants.js";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: process.env.MAIL_PORT || 1025,
  auth: {
    user: process.env.MAIL_USER || "project.toDo",
    pass: process.env.MAIL_PASS || "secret.toDo",
  },
});

export default transporter;
