import React from 'react';
import { fbAuth } from '../../services/firebase';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
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

export default () => {
  return(
    <div>
      <FacebookBtn onClick={fbAuth}>
        <FontAwesomeIcon icon={faFacebook} />
        Facebook
      </FacebookBtn>
    </div>
  )
}
