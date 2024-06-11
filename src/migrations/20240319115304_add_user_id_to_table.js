const tableName = "task_items";

export function up(knex) {
  return knex.schema.table(tableName, (table) => {
    table.integer("user_id").unsigned();
  });
}

export function down(knex) {
  return knex.schema.table(tableName, (table) => {
    table.dropColumn("category_id");
  });
}
