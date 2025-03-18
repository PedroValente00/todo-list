require("dotenv").config()
const mongoose = require("mongoose")

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const rest = "/?retryWrites=true&w=majority&appName=todo-list-cluster"
const url = `mongodb+srv://${username}:${password}@todo-list-cluster.mysi0.mongodb.net${rest}`

mongoose.connect(process.env.MONGODB_URI || url)
.then(() => console.log("Connected to database"))
.catch(e => console.log("something went wrong:", e))

const toDoSchema = new mongoose.Schema({
     id: {required:true,type: String},
     toDo: {required:true,type: String},
     done:{required:true,type: Boolean}
})

module.exports = mongoose.model("toDo", toDoSchema);