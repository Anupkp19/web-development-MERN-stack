import mongoose from 'mongoose';
//const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/people', {useNewUrlParser: true} );

const peopleSchema  = new mongoose.Schema({
    name:String,
    age:Number,
    review:String
})

const aboutpeople = mongoose.model("people", peopleSchema);

const people1 = new aboutpeople({
    name:"skyler",
    age:31,
    review:"very good"
})

const people2 = new aboutpeople({
    name: "John Smith",
    age: 29,
review: "Outstanding Customer Service!"
})

const people3 = new aboutpeople({
    name: "Smith",
    age: 40,
review: "Outstanding actor!"
})




//aboutpeople.insertMany([people1,people2,people3])
    // if(err){
    //     console.log(error);
    // }else{
    //     console.log("successfully inserted");
    // }


 await aboutpeople.deleteMany({name:"skyler"})
 const data =await aboutpeople.find()
data.forEach(function(aboutpeople){
console.log(aboutpeople.name);
});

mongoose.connection.close();