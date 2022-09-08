const express = require("express");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const {
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});

const teamRouter = require("./routes/team");
const authRouter = require("./routes/auth");
const counterpartyRouter = require("./routes/counterparty");
const contactRouter = require("./routes/contact");
const agreementRouter = require("./routes/agreement");
const contractRouter = require("./routes/contract");
const invoiceRouter = require("./routes/invoice");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
      cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 10000000,
      },
    })
);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("<h2>Hello there</h2>");
});

app.use("/api/teams", teamRouter);
app.use("/api/auth", authRouter);
app.use("/api/counterparties", counterpartyRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/agreements", agreementRouter);
app.use("/api/contracts", contractRouter);
app.use("/api/invoices", invoiceRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
