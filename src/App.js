import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import { Quiz } from './features/quiz/Quiz';
import Login from './features/auth/Login';
import Account from './features/auth/Account';
import useAuthUser from './hooks/useAuthUser';

import './App.css';

function App() {
  const currrentUser = useAuthUser()
  console.log(currrentUser)

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
      <div className="App">
        {currrentUser
          ? <Link to='/account'>Account</Link>
          : <Link to='/login'>Login</Link>
        }
        <header className="App-header">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/account">
              <Account />
            </PrivateRoute>
            <Route path="/">
              <Quiz />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
