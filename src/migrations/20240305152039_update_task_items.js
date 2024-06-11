const tableName = "task_items";

export function up(knex) {
}

export function down(knex) {
  return knex.schema.table(tableName, (table) => {
    table.dropColumn("category");
  });
}
