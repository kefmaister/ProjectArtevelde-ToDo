const tableName = "category_items";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("slug").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
