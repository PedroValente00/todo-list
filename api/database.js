require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
     .then(() => console.log("Connected to database"))
     .catch(e => console.log("something went wrong:", e))

const UserSchema = new mongoose.Schema({
     name: { required: true, type: String },
     email: { required: true, type: String },
     password: { required: true, type: String },
     toDos: [{ type: mongoose.Schema.Types.ObjectId, ref: "ToDo" }]

})

const ToDoSchema = new mongoose.Schema({
     id: { required: true, type: String },
     toDo: { required: true, type: String },
     done: { required: true, type: Boolean },
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const User = mongoose.model("User", UserSchema);
const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = { User, ToDo }