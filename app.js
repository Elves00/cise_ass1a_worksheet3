// app.js
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

// routes
const books = require("./routes/api/books");

const app = express();

//For connencting app to heroku
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("Hello world!"));

//Ensure index html file is served in case of user requesting a resource currently not in public folder
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// use Routes
app.use("/api/books", books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
