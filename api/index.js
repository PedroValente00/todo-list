const express = require("express");
const path = require("path")
const app = express();
const { v4: uuid } = require('uuid');
// const ToDo = require("./database")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/dist')));

// app.get("/api/toDos",async (req, res) => {
//     const data = await ToDo.find({})
//     res.send(data)
// })
// app.post("/api/toDos", async (req, res) => {
//     const toDo = new ToDo(req.body)
//     await toDo.save();
//     res.send("to do submission received")
// })

app.get("/save", async (req, res) => {
    res.send("Request received")
})

app.get("/*", (req, res) => { res.send("Page not found D:") })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;