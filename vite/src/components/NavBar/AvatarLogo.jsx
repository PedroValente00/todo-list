import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

export default function AvatarLogo({ user }) {
 return <>
   {
     user ?
     <div className='avatar-logo'>
     <Tooltip title={user.name}>
     <Avatar sx={{ bgcolor: deepOrange[500] }} alt="" src="/broken-image.jpg" />
     </Tooltip>
     </div>
     :
     <div className='avatar-logo'>
     <Tooltip title={"Guest"}>
     <Avatar alt="" src="/broken-image.jpg" />
     </Tooltip>
       </div>
    }
    </>
  
}
