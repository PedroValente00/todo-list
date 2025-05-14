const express = require("express");
const path = require("path")
const app = express();
// const { v4: uuid } = require('uuid');
const { User, ToDo } = require("./database")
// const Joi = require('joi');
const session = require('express-session')
const MongoStore = require('connect-mongo');
// const bcrypt = require('bcrypt');
const {catchAllErrors} = require("./utils")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'todo app',
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    resave: false, saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, '/dist')));

app.use("/api/toDos", require("./routes/toDos"))
app.use("/api/authentication", require("./routes/authentication"))
app.use(catchAllErrors)

app.get("*", (req, res) => {
    res.redirect("/")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;