var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// APP Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/",function(req,res){
   res.redirect("/blogs"); 
});

// INDEX Route
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error!");
        }
        else{
            res.render("index", {blogs:blogs});
        }
    }) 
});

// NEW Route
app.get("/blogs/new", function(req,res){
    res.render("new");
});

// CREATE Route
app.post("/blogs", function(req,res){
    Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       }
       else{
           res.redirect("/blogs");
       }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Server running.");
})