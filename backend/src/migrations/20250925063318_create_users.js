exports.up = (knex) =>
  knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("email").notNullable().unique();
    t.string("password_hash").notNullable();
    t.string("name");
    t.timestamps(true, true);
  });
exports.down = (knex) => knex.schema.dropTableIfExists("users");
