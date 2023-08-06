//jshint esversion:6
//import mongoose from 'mongoose';
//import {ObjectId} from "mongodb";

const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const _ = require("lodash");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://anup:uOF9RmRvauFPqoPc@todocluster0.rk6etys.mongodb.net/todolist', {useNewUrlParser: true} );
const itemsSchema = {
  name: String
};
const todoSchema = new mongoose.Schema({
  name:String
})
const Item = new mongoose.model("Item", todoSchema)
const item1 = new Item({
  name:"welcome to todo list"
})

const item2 = new Item({
  name:"let's start journaling"
})

const item3 = new Item({
  name:"<-- click here to delete"
})
const defaultData = [item1,item2,item3];
// Item.insertMany(defaultData);
const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = new mongoose.model("List", listSchema);

app.get("/", function(req, res) {
 Item.find({}).then(function(finddata){
  //console.log(finddata);
  if(finddata.length == 0){
  Item.insertMany(defaultData);
  res.redirect("/")
  }else{
  res.render("list", {listTitle: "Today", newListItems: finddata});
  }
})
});
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name:customListName}).then(function(data){
    if(!data){
      const list = new List({
        name:customListName,
        items:defaultData
      })
      list.save();
      res.redirect("/"+customListName)
    }else{
      res.render("list", {listTitle: data.name, newListItems: data.items})
    }
  })
  //res.redirect("/" + customListName);

})

app.post("/", function(req, res){

  const additem = req.body.newItem;
  const listName = req.body.list

  const nitem = new Item({
    name:additem
  });
  if(listName=="Today"){
    const adding= new Item({
      name: additem
    })
    adding.save();
  res.redirect("/");
  }else{
    List.findOne({name:listName}).then(function(data){
      data.items.push(nitem);
      data.save();
      res.redirect("/"+listName)
    });
  }
  
  
});

app.post("/delete", async function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    const deletedItem = await Item.remove({ _id: mongoose.Types.ObjectId(checkedItemId) });
    if (deletedItem) {
      console.log("Successfully deleted checked item.");
    } else {
      console.log("Item not found.");
    }
    res.redirect("/");
  } else {
    await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: mongoose.Types.ObjectId(checkedItemId) } } });
    res.redirect("/"+listName)
  }
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
