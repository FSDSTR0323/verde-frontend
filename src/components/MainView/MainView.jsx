import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, ToggleButton } from '@mui/material';
import PropTypes from 'prop-types';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, Tabs, Tab, Fab, FormControlLabel, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Filters from './Filters/Filters';
import { useState, useContext, useEffect } from 'react';
import { HousingList } from './HousingList/HousingList';
import { RequestList } from './RequestList/RequestList';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { InmueblesProvider } from '../FilterHousing/HousingContextFilter.jsx';


const drawerWidth = 330;

export function MainView(props) {

  const navigate = useNavigate()
  const { profile } = useContext(AuthContext);
  const [myHousingSwitch, setMyHousingSwitch] = useState();
  const [myRequestsSwitch, setMyRequestsSwitch] = useState();

  // Responsive Drawer
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // App bar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  // Tabs

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };


  // TabPanel

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // Lógica para cerrar sesión...

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate("/login")
    console.log("isLoggedIn en MainView:", isLoggedIn)
    console.log("logout ejecutándose")
  };


  //Lógica para regresar al usuario al login si no está autorizado...

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    };
  }, [isLoggedIn]);

// Lógica para filtrar las viviendas del usuario logueado
  const handleMyHousingSwitch = () => {
    setMyHousingSwitch((prevValue) => !prevValue);
    console.log("myHousingSwitch:", myHousingSwitch)
  };

  const handleMyRequestsSwitch = () => {
    setMyRequests((prevValue) => !prevValue);
  };


  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <ManageSearchIcon style={{ fontSize: '30px' }} />
          </IconButton>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div">
              DOMUS
            </Typography>
            <React.Fragment>
              <Box >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    {profile.profilePicture ? (
                      <Avatar alt="profile picture" src={profile.profilePicture} sx={{ width: 32, height: 32 }} />
                    ) : (
                      <Avatar sx={{ width: 32, height: 32 }} />
                    )}

                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >

                <MenuItem onClick={() => (
                  navigate("/userprofile")
                )}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {/* {`${profile.name.charAt(0)}${profile.surname.charAt(0)}`} */}
                  </Avatar> Mi perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Container>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Filters />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Filters />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, margin: 0 } }}
      >
        <Toolbar />


        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
            <Tab label="Inmuebles" {...a11yProps(0)} />
            <Tab label="Requerimientos" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <FormControlLabel
            style={{ marginTop: "-30px", marginBottom: "5px", padding: 0, justifyContent: "end", width: '100%' }}
            control={
              <Switch
                checked={myHousingSwitch}
                onChange={handleMyHousingSwitch}
                color="primary"
              />
            }
            label="Mostrar sólo mis propiedades"
          />
          
          <HousingList myHousingSwitch={myHousingSwitch}/>

          <Box sx={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: '9999' }}>
            <Fab
              color="primary"
              onClick={() => navigate("/addhousing")}
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Box>

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
        <FormControlLabel
            style={{ marginTop: "-30px", marginBottom: "5px", padding: 0, justifyContent: "end", width: '100%' }}
            control={
              <Switch
                checked={myRequestsSwitch}
                onChange={handleMyRequestsSwitch}
                color="primary"
              />
            }
            label="Mostrar sólo mis requerimientos"
          />
          <RequestList/>
            
        </TabPanel>
      </Box>
    </Box>
  );
}

MainView.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}