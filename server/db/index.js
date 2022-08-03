module.exports = {
  host: "postgres-db",
  user: "username",
  password: "postgres",
  db: "api",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};