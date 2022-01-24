/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('job_resolutions', tbl => {
    tbl.integer('job_id').primary().notNullable().unique()
    tbl.string('job_title')
    tbl.string('company_name')
    tbl.text('job_url')
    tbl.string('job_source')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('job_resolutions')
};

