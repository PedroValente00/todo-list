import DeleteIcon from '@mui/icons-material/Delete';

export default function Edit({item,setToDos}){

    const handleClick = () => {
        setToDos(items => {
            const update = items.filter(i => i.id !== item.id )
            return [...update]
        })
    }
    return <DeleteIcon className="icon trash" onClick={handleClick} />
}