// import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function EditSave({item, setToDos,setBeingEdited,toDo }){

    const style={
        color: "#248624"
    }

    const handleClick = () => {
        setToDos(toDos => {
            return toDos.map(t => {
                if(t.id === item.id) {
                    const update = {...t, toDo:toDo}
                    return update
                }
                return t
            })
        });
        setBeingEdited(toggle => !toggle)
    }
    
    // return <CheckIcon className="icon" onClick={handleClick} />
    return <CheckCircleIcon className="icon" onClick={handleClick} style={style} />
}