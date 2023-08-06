import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.post("/submit", (req, res) => {
 const a = req.body["fname"].length+req.body["lname"].length;
 res.render("index.ejs", {b:a}); 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
