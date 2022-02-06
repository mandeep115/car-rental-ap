

/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormGroup, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, OutlinedInput, TextField, Typography } from '@mui/material';
// import { Box } from '@mui/system';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Center from './Center';
import API from './api';
import { useStateValue } from "./ContextProvider"

const AuthBox = ({ usertype, nameOnSubmit, urlToSubmit, nameOnBox, loginLinks, registrationLinks }) => {
  // console.log({ nameOnSubmit, urlToSubmit, nameOnBox, loginLinks, registrationLinks })
  const [{ user }, dispatch] = useStateValue()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate()
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleClickShowPassword = () => {
    setPasswordIsVisible(!passwordIsVisible)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = () => {
    if (!username || !password) {
      console.log('invalid')
      return;
    }
    console.log("hi")
    API.post(urlToSubmit, {
      username,
      password,
      usertype
    }).then(res => {
      console.log(res)
      if (res.data.status === "success") {
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.user
        })
        navigate("/")
      }
    })
  }

  return (
    <Center>
      <Card elevation={8} variant='elevation' sx={{ minWidth: 275 }}>
        <CardHeader title={nameOnBox} />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            css={css`
            display: flex;
            flex-direction: column;
            gap: 15px;
          `}
            noValidate
          >
            <TextField value={username} onChange={handleUsernameChange} id="outlined-basic" label="Username" variant="outlined" />
            <FormControl variant="outlined">

              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                value={password} onChange={handlePasswordChange}
                type={passwordIsVisible ? "text" : "password"}
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordIsVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="text" onClick={handleSubmit}>{nameOnSubmit}</Button>
          </Box>
          <List css={css`
              display: flex;
              justify-content: space-between;
              min-width: 350px;
              gap: 30;
          `}>
            <List>
              {
                loginLinks.map(({ name, url }) => {
                  // console.log(name, url);
                  return (
                    // <ListItem key={name}>
                    <Link component={RouterLink} to={url} key={name}>
                      <ListItemText primary={name} />
                    </Link>
                    // </ListItem>
                  )
                })
              }
            </List>
            <Divider />
            <List>
              {
                registrationLinks.map(({ name, url }) => {
                  // console.log(name, url);
                  return (
                    // <ListItem key={name}>
                    <Link component={RouterLink} to={url} key={name}>
                      <ListItemText primary={name} />
                    </Link>
                    // </ListItem>
                  )
                })
              }
            </List>

          </List>
          {/* <div
            css={css`
            display: flex;
            gap: 30px;
            justify-content: space-between;
          `}>
            <div></div>
            {}
          </div> */}
        </CardContent>
      </Card>
    </Center>
  )

  // return (
  //     <div
  //       css={css`
  //         border-radius: 4px;
  //         box-shadow: -1px 0px 17px -1px rgba(77,73,73,1);
  //         -webkit-box-shadow: -1px 0px 17px -1px rgba(77,73,73,1);
  //         -moz-box-shadow: -1px 0px 17px -1px rgba(77,73,73,1);
  //       `}
  //     >

  //     </div>
  //   </div>
  // )
};

export default AuthBox;
