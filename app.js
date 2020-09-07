//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Initialize a new express app
const app = express();

//Tell the app to use EJS as its view engine
app.set('view engine', 'ejs');

//Require body-parser module
app.use(bodyParser.urlencoded({
  extended: true
}));

//Tell the app to use all the statics files inside the public folder
app.use(express.static("public"));

//Create the first get route on the home route
app.get("/", function(req, res) {

  //Render the home.ejs file (page)
  res.render("home", {

    //Render the text of the const homeStartingContent in the paragraph tag inside the home.ejs
    startingContent: homeStartingContent
  });
});

//Create the route to the about.ejs page
app.get("/about", function(req, res) {

  //Render the about.ejs file (page)
  res.render("about", {
    //Render the text of the const aboutContent in the paragraph tag inside the about.ejs
    aboutText: aboutContent
  });
});

//Create the route to the contact.ejs page
app.get("/contact", function(req, res) {

  //Render the contact.ejs file (page)
  res.render("contact", {
    //Render the text of the const contactContent in the paragraph tag inside the contact.ejs
    contactText: contactContent
  });
});

//Create the route to the compose.ejs page
app.get("/compose", function(req, res) {

  //Render the compose.ejs file (page)
  res.render("compose");
});

//Catch the POST request made to the compose.ejs route
app.post("/compose", function(req, res) {

  //Log what has been entered in the title input in compose.ejs
  console.log(req.body.postTitle);
});

//Set up the server to listen to port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});