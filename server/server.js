require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;
const { seed } = require("./seed.js");
const {  postInfo, getInfo } = require("./travelController.js");

app.use(express.json());
app.use(cors());

app.post("/seed", seed);

app.post("/api/location", postInfo)

app.get("/api/location", getInfo)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
