//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
});

const blogSchema = new mongoose.Schema({
    title: String,
    blogCont: String
  });

const Blog = mongoose.model("Blog", blogSchema);

const itemDef = new Blog({
    title : "Welcome",
    blogCont : "Create Your Blogs here"
});
let posts = [itemDef];

app.get("/", function(req,res){

    
    Blog.find({}, function(err,blogs){
        
        if(blogs.length == 0){
            Blog.insertMany(posts, function(err){
                if (err) {
                  console.log("Error");
                } else {
                  console.log("Done");
                }
            });
        }
        else{

            res.render("home", {
                homeCon: homeStartingContent,
                postarr : blogs
            });

        }

    });

    // res.render("home", {
    //     homeCon: homeStartingContent,
    //     postarr : posts
    // });

});

app.get("/:page",function(req,res){
    
    if(req.params.page === "about"){
        res.render("about",{

            aboutCon : aboutContent
        });
    }
    else if(req.params.page === "contact"){
        res.render("contact",{

            contactCon : contactContent
        });
    }
    else if(req.params.page === "compose"){
        res.render("compose");
    }   
    

});


app.post("/compose",function(req,res){


    const item = new Blog({
        title : req.body.title,
        blogCont : req.body.blogCont
    });
      
    item.save();
    // const post =  {
    //                 title : req.body.title,
    //                 blogCont : req.body.blogCont
    //             };

    // posts.push(post);

    res.redirect("/");

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
