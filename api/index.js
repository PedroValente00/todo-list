const express = require("express");
const path = require("path")
const app = express();
const { v4: uuid } = require('uuid');
const { User, ToDo } = require("./database")
const Joi = require('joi');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'todo app',
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    resave: false, saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, '/dist')));
app.use((req, res, next) => {
    console.log("from middleware:")
    console.log(req.session)
    next()
})

app.get("/api/toDos", async (req, res) => {
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
    const toDo = new ToDo({ id: uuid(), toDo: "whatevs", done: false })
    await toDo.save()
    res.send("Request received")
})

app.post("/api/register", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(20).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: false })
            .min(5).max(80).required(),
        password: Joi.string().alphanum().min(8).max(80).required(),
    })
    const { name, email, password } = req.body;
    const submission = schema.validate({ name, email, password })
    const err = submission.error
    const response = {
        error: err ? true : false,
        msg: err ? err.details[0].message : "registered successfully",
    }

    const alreadyExists = await User.findOne({ email })
    if (alreadyExists) {
        response.error = true;
        response.msg = "Email already in use"
    }

    if (err || alreadyExists) {
        console.log("error")
        return res.send(response)
    } else {
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 12)
        })
        const user = await newUser.save();
        req.session.user_id = user._id;
        response.user = user 
        res.send(response)
    }
})
app.post("/api/login", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: false })
            .min(5).max(80).required(),
        password: Joi.string().alphanum().min(8).max(80).required(),
    })
    const { email, password } = req.body;
    const submission = schema.validate({ email, password })
    const err = submission.error
    const response = {
        error: err ? true : false,
        msg: err ? err.details[0].message : "logged in successfully",
    }
    if(err) return res.send(response)
    const user = await User.findOne({ email })
    if (!user) {
        response.error = true;
        response.msg = "Incorrect username or password."
        return res.send(response)
    }
        const passwordMatch = await bcrypt.compare(password, user.password );
        if (!passwordMatch) {
            response.error = true;
            response.msg = "Incorrect username or password."
            return res.send(response)
        }
        req.session.user_id = user._id;
        response.user = user 
        res.send(response)
    
})

app.get("/api/user", async (req, res) => {
    console.log("from /api/user")
    console.log(req.session)
    const user = await User.findById(req.session.user_id)
    if (user) console.log(user)
    res.send(user)
})

app.post('/api/logout', function (req, res) {
    console.log("logging out")
    req.session.destroy()
    res.end()
})


app.get("*", (req, res) => {
    res.redirect("/")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;