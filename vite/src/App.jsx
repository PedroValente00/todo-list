import Landing from "./components/Landing"
import List from "./components/List"
import Register from "./components/Authentication/Register"
import {storageAvailable} from "./utils"
import {BrowserRouter, Routes, Route} from "react-router"

import "./components/Components.css"
import "./components/SubmitForm/SubmitNew.css"
import "./components/Authentication/Register.css"

function App() {
// if storageAvailable("localStorage"), then gray out/hide option
  return (
    
    <BrowserRouter>
    <Routes>
      
    <Route index element={<Landing />} /> 
    <Route path="/todos" element={<List />} /> 
    <Route path="/register" element={<Register />} /> 

      </Routes>
      </BrowserRouter>

  )
}

export default App