import Landing from "./components/Landing"
import List from "./components/List"
import Register from "./components/Authentication/Register"
import Login from "./components/Authentication/Login"
import Error404 from "./components/Error404"
import { BrowserRouter, Routes, Route } from "react-router"
import "./components/Components.css"
import "./components/SubmitForm/SubmitNew.css"
import "./components/Authentication/Authentication.css"
import "./components/Navbar/Navbar.css"
import { useState, useEffect } from "react"
import axios from "axios"
import NavBar from "./components/NavBar/Navbar"
function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    async function getUser() {
      console.log("useeffect from App:")
      const user = await axios.get('/api/user');
      console.log(user.data)
      setUser(user.data)
    } getUser()
  },[])
  return (<>
    <BrowserRouter>

    <NavBar user={user} setUser={setUser} />

      <Routes>

        <Route index element={<Landing user={user} />} />

        <Route path="/todos" element={<List user={user} setUser={setUser} />} />

        <Route path="/register" element={<Register user={user} setUser={setUser} />} />

        <Route path="/login" element={<Login user={user} setUser={setUser} />} />

        <Route path="/*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>

    </>)
}

export default App