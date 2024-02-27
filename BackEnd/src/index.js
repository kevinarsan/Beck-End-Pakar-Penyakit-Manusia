const express = require("express"),
  { PORT } = require("./config"),
  bodyParser = require("body-parser"),
  router = require("./router"),
  { errorHandling, succesHandling } = require("./middlewares/error.handling"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandling);
app.use(succesHandling);

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is up and listening at port : ${PORT}`);
});
