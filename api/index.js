const express = require("express");
const path = require("path")
const app = express();
const { v4: uuid } = require('uuid');
const {User, ToDo} = require("./database")
const bcrypt = require('bcrypt');
const Joi = require('joi');

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

app.post("/api/register", (req,res) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(20).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: false })
        .min(5).max(80).required(),
        password: Joi.string().alphanum().min(8).max(80).required(),
    })
    const {name,email,password} = req.body;
    const registration = schema.validate({name,email,password})
    const err = registration.error
    const response = {
        error: err ? true : false,
        msg : err ? err.details[0].message : "success msg"
    }
    console.log(response)
    // if(err) return res.send(err.details[0].message)
    // res.send(registration)
    res.send(response)
    //register in database,login,etc (bcrypt stuff)
    
    
})

app.get("*", (req, res) => {
    res.redirect("/")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;