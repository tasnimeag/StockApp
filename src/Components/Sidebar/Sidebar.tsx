import  React, { useState } from 'react'
import './Sidebar.css';
import {SidebarProps} from '../../Interfaces.tsx';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Sidebar({sidebarData }:SidebarProps) {
  const theme=useTheme()
  const logo=useMediaQuery(theme.breakpoints.down('md'))
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List
         sx={{ width: 280 }}>
          <ul className='sidebar-ul'>
            {sidebarData.map((val,key)=>{
            return(
              <li
                key={key}
                className='row'
                id={window.location.pathname===val.link ? "active": ""}
                onClick={()=>{
                window.location.pathname=val.link;
              }}>
                <Stack id="icon">{val.icon}</Stack>
                <Link className="title" to={val.link}>{val.title}</Link>
              </li>
            )
          })}
        </ul>
          
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "orange", marginLeft: "auto" ,width:'auto',position:'absolute',top:logo?'15px':'25px'}}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{width:'50px',fontSize:'50px',zIndex:'1'}}/>
      </IconButton>
        
  </React.Fragment>
    
  )
}
