import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Item from "./Item"
import SubmitNew from "./SubmitForm/SubmitNew"
import "./Components.css"
import "./SubmitForm/SubmitNew.css"

export default function List() {
  const [toDos, setToDos] = useState([])
  const locallyStoredData = localStorage.getItem("toDos");
  //if user is authenticated
  // useEffect(() => {
  //   fetch("/api/toDos")
  //     .then(data => data.json())
  //     .then(results => setToDos(results))
  // }, [])

  //if guest, use localstorage
  useEffect(() => {
    //if localstorage is supported:
  if(locallyStoredData){
    const data = JSON.parse(locallyStoredData)
    setToDos(data)
    console.log("first side effect")
  }else{
    //if supported but nothing is stored, do something else
  }
  //if not supported, do something else
  }, [])
  useEffect(()=>{
    if(locallyStoredData){
      const data = JSON.parse(localStorage.getItem("toDos"))
      if(data.length && toDos.length) localStorage.setItem("toDos", JSON.stringify(toDos))
        console.log("second side effect")
    }
  },[toDos])

  return <div className="list">
    <fieldset><legend>To Do</legend>
      {toDos.length === 0 && <CircularProgress disableShrink />}
      {/* maybe add a timeout for the spinner to go away */}
      {toDos.map(item => <Item key={item.id} item={item} setToDos={setToDos} />)}
      <SubmitNew toDos={toDos} setToDos={setToDos} />
    </fieldset>
  </div>
}