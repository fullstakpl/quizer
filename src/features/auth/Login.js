import React from 'react';
import { fbAuth, ghAuth } from '../../services/firebase';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'

const FacebookBtn = styled(Button)`
  && {
    background-color: #3b5998;
    color: #fff;
    width: 200px;
    display: flex;
    justify-content: space-around;

    :hover {
      background-color: #4e71ba;
    }
  }
`;

const GithubBtn = styled(Button)`
  && {
    margin-top: 12px;
    background-color: #e9e9e9;
    color: #000;
    width: 200px;
    display: flex;
    justify-content: space-around;

    :hover {
      background-color: #b7bebe;
    }
  }
`;

export default () => {
  return(
    <div>
      <FacebookBtn onClick={fbAuth}>
        <FontAwesomeIcon icon={faFacebook} />
        Facebook
      </FacebookBtn>
      <GithubBtn onClick={ghAuth}>
        <FontAwesomeIcon icon={faGithub} />
        Github
      </GithubBtn>
    </div>
  )
}
