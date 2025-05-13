import { useState } from "react"
import axios from "axios"
import { v4 as uuid } from 'uuid';

export default function SubmitNew({setToDos, user}) {

    const [newToDo, setNewToDo] = useState("")
    const handleChange = (e) => {
        setNewToDo(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(!newToDo.length) return;
        const capFirst = newToDo.charAt(0).toUpperCase();
        const capRest = newToDo.slice(1);
        const capitalizedNewToDo = `${capFirst}${capRest}`
        const submission = {id:uuid(), toDo:capitalizedNewToDo, done:false }

        if (user) axios.post('/api/toDos', submission);
        setToDos(toDos => [...toDos, submission])
        setNewToDo("")
    }

    return <form action="/api/toDos" method="post" id="newTodoForm"
        onChange={handleChange} onSubmit={handleSubmit}>

        <input type="text" name="newToDo" id="newTodo"
            value={newToDo} onChange={handleChange}
            maxLength={80} placeholder="Take out the trash." />
        
        <button className="submitBtn" type="submit">Submit</button>
    </form>
}

