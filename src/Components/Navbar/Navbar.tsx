import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

const settings = ['Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate=useNavigate()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    navigate('/');
  };
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'))
 
  return (
    <AppBar position="static" sx={{backgroundColor:'#FCF3CF'}}>
      <Container style={{ width: '100%' , height: matchesSm ? '90px' : '120px'}}>
        <Toolbar disableGutters sx={{display: 'flex' ,justifyContent: 'space-between' ,height: "100%"}} >
          <Stack >
          <img alt="stock-logo" src='/logo1.png' style={{ marginLeft: '40px' }} />
          </Stack>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p:1}}>
                <Avatar alt="user" src="/static/images/avatar/2.jpg"  sx={{ bgcolor: '#FFC300',width:  matchesSm  ? 35:  40, height:  matchesSm  ? 35: 40}}/>
              </IconButton>
            </Tooltip> 
             <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;