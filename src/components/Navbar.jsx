import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  position: 'fixed',
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
}));

const Navbar = () => {
  return (
    <StyledAppBar position="static" color="primary">
        
      <Toolbar sx={{ display : 'flex' , justifyContent : 'space-between' }}>
        <Link to="/" color='white' className='Logotext'>  <Typography  variant="h6">DuckAppApi</Typography></Link>
       
     
  
      </Toolbar>
     
    </StyledAppBar>
  );
};

export default Navbar;
