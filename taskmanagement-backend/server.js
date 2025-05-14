const express = require("express");
var cors = require("cors");
const db = require("./db");
const taskRouters = require("./routes/task-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(taskRouters);

app.listen(3000, () => {
  console.log("app is running");
});
