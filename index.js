const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

const app = express();
const homeRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const clientRoutes = require("./routes/client");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

// const MONGODB_URI =
//   "mongodb+srv://harsh:test123@cluster0.0oiif.mongodb.net/business";

const MONGODB_URI = "mongodb://localhost/business";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use((req, res, next) => {

  if (req.session.user === undefined) {
    return next();
  }
  console.log(req.session.user._id);
  User.findOne({ _id: req.session.user._id })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
})

app.use(homeRouter);
app.use(authRouter);
app.use(clientRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
