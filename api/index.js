const express = require("express");
const router = express.Router()
const path = require("path")
const app = express();
const { v4: uuid } = require('uuid');
const { User, ToDo } = require("./database")
const Joi = require('joi');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
// const routes = require("./routes")

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

//------------------------------------------------------
// app.use("/api/toDos", routes)
//organize all routes inside the routes folder
//put a state on landing page so I can see if user or localstorage chosen

app.route("/api/toDos")
.get(async (req, res) => {
    //might delete
    //only being used by buttons in List component
    const data = await ToDo.find({})
    .populate("user")
    console.log(data)
    res.send(data)
})
.post( async (req, res) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        toDo: Joi.string().required(),
        done: Joi.bool().required(),
    })
    const validation = schema.validate(req.body)
    if (validation.error) return res.end()

    const toDo = new ToDo(validation.value)
    toDo.user = req.session.user_id;

    const user = await User.findById(toDo.user);
    user.toDos.push(toDo)
    await user.save()
    // console.log(toDo)
    await toDo.save();
})
.delete(async (req,res) => {
    const item = req.body._id;
    await ToDo.findByIdAndDelete(item)
    res.end()
})
.patch(async (req,res) => {
    if(req.body.newToDo){
        console.log("first")
        const {id,newToDo} = req.body;
        return await ToDo.findByIdAndUpdate(id,{toDo:newToDo},{runValidators:true})
    }else{
        console.log("second")
        const {id,done} = req.body;
        return await ToDo.findByIdAndUpdate(id,{done},{runValidators:true})
    }
})

// app.get("/api/toDos", async (req, res) => {
//     //might delete
//     //only being used by buttons in List component
//     const data = await ToDo.find({})
//     .populate("user")
//     console.log(data)
//     res.send(data)
// })
// app.post("/api/toDos", async (req, res) => {
//     try {
//     const schema = Joi.object({
//         id: Joi.string().required(),
//         toDo: Joi.string().required(),
//         done: Joi.bool().required(),
//     })
//     const validation = schema.validate(req.body)
//     if (validation.error) return res.end()

//     const toDo = new ToDo(validation.value)
//     toDo.user = req.session.user_id;

//     const user = await User.findById(toDo.user);
//     user.toDos.push(toDo)
//     await user.save()
//     // console.log("saving this toDo:")
//     // console.log(toDo)
//     await toDo.save();
// } catch (error) {
//         console.log(error)
// }
// })
app.get("/api/toDosByUser", async (req, res) => {
    const userTodos = await ToDo.find({user:req.session.user_id})
    console.log(userTodos)
    res.send(userTodos)
})
//------------------------------------------------------
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
    if (err) return res.send(response)
    const user = await User.findOne({ email })
    if (!user) {
        response.error = true;
        response.msg = "Incorrect username or password."
        return res.send(response)
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        response.error = true;
        response.msg = "Incorrect username or password."
        return res.send(response)
    }
    req.session.user_id = user._id;
    const userInfo = await user.populate("toDos")
    response.user = {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        toDos: userInfo.toDos
    }
    res.send(response)

})

app.get("/api/user", async (req, res) => {
    console.log("from /api/user")
    const user = await User.findById(req.session.user_id)
    .populate("toDos")
    // console.log(user)
    // res.send(user)
    if (user) return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        toDos: user.toDos
    })
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