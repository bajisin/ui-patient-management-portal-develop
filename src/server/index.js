// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const path = require("path");

const app = express();
const { HOST } = require("@config/api-config");

app.use(express.static("dist"));

app.get("/login-test", (req, res) => res.send("login"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "dist/" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(500).send(`${err.stack} : ${__dirname} : ${path.dirname(__filename)}`);
});

app.listen(HOST === "localhost" ? 8888 : 8080);
