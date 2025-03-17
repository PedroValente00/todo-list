import EditIcon from '@mui/icons-material/Edit';

export default function Pencil({edit}){

    const handleClick = () => {
        edit( edited => !edited)
    }

    return <EditIcon className="icon pencil" onClick={handleClick} />
}

