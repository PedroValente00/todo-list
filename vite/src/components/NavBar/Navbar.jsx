import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBarLink from './NavbarLink';

export default function NavBar({user,setUser}) {

  const handleLogout = async () => {
      await fetch("/api/logout", {method:"POST"})
      setUser()
  }

  return (<nav className='navbar' >
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

        <div className="nav-left">
        <NavBarLink destination={"/"} text={"Home"} />
        <NavBarLink destination={"/todos"} text={"To-do list"} />
        </div>
          
    <div className="nav-right">
    {
              !user ?
              <>
               <NavBarLink destination={"/register"} text={"Register"} />            
               <NavBarLink destination={"/login"} text={"Login"} />
            </>
              :
              <span className='logout' onClick={handleLogout} >Logout</span>
    }
    </div>
        </Toolbar>
      </AppBar>
    </Box>
    </nav>);
}
