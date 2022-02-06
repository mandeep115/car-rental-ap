
/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ThemeSwitch from "./ThemeSwitch";
import { FormControlLabel, Modal } from '@mui/material';
import { useStateValue } from "./ContextProvider"
import { useNavigate } from 'react-router-dom';
import API from './api';
import AddCar from './AddCar';
import { useLoginRequire } from './helpers';
const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [addCarOpen, setAddCarOpen] = React.useState(false);
  const [{ user, themeIsDark }, dispatch] = useStateValue()
  // const addCarRef = React.useRef(null);
  const navigate = useNavigate()
  // useLoginRequire(navigate)

  const handleOpenAddCar = () => {
    setAddCarOpen(true)
  }
  const handleCloseAddCar = () => {
    setAddCarOpen(false)
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleTheme = () => {
    dispatch({
      type: "TOGGLE_THEME",
    })
  }
  const handleLogout = () => {
    API.get("logout")
    dispatch({
      type: "LOGOUT"
    })
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <MenuItem onClick={() => navigate('/')}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >

              Car Rental
            </Typography>
          </MenuItem>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => ( */}
              <MenuItem onClick={() => navigate("/")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <FormControlLabel
                control={<ThemeSwitch onChange={toggleTheme} checked={themeIsDark} />}
                label="Switch Theme"
                css={css`
                margin-right: 10px;
              `}
                labelPlacement='start'
              />


              {
                user?.usertype === "agency" ?
                  <MenuItem onClick={handleOpenAddCar}>
                    <Typography textAlign="center">Add Car</Typography>
                  </MenuItem>
                  :
                  <MenuItem onClick={() => navigate("/rented-cars")}>
                    <Typography textAlign="center">View Rented Car</Typography>
                  </MenuItem>

              }
              {
                user ?
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem> :
                  <MenuItem onClick={() => navigate('/login-customer')}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
              }

              {/* ))} */}
            </Menu>
          </Box>

          <Typography
            // onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {/* <Button onClick={() => navigate("/")}> */}
            Car Rental
            {/* </Button> */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => ( */}
            {
              user?.usertype === "agency" ?
                <>
                  <Button
                    // ref={addCarRef}
                    onClick={handleOpenAddCar}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Add Car For Rent
                  </Button>
                </>

                :

                <Button
                  onClick={() => navigate("/rented-cars")}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  View Rented Cars
                </Button>
            }

          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {
              !user ?

                <Button onClick={() => navigate("/login-customer")} css={css`
                margin-right: 10px;
              `}>
                  <Typography color='ActiveBorder' textAlign="center">LOGIN</Typography>
                </Button>
                : null
            }
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.username} css={css`
                  text-transform: capitalize;
                `}>
                  {user?.username[0]}
                </Avatar>
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
              {/* <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem> */}
              {
                user ?
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem> : null
              }
              <FormControlLabel
                control={<ThemeSwitch onChange={toggleTheme} checked={themeIsDark} />}
                label="Switch Theme"
                css={css`
                margin-right: 10px;
              `}
                labelPlacement='start'
              />


            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Modal
        // anchorEl={addCarRef}
        open={addCarOpen}
        onClose={handleCloseAddCar}
      >
        <AddCar />
      </Modal>

    </AppBar>
  );
};
export default Nav;
