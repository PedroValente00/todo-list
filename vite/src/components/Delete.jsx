import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Delete({ item, setToDos, user}) {

    const [hovering, setHovering] = useState(false)

    const handleClick = () => {
        setToDos(items => {
            if (items.length === 1) localStorage.clear();
            const update = items.filter(i => i.id !== item.id)
            return [...update]
        })
        const payload = JSON.stringify(item)
        if(user){
                fetch("/api/toDos", {
                method:"DELETE",
                headers: {"Content-Type": "application/json"},
                body:payload
            })
        } 
    }

    return <div onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{display:"contents"}} >

        {!hovering ?
            <DeleteOutlineIcon className="icon trash" onClick={handleClick} />
            :
            <DeleteIcon className="icon trash" onClick={handleClick} />
        }
    </div>

}