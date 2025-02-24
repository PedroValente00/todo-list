const express = require("express");
const path = require("path")
const app = express();

const data = [
    {id:1,product:"computer",price:1900},
    {id:2,product:"TV",price:500}
]

app.use(express.static(path.join(__dirname, '/dist')));  
app.get("/api/data", (req,res) => {
    res.send(data)
})

app.get("/*", (req,res) => {res.send("Page not found D:")})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;