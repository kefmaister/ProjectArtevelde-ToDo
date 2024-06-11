import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

import Category from "./Category.js";

// define the NavigationItem model
class Task extends Model {
  static get tableName() {
    return "task_items";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        isDone: { type: "boolean" },
        category_id: { type: "integer" },
        user_id: { type: "integer" },
      },
    };
  }
  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "task_items.category_id",
          to: "category_items.id",
        },
      },
    };
  }
  static get relationMappings() {
    return {
      tasks: {
        relation: Model.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: "users.id",
          to: "task_items.user_id",
        },
      },
    };
  }
}

export default Task;
