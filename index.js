const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const projectRoute = require("./api/routes/project");
const userRoute = require("./api/routes/user");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connect to MongoDB successfully!!! ");
  })
  .catch((error) => {
    console.log("Connect to MongoDB failure!!! ", error);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/project", projectRoute);
app.use("/api/user", userRoute);

app.listen(8000, () => {
  console.log("Server OKVIP");
});
