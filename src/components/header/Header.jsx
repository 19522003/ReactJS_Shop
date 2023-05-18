import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useState } from 'react';
import Register from 'features/auth/components/register/Register';
import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import Login from 'features/auth/components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/auth/userSlice';
import { Link } from 'react-router-dom';
import { cartItemsCountSelector } from 'features/cart/selectors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
    width: 0,
  },
}));
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
export default function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(cartItemsCountSelector);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Shop
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>
              Products
            </Link>
          </Button>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          <IconButton onClick={handleCartClick} aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
      >
        <DialogActions>
          <IconButton classes={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogActions>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Login to account
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have account? Click here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
