const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded ({
    extended:true
}));

app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/API_DATABASE", {useNewUrlParser: true});
const articleSchema= new mongoose.Schema({
title:String,
content:String
})
const Article = new mongoose.model("Article", articleSchema);

const article1= new Article({
   title:"APIs",
   content:"Anup is learning to use api" 
});
app.get("/articles/dom", async function(req, res){
    Article.find({title:"DOM"}).then(function(data){
        res.send(data);
    })

})
// app.post("/articles",  function(req, res){
// console.log(req.body.title);
// console.log(req.body.content);
// const article1= new Article({
//     title:"APIs",
//     content:"jack baurer is learning to use api" 
//  });
//  article1.save();
// })

app.listen(3000, function() {
    console.log("listening on port 3000")
})

