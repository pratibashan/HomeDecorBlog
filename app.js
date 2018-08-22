const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
//const postRoutes = require('./routes/post')
//const commentRoutes = require('./routes/comment')

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(
  session({
    secret: "blog",
    resave: false,
    saveUninitialized: false
  })
);

//mongoose.connect('mongodb://pratiba:Spring@123456@ds135441.mlab.com:35441/homedecorblogdb').then(() => {
mongoose
  .connect("mongodb://localhost/blogdb")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use('/blog',postRoutes)
app.use(postRoutes);
app.use(userRoutes);

app.use(function(err, req, res, next) {
  //console.log(err)
  res.status(err.status || 500).json({
    status: "error",
    message: err.message
  });
});
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () =>
  console.log("server listening on port 3000!")
);
