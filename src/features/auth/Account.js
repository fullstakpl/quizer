import React from 'react';
import { auth } from '../../services/firebase';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';

export default () => {
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();

  const logout = async () => {
    await auth().signOut()
    history.push("/");
  }

  return(
    <div>
      <p>Hello {currentUser?.email}!</p>
      <Button onClick={logout}>Wyloguj się</Button>
    </div>
  )
}
