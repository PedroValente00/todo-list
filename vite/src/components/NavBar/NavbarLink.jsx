import { NavLink } from "react-router";
import Button from '@mui/material/Button';
import { getOpacity } from "@mui/material/styles/createColorScheme";

export default function NavBarLink ({destination, text}) {

  const activeState = ({ isActive }) => ({
    opacity: isActive && 1,
    borderBottom: isActive && "1px solid white"
  })

  return <NavLink to={destination}  style={activeState} >
              <Button color="inherit">{text}</Button>
          </NavLink>

}