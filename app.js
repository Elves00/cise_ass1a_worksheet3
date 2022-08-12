// app.js

const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

// routes
const books = require("./routes/api/books");

const app = express();
const port = process.env.PORT || 8082;

const corsOptions = {
  origin: true,
  credentials: true,
};

// init cors
app.use(cors(corsOptions));

// init body parser
app.use(express.json());

// use Routes
app.use("/api/books", books);

// Connect Database
connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "frontend/build/index.html");
  });
} else {
  app.get("*", (req, res) => res.send(`API running on port ${port}`));
}

app.listen(port, () => console.log(`Server running on port ${port}`));
