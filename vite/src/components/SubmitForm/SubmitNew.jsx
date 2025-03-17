import { useState,useEffect } from "react"
import axios from "axios"
import { v4 as uuid } from 'uuid';

export default function SubmitNew({toDos, setToDos}) {

    const [newToDo, setNewToDo] = useState("")
    const handleChange = (e) => {
        setNewToDo(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!newToDo.length) return;
        const capFirst = newToDo.charAt(0).toUpperCase();
        const capRest = newToDo.slice(1);
        const capitalizedNewToDo = `${capFirst}${capRest}`
        const submission = {id:uuid(), toDo:capitalizedNewToDo, done:false }
        //do database later with authentication
        axios.post('/api/toDos', submission);
        setToDos(toDos => [...toDos, submission])
        setNewToDo("")
    }

    return <form action="/api/toDos" method="post" id="newTodoForm"
        onChange={handleChange} onSubmit={handleSubmit}>

        <input type="text" name="newToDo" id="newTodo"
            value={newToDo} onChange={handleChange}
            maxLength={80} />
        
        <button className="submitBtn" type="submit">Submit</button>
        {/* <SubmitButton /> */}

    </form>
}

