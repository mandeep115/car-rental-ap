/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { css, jsx } from '@emotion/react'



const CanNotAccess = ({ name }) => {
  const navigate = useNavigate()
  const [{ user }] = useStateValue()
  if (user.usertype === name) {
    return (
      <div css={css`
        text-transform: capitalize;
      `}>
        {name}s can't access this page
        <Link component={RouterLink} to="/">Click here</Link> to go home
      </div>
    )
  }

  return <div></div>;
};

export default CanNotAccess;
