exports.up = (knex) =>
  knex.schema.createTable("reminders", (t) => {
    t.increments("id").primary();
    t.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.string("title").notNullable();
    t.text("description");
    t.timestamp("send_at").notNullable();
    t.boolean("sent").defaultTo(false);
    t.timestamp("sent_at");
    t.timestamps(true, true);
  });
exports.down = (knex) => knex.schema.dropTableIfExists("reminders");
