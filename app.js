const express = require("express");
const dotenv = require("dotenv");
var nodeCron = require("node-cron");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const ipoRoutes = require("./routes/ipoRoutes")
var nodeCron = require("node-cron");
const extractDetailsFromIpoTable = require("./utils/extractDetailsFromIpoTable");



dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors({ credentials: true }));

app.use(express.static(`${__dirname}`));
app.use(express.json());

// const DB = process.env.DATABASE.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then((con) => {
//   console.log("DB connection successful");
// });

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  return res.json({ status: "Up and running"});
});


app.use("/api/v1", ipoRoutes);
extractDetailsFromIpoTable();
app.listen(PORT, () => console.log("Server started listening!"));