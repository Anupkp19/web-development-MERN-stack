import express from "express";
import morgan from "morgan";
import logger from "logger"

const app = express();
const port = 3000;
function logger1(req, res, next) {
  console.log(req.method);
next();
}
app.use(logger1);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
