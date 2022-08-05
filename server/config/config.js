module.exports = {
  username: "username",
  password: "postgres",
  database: "api",
  dialect: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
};