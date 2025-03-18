import DeleteIcon from '@mui/icons-material/Delete';

export default function Edit({item,setToDos}){

    const handleClick = () => {
        setToDos(items => {
            if(items.length === 1) localStorage.clear();
            const update = items.filter(i => i.id !== item.id )
            return [...update]
        })
    }
    return <DeleteIcon className="icon trash" onClick={handleClick} />
}