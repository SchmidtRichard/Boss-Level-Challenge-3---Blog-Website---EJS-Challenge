//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


//***** Boss Level Challenge - Blog Website Upgrade *****//
//***** Save Composed Posts with MongoDB *****//
//Require Mongoose package that have just been installed
const mongoose = require("mongoose");




// lodash - Load the full build.
const _ = require('lodash');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Create a new app using express
const app = express();

//Tell the app to use EJS as its view engine
app.set('view engine', 'ejs');

//Require body-parser module
app.use(bodyParser.urlencoded({
  extended: true
}));

//Tell the app to use all the statics files inside the public folder
app.use(express.static("public"));





//***** Boss Level Challenge - Blog Website Upgrade *****//
//***** Save Composed Posts with MongoDB *****//
//Create a new DB inside mongoDB called blogDB
//Connect to the new URL where mongoDB is hosted locally (usually localhost:27017)
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

//Create the postSchema for the mongoDB
const postSchema = {
  title: String,
  content: String
};

//Create a new mongoose model (Post) using the Postschema to define the posts collection (posts)
const Post = mongoose.model("Post", postSchema);



//***** Boss Level Challenge - Blog Website Upgrade *****//
//***** Get the Home Page to Render the Posts *****//
//Global variable posts to store all the posts (title and content) in the array
//let posts = [];

//Create the first get route on the home route
app.get("/", function(req, res) {



  //***** Boss Level Challenge - Blog Website Upgrade *****//
  //***** Get the Home Page to Render the Posts *****//
  Post.find({}, function(err, posts) {


    //Render the home.ejs file (page)
    res.render("home", {

      //Render the text of the const homeStartingContent in the paragraph tag inside the home.ejs
      startingContent: homeStartingContent,

      //Render the posts inside the home.ejs
      myPosts: posts
    });

  });


  // //Render the home.ejs file (page)
  // res.render("home", {
  //
  //   //Render the text of the const homeStartingContent in the paragraph tag inside the home.ejs
  //   startingContent: homeStartingContent,
  //
  //   //Render the posts inside the home.ejs
  //   myPosts: posts
  // });



});

//Create the route to the compose.ejs page
app.get("/compose", function(req, res) {

  //Render the compose.ejs file (page)
  res.render("compose");
});






//***** Boss Level Challenge - Blog Website Upgrade *****//
//***** Render the correct blog post based on post _id *****//
//In the app.post() method for the /post route, you should change the express route parameter to postId instead.

//Catch the POST request made to the compose.ejs route
app.post("/compose", function(req, res) {

  //Create JS Object called post to store the title and the body message
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody

  });

  //***** Boss Level Challenge - Blog Website Upgrade *****//
  //***** Fix the Bug *****//
  //Callback to the save method to only redirect to the home page once save is complete with no errors
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });



  //You can use the findOne() method to find the post with a matching id in the posts collection.
  // Post.findOne({
  //   _id: requestedPostId
  // }, function(err, post) {

});

//Save the document to the DB instead of pushing it ot the posts array
//post.save();


//Append the posts (title and content) to the posts array (global variable)
//posts.push(post);

//Redirect the user back to the home page (/)
//res.redirect("/");

// console.log("*************** POSTS ARRAY ***************");
// console.log(posts);

//Log what has been entered in the title and body input in compose.ejs
// console.log("*************** POST TITLE ***************\n" + req.body.postTitle);
// console.log("*************** POST BODY ***************\n" + req.body.postBody);






//***** Boss Level Challenge - Blog Website Upgrade *****//
//***** Render the correct blog post based on post _id *****//

//Express Routing Parameters
app.get("/posts/:postId", function(req, res) {

  //Store the parameters entered by the user in a constant
  const requestedPostId = req.params.postId;


  //***** Boss Level Challenge - Blog Website Upgrade *****//
  //***** Save Composed Posts with MongoDB *****//
  //Create a new post document using the mongoose model
  Post.findOne({
    _id: requestedPostId
  }, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });





  // //Loop through the posts array and check if the title in the array matches the parameters entered by the user on the URL
  // posts.forEach(function(post) {
  //
  //   //for each post it will save the title in storedTitle
  //   const storedTitle = _.lowerCase(post.title);
  //
  //   //Check for each post wheather the storedTitle matches the requestedTitle
  //   if (storedTitle === requestedTitle) {
  //
  //     //Render the post.ejs page and pass over the title and content regarding a post
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //
  //     //console.log("Match found!");
  //   } //else {
  //   //console.log("Nope!");
  //   //}
  // });
  //console.log(req.params.postName);
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

//Set up the server to listen to port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});