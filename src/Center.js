/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'
import { Paper } from '@mui/material';

import React from 'react';

const Center = ({ children }) => {
  return (
    <Paper
      css={css`
        display: grid;
        place-content: center;
        width: 100vw;
        height: 100vh;
        /* background-color: #121212; */
      `}>{children}</Paper>
  )
};

export default Center;
