exports.up = function (knex) {
  return (
    knex.schema
      // Users
      .createTable("users", function (table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.enu("role", ["customer", "admin"]).defaultTo("customer");
        table
          .string("profile_picture")
          .defaultTo("public/fotoprofile/default.jpg");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Menus
      .createTable("menus", function (table) {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.text("description").nullable();
        table.decimal("price", 10, 2).notNullable();
        table.enu("category", ["food", "drink"]).notNullable();
        table
          .string("image", 255)
          .nullable()
          .defaultTo("/public/image/default.jpg");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Menu Details
      .createTable("menu_details", function (table) {
        table.increments("id").primary();
        table
          .integer("menu_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("menus")
          .onDelete("CASCADE");
        table.text("ingredients").notNullable();
        table.integer("calories").nullable();
        table.string("serving_size").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Orders
      .createTable("orders", function (table) {
        table.increments("id").primary();
        table
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.decimal("total_amount", 10, 2).notNullable();
        table
          .enu("status", ["pending", "completed", "canceled"])
          .defaultTo("pending")
          .notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Order Details
      .createTable("order_details", function (table) {
        table.increments("id").primary();
        table
          .integer("order_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("orders")
          .onDelete("CASCADE");
        table
          .integer("menu_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("menus")
          .onDelete("CASCADE");
        table.integer("quantity").notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.decimal("total", 10, 2).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Payment Transactions
      .createTable("payment_transactions", function (table) {
        table.increments("id").primary();
        table
          .integer("order_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("orders")
          .onDelete("CASCADE");
        table.string("pg_transaction_id").notNullable();
        table.text("qr_code_url").notNullable();
        table
          .enu("status", [
            "pending",
            "settlement",
            "cancel",
            "expire",
            "failure",
          ])
          .defaultTo("pending")
          .notNullable();
        table.integer("amount").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
  );

  // Personal Access Tokens (jika perlu)
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("payment_transactions")
    .dropTableIfExists("order_details")
    .dropTableIfExists("orders")
    .dropTableIfExists("menu_details")
    .dropTableIfExists("menus")
    .dropTableIfExists("users");
};
