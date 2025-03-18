import { useState } from "react"
import EditSave from "./EditSave"
import EditCancel from "./EditCancel"

export default function EditSection({ item, setBeingEdited, setToDos }) {

    const [toDo, setToDo] = useState(item.toDo)

    const handleChange = (e) => {
        setToDo(e.target.value)
    }

    return <div className="edit">
        <input type="text" name={item.id} id={item.id}
            value={toDo} onChange={handleChange} className="edit-text" />

        <EditCancel cancelEdit={setBeingEdited} />
        <EditSave item={item} setToDos={setToDos}
        cancelEdit={setBeingEdited}
            setBeingEdited={setBeingEdited} toDo={toDo} />
    </div>
}

