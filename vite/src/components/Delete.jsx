import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Edit({ item, setToDos }) {

    const [hovering, setHovering] = useState(false)

    const handleClick = () => {
        setToDos(items => {
            if (items.length === 1) localStorage.clear();
            const update = items.filter(i => i.id !== item.id)
            return [...update]
        })
        
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