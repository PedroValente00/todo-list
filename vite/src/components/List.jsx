import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Item from "./Item"
import SubmitNew from "./SubmitForm/SubmitNew"
import "./Components.css"
import "./SubmitForm/SubmitNew.css"

export default function List() {
  const [toDos, setToDos] = useState([])
  const locallyStoredData = localStorage.getItem("toDos");
  const [loader, setLoader] = useState(true)
  
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
    setLoader(false)
  }else{
    //if supported but nothing is stored, do something else
    //stop loading after a few seconds maybe
    setLoader(false)
  }
  //if not supported, do something else
  }, [])

  // useEffect(()=>{
  //   if(locallyStoredData){
  //     const data = JSON.parse(localStorage.getItem("toDos"))
  //     if(data.length && toDos.length) localStorage.setItem("toDos", JSON.stringify(toDos))
  //       console.log("second side effect")
  //   }
  // },[toDos])
  useEffect(()=>{
    if(toDos.length){
      // const data = JSON.parse(localStorage.getItem("toDos"))
      localStorage.setItem("toDos", JSON.stringify(toDos))
    }
  },[toDos])



  

  return <div className="list">
    <fieldset><legend>Things to do</legend>
      {/* {toDos.length === 0 && <CircularProgress disableShrink />} */}
      {loader && <CircularProgress disableShrink />}
      {/* maybe add a timeout for the spinner to go away */}
      {toDos.map(item => <Item key={item.id} item={item} setToDos={setToDos} />)}
      <SubmitNew toDos={toDos} setToDos={setToDos} />
    </fieldset>
  </div>
}