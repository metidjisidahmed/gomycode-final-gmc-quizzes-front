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
import AdbIcon from '@mui/icons-material/Adb';
import gmcLogo from "../../assets/images/logo.png"
import {useDispatch, useSelector} from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import {history} from "../../index";
import './styles.css'
import {disconnect} from "../../redux/actions";



const AccountAvatar =()=>{
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userData = useSelector(store=>store.userData)
    const dispatch = useDispatch()
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

    const submitDisconnect=()=>{
        dispatch(disconnect())
    }

    return(
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={userData.data.account.userName}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{userData.data.account.userName[0]}</Avatar>
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

                <MenuItem  onClick={submitDisconnect}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>

    )
}

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function ResponsiveAppBar() {

    const userData = useSelector(store=>store.userData)

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <img id="logo" onClick={()=>history.push("/categories")} src={gmcLogo}/>

                        {
                            userData.data.token != null ? (
                                <AccountAvatar />
                            ) :(
                                <>
                                    <div>
                                        <Button onClick={()=>history.push("/login")} style={{color : "white"  }} variant="outlined" startIcon={<LoginIcon />}>
                                            LOGIN
                                        </Button>
                                        <Button onClick={()=>history.push("/signup")} style={{color : "white" , borderColor : "white"}} variant="outlined" startIcon={<LoginIcon />}>
                                            SIGNUP
                                        </Button>
                                    </div>

                                </>

                            )
                        }

                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
