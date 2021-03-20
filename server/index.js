const express = require("express");
//initialize app
const app = express();

//require morgan|volleyball, path packages
const volleyball = require("volleyball");
const path = require("path");

//require db from /db
const db = require("./db");

//use morgan|volleyball
app.use(volleyball);

//use express.json()
app.use(express.json());

//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use("/public", express.static(path.join(__dirname, "./public")));

//require in your routes and use them on your api path
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//404 handler

//500 handler
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

//set PORT
const port = process.env.PORT || 3000;

//listen
const init = async () => {
  try {
    app.listen(port, () =>
      console.log(`
            
            Listening on port ${port}
  
            http://localhost:${port}/
            
      `)
    );
  } catch (error) {
    console.log(`There's problem starting up`, error);
  }
};

init();
