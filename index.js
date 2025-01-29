const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "versions/v1/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Router
const apiRouter = require("./versions/v1/router");

// Use Router
app.use("/api/v1", apiRouter);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
