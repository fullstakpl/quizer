import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitIcon from '@material-ui/icons/ExitToApp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';

import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { selectCurrentUser } from '../features/auth/authSlice';
import { auth } from '../services/firebase';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export const Navbar = ({open, toggleMenu}) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleMenu}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Quizer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export const SideMenu = ({ open, toggleMenu}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const currentUser = useSelector(selectCurrentUser);

  const logout = async () => {
    await auth().signOut();
    toggleMenu()
    history.push('/')
  }

  const navigate = path => {
    history.push(path);
    toggleMenu()
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleMenu}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate('/quiz/new')}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='Utwórz quiz' />
        </ListItem>
      </List>
      <Divider />
      <List>
        {!currentUser && <ListItem button onClick={() => navigate('/login')}>
            <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
            <ListItemText primary="Zaloguj się" />
        </ListItem>}
        {currentUser && <ListItem button onClick={() => navigate('/account')}>
          <ListItemIcon><AccountIcon /></ListItemIcon>
          <ListItemText primary="Twoje konto" />
        </ListItem>}
        {currentUser && <ListItem button onClick={logout}>
          <ListItemIcon><ExitIcon /></ListItemIcon>
          <ListItemText primary="Wyloguj się" />
        </ListItem>}
      </List>
    </Drawer>
  )
}


