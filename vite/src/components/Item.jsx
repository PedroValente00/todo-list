import { useState } from "react"
import Pencil from "./Pencil"
import Delete from "./Delete"
import EditSection from "./Edit/EditSection"

export default function Item({ item, setToDos }) {

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
        })
    }

    return <section className="item">
        {beingEdited ?
            <EditSection item={item} setToDos={setToDos}
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
                    <Delete item={item} setToDos={setToDos} />
                </div>
                </>
        }
    </section>
}