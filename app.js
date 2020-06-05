const config = require("config");
const bodyParser = require("body-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const filesRoute = require("./routes/files");
const index = require("./routes/index");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const emailVerificationRoute = require("./routes/emailVerification");
const devRoute = require("./routes/dev");
var ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(fileUpload({ createParentPath: true }));

app.use("/hello", (req, res) => {
  res.render("emailConfirmation", { email: "bhutani" });
})

app.use("/files", express.static("./public"));
app.use("/dev", devRoute);
app.use("/files", filesRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/email", emailVerificationRoute);
app.use("/", index);

app.listen(3000, console.log("Running Server"));

module.exports = app;