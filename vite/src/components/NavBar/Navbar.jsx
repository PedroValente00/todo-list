import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBarLink from './NavbarLink';
import AvatarLogo from './AvatarLogo';

export default function NavBar({ user, setUser }) {

  const handleLogout = async () => {
    await fetch("/api/authentication/logout", { method: "POST" })
    setUser()
  }

  return (<nav className='navbar' >
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="nav-left">
            {!user ?
              <NavBarLink destination={"/"} text={"Home"} />
              :
              <NavBarLink destination={"/todos"} text={"To-do list"} />
            }
          </div>
          <div className="nav-right">
            {
              !user ?
                <>
                  <NavBarLink destination={"/login"} text={"Login"} />
                  <NavBarLink destination={"/register"} text={"Register"} />
                  <AvatarLogo user={user} />
                </>
                :
                <>
                  <div className='logout' onClick={handleLogout} >Logout</div>
                  <AvatarLogo user={user} />
                </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  </nav>);
}
