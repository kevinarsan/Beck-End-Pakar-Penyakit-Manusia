const express = require("express"),
  { PORT } = require("./config"),
  bodyParser = require("body-parser"),
  router = require("./router"),
  { errorHandling, succesHandling } = require("./middlewares/error.handling");

const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandling);
app.use(succesHandling);

app.get("/", (req, res) => {
  res.send("OK");
});

// Example routes for testing
app.post("/test", (req, res) => {
  res.send("POST request received");
});

app.put("/test/:id", (req, res) => {
  res.send("PUT request received");
});

app.delete("/test/:id", (req, res) => {
  res.send("DELETE request received");
});

app.listen(PORT, () => {
  console.log(`Server is up and listening at port : ${PORT}`);
});
