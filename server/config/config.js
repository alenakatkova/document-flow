module.exports = {
  username: "username",
  password: "postgres",
  database: "api",
  dialect: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  REDIS_URL: process.env.REDIS_URL || "redis", // redis is a container's name
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};