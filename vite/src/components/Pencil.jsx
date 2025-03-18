import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Pencil({ edit }) {
    
    const [hovering, setHovering] = useState(false)

    const handleClick = () => {
        edit(edited => !edited)
    }

    // return <EditIcon className="icon pencil" onClick={handleClick} />
    return <div onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ display: "contents" }} >

        {!hovering ?
            <EditOutlinedIcon className="icon pencil" onClick={handleClick} /> :
            <EditIcon className="icon pencil" onClick={handleClick} />}
    </div>
}

