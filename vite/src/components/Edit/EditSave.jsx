import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function EditSave({ item, setToDos, setBeingEdited, toDo, user }) {

    const style = {
        color: "#248624",
        ...(!toDo.length) && { filter: " sepia(1)" }
    }

    const handleClick = () => {
        if (!toDo.length) return;

        setToDos(toDos => {
            return toDos.map(t => {
                if (t.id === item.id) {
                    const update = { ...t, toDo: toDo }
                    return update
                }
                return t
            })
        });
        setBeingEdited(toggle => !toggle);

        if (user) {
            const payload = JSON.stringify({
                newToDo: toDo,
                id: item._id
            });
            try{

                return fetch("/api/toDos", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: payload
                })
            }catch(e){
                console.log("PATCH request error:", e)
            }
        }
    }

    return <CheckCircleIcon className="icon" onClick={handleClick} style={style} />
}

