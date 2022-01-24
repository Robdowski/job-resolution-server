/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('companies', tbl => {
      tbl.increments()
      tbl.string('company_name').notNullable()
      tbl.string('rating').notNullable()
      tbl.string('root_domain').notNullable()
      tbl.text('logo_file').notNullable()
      tbl.text('description').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('companies')
};
