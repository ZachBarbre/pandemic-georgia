require("dotenv").config();
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const es6Renderer = require("express-es6-template-engine");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const gameRouter = require("./routes/game");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    secret: "pandemic",
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
  })
);

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/game", gameRouter);

module.exports = app;
