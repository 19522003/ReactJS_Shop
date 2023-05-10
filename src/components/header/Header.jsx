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
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            Shop
          </Typography>

          <Button color="inherit">Register</Button>

          <Button color="inherit">Login</Button>

          <Button color="inherit" onClick={handleClickOpen}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

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
          <Register closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
