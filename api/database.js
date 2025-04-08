require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
     .then(() => console.log("Connected to database"))
     .catch(e => console.log("something went wrong:", e))

const UserSchema = new mongoose.Schema({
     email: { required: true, type: String },
     password: { required: true, type: String }
})

const ToDoSchema = new mongoose.Schema({
     id: { required: true, type: String },
     toDo: { required: true, type: String },
     done: { required: true, type: Boolean }
})

const User = mongoose.model("User", UserSchema);
const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = { User, ToDo }