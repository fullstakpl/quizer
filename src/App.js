import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import { Quiz } from './features/quiz/Quiz';
import Login from './features/auth/Login';
import Account from './features/auth/Account';
import NewQuiz from './features/quiz/NewQuiz.js';
import useAuthUser from './hooks/useAuthUser';
import { Navbar, SideMenu } from './components/Menu';

import './App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

function App() {
  const classes = useStyles();
  const currrentUser = useAuthUser()
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          currrentUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar open={menuOpen} toggleMenu={toggleMenu} />
        <SideMenu open={menuOpen} toggleMenu={toggleMenu} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: menuOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/account">
              <Account />
            </PrivateRoute>
            <PrivateRoute path="/quiz/new">
              <NewQuiz />
            </PrivateRoute>
            <Route path="/">
              <Quiz />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
