// import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
export default function EditCancel({cancelEdit}){

    const handleClick = () => {
        cancelEdit(edit => !edit)
    }
    
    // return <CloseIcon className="icon" onClick={handleClick} />
    return <CancelIcon className="icon" onClick={handleClick} />
}