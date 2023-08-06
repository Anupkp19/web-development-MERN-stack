import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
var band="";

function bandname(req, res, next){
  console.log(req.method);
  band = req.body["street"] + req.body["pet"]
  next();
}
app.use(bandname);

app.post("/submit", (req, res)=>{
  console.log("working");
  res.send(`<p> pet name is <p>   <br>   <h1>${band}😁<<h1>`)
})

app.get("/", (req, res) => {
  console.log("working")
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
