const express = require("express");
const path = require("path")
const app = express();
const { v4: uuid } = require('uuid');
const {User, ToDo} = require("./database")
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/dist')));

app.get("/api/toDos",async (req, res) => {
    const data = await ToDo.find({})
    console.log(data)
    res.send(data)
})
app.post("/api/toDos", async (req, res) => {
    const toDo = new ToDo(req.body)
    await toDo.save();
    res.send("to do submission received")
})

app.get("/api/save", async (req, res) => {
    const toDo = new ToDo({id:uuid(),toDo:"whatevs",done:false})
    await toDo.save()
    res.send("Request received")
})

app.get("/*", (req, res) => res.redirect("/"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;