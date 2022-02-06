
/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'

import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import Center from './Center';

const Loading = () => {
  return (
    <Center>
      <CircularProgress color='inherit' />
      <Typography variant="h2" component="span" css={css`
        position: fixed;
        bottom: 10px;
        left: 10px;
      `} >
        Loading...
      </Typography>

    </Center>

  )
};

export default Loading;
