const express = require("express");
const path = require("path")
const app = express();

app.use(express.static(path.join(__dirname, '/dist')));  


app.get("/", (req, res) => res.send(`Hello from Express on port ${PORT} `));
app.get("/b", (req,res) => {res.sendFile("b.html")})
app.get("/here", (req,res) => {res.send("You are here")})

// app.get("/*", (req,res) => {res.send("Page not found...")})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;