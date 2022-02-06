
/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';
import AuthBox from './AuthBox';
import Paper from '@mui/material/Paper';


import { useStateValue } from './ContextProvider';
import Loading from './Loading';
import Nav from './Nav';
import { useLoginRequire } from './helpers';
import AgencyHome from './AgencyHome';
import CustomerHome from './CustomerHome';

const Home = () => {
  const [{ user }] = useStateValue()
  const navigate = useNavigate()
  // useLoginRequire(navigate)
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login-customer")
  //   }
  // }, []);


  return (
    // <AuthBox nameOnBox="Customer Login" urlToSubmit="login" nameOnSubmit="Login" loginLinks={[{name:"login as agency", url="/login-agency"}]} registrationLinks={[{"register as customer"}, {name: "register as agency", url: ""}]} />
    <div css={css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    `}>
      <Nav />
      {
        !user ?
          <CustomerHome /> :
          user?.usertype === "agency" ? <AgencyHome /> : <CustomerHome />
      }
    </div>
  );
};

export default Home;
