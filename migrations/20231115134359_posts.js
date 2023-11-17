/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('username').checkLength('>=', 5).notNullable();
    table.string('title').checkLength('>=', 5).notNullable();
    table.text('text').checkLength('>=', 50).notNullable();
    table.datetime('date').notNullable().defaultTo(knex.fn.now());
    table.boolean('updated').defaultTo(false);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('posts');
};
