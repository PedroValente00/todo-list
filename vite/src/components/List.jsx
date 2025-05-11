import { useState, useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Item from "./Item"
import SubmitNew from "./SubmitForm/SubmitNew"
import axios from "axios"
// import { useNavigate } from "react-router";

export default function List({ user }) {
  const [toDos, setToDos] = useState([])
  const locallyStoredData = localStorage.getItem("toDos");
  const [loader, setLoader] = useState(true)
  // let navigate = useNavigate();
  
  useEffect(() => {
    const waitForUser = () => {
    if (user) {
      setToDos(user.toDos)
      if (user.toDos.length) console.log("user has toDos from [user]")
      // if (!user.toDos.length) console.log("user does not have toDos")
      return setLoader(false)
    }
    else {
      //wait half a second to find user user, before using localstorage
        if (locallyStoredData) {
          const data = JSON.parse(locallyStoredData)
          setToDos(data)
          return setLoader(false)
        } else {
          console.log("Your local storage is empty from [user].")
          return setLoader(false)
        }
      }
    }
    setTimeout(waitForUser, 500)
  }, [user])

  useEffect(() => {
    if (user) {
      if (!toDos.length) {
        console.log("user but no todos [toDos]")
      } else {
        console.log("this is where I'll save to user account")
        // axios.post('/api/toDos', {toDos} );
      }
    } else {
      //wait half a second to find user user, before using localstorage
      console.log("user (not yet?) found. Will wait 500ms to get localStorage")
      const waitForUser = () => {
        if (toDos.length) {
          // const data = JSON.parse(localStorage.getItem("toDos"))
          localStorage.setItem("toDos", JSON.stringify(toDos))
          console.log("saved to local storage")
        } else {
          console.log("guest with no !toDos.length from [toDos]")
        }
      }
      setTimeout(waitForUser, 500)
    }
    //   fetch("/api/toDos")
    //     .then(data => data.json())
    //     .then(results => setToDos(results))


  }, [toDos])

  return <div className="list">
    {/* {!user ? "Guest" : "user logged in"}
    {JSON.stringify(user)} */}

    <button onClick={async () => {
      const req = await axios.get('/api/user')
      console.log(req.data)
    }}>get THIS user</button>

    {/* <button onClick={async () => {
      const req = await axios.get('/api/toDos')
      console.log(req.data)
    }}>get all todos</button> */}
{/* 
    <button onClick={async () => {
      const req = await axios.get('/api/toDosByUser')
      console.log(req.data)
    }}>get todos by this user</button> */}

    <fieldset><legend>Things to do</legend>
      {loader && <CircularProgress disableShrink />}
      {toDos.length ?
        toDos.map(item => <Item key={item.id} item={item} setToDos={setToDos} />)
        : <div style={{ fontFamily: "italic" }}>
          {/* You have no tasks yet. Maybe you'd like to submit a new one? */}
        </div>
      }
      <SubmitNew toDos={toDos} setToDos={setToDos} user={user} />
    </fieldset>

  </div>
}