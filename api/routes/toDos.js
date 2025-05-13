const express = require("express")
const router = express.Router()
const { User, ToDo } = require("../database")
const Joi = require('joi');

// api/toDos
router.route("/")
.post(async (req, res) => {
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
    await toDo.save();
    res.end()
})
.delete(async (req,res) => {
    const item = req.body._id;
    await ToDo.findByIdAndDelete(item)
    res.end()
})
.patch(async (req,res) => {
    if(req.body.newToDo){
        const {id,newToDo} = req.body;
        return await ToDo.findByIdAndUpdate(id,{toDo:newToDo},{runValidators:true})
    }else{
        const {id,done} = req.body;
        return await ToDo.findByIdAndUpdate(id,{done},{runValidators:true})
    }
        res.end()
})

module.exports = router