require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI) 
.then(() => console.log("Connected to database"))
.catch(e => console.log("something went wrong:", e))

const toDoSchema = new mongoose.Schema({
     id: {required:true,type: String},
     toDo: {required:true,type: String},
     done:{required:true,type: Boolean}
})

module.exports = mongoose.model("toDo", toDoSchema);