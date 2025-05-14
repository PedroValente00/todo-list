const express = require("express")
const app = express();
const bcrypt = require("bcrypt")
const { User, ToDo } = require("../../database")
const Joi = require('joi');
const {catchAsync} = require("../../utils")

// api/authentication

app.post("/register", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

// app.get("/user", async (req, res) => {
app.get("/user", catchAsync(async (req, res) => {
    const user = await User.findById(req.session.user_id)
    .populate("toDos")
    if (user) return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        toDos: user.toDos
    })
    // throw new Error("User not found")
    res.end()
// })
}))

app.post('/logout', function (req, res) {
    req.session.destroy()
    res.end()
})

module.exports = app
