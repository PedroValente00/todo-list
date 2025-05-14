/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Item from "./Item"
import SubmitNew from "./SubmitForm/SubmitNew"

export default function List({ user }) {
  const [toDos, setToDos] = useState([])
  const locallyStoredData = localStorage.getItem("toDos");
  const [loader, setLoader] = useState(true)
  
  useEffect(() => {
    if (user) {
      setToDos(user.toDos)
      return setLoader(false)
    }else {
        if (locallyStoredData) {
          const data = JSON.parse(locallyStoredData)
          setToDos(data)
        }
        return setLoader(false)
      }
  }, [user])

  useEffect(() => {
    if(!user) {
      if (toDos.length) localStorage.setItem("toDos", JSON.stringify(toDos))
      }
  }, [toDos])

  return <div className="list">

    <fieldset><legend>Things to do</legend>
      {loader && <CircularProgress disableShrink />}
      {toDos.length && 
      toDos.map(item => <Item key={item.id} item={item}
           setToDos={setToDos} user={user} />) || ""}
      <SubmitNew toDos={toDos} setToDos={setToDos} user={user} />
    </fieldset>

  </div>
}