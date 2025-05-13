import { useState } from "react"
import Pencil from "./Pencil"
import Delete from "./Delete"
import EditSection from "./Edit/EditSection"

export default function Item({ item, setToDos, user }) {

    const [checked, setChecked] = useState(item.done)
    const [beingEdited, setBeingEdited] = useState(false)

    const handleChange = (e) => {
        setChecked(e.target.checked)
        setToDos(toDos => {
            return toDos.map(todo => {
                if(todo.id === item.id){
                    return {...todo, done:e.target.checked }
                }
                return todo
            })
        });
        if (user) {
            const payload = JSON.stringify({
                done: !checked,
                id: item._id
            });
            fetch("/api/toDos", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: payload
            })
        }
    }

    return <section className="item">
        {beingEdited ?
            <EditSection item={item} setToDos={setToDos} user={user}
                beingEdited={beingEdited} setBeingEdited={setBeingEdited} />
            :
            <>
                <div className="item-info">
                    <input type="checkbox" name={item.toDo} id={item.id}
                        checked={checked} onChange={handleChange} />
                    <label htmlFor={item.id}>{item.toDo}</label>
                </div>

                <div className="item-buttons">
                    <Pencil edit={setBeingEdited} />
                    <Delete item={item} setToDos={setToDos} user={user} />
                </div>
                </>
        }
    </section>
}