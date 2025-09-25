require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: { directory: __dirname + "/../migrations" },
  },
};
