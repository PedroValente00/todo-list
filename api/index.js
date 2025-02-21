const express = require("express");
const path = require("path")
const app = express();

app.use(express.static(path.join(__dirname, '/dist')));  


app.get("/", (req, res) => res.send(`Hello from Express on port ${PORT} `));
app.get("/*", (req,res) => {res.send("Page not found...")})
app.get("/b", (req,res) => {res.send("Sending from server")})
app.get("/here", (req,res) => {res.send("You are here")})
app.get("there", (req,res) => {res.send("You are there")})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;