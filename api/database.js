require("dotenv").config()
const mongoose = require("mongoose")

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const rest = "/?retryWrites=true&w=majority&appName=todo-list-cluster"
const url = `mongodb+srv://${username}:${password}@todo-list-cluster.mysi0.mongodb.net${rest}`
const newUri = "mongodb+srv://vercel-admin-user-67d985d9e2fe6a613e888746:VRyrv7T7MQFC6Wy3@todo-list-cluster.mysi0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGODB_URI || newUri || process.env.MONGODB_URI || url)
.then(() => console.log("Connected to database"))
.catch(e => console.log("something went wrong:", e))

const toDoSchema = new mongoose.Schema({
     id: {required:true,type: String},
     toDo: {required:true,type: String},
     done:{required:true,type: Boolean}
})

module.exports = mongoose.model("toDo", toDoSchema);