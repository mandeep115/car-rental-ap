import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import api from "./api";
import { useEffect, useMemo, useState } from 'react';
import Loading from './Loading';
import AuthBox from './AuthBox';
import { useStateValue } from './ContextProvider';
import Home from './Home';
import AddCar from './AddCar';
import { createTheme, ThemeProvider } from '@mui/material';
import ViewRentedCars from './ViewRentedCars';
import API from './api';




function App() {
  const [{ themeIsDark }] = useStateValue()
  // const muiTheme = useMemo(() => createTheme({
  //   palette: {
  //     mode: themeIsDark ? 'dark' : 'light'
  //   }
  // }), [themeIsDark]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark"
    }
  })
  const lightTheme = createTheme({
    palette: {
      mode: "light"
    }
  })
  const [isLoading, setIsLoading] = useState(true);
  const [{ user }, dispatch] = useStateValue()
  // const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      API.get("get-current-user").then(res => {
        if (res.data) {
          console.log(res.data)
          dispatch({
            type: "UPDATE_USER",
            payload: res.data
          })
        }
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, []);
  // return (
  //   <ThemeProvider theme={themeIsDark ? darkTheme : lightTheme}>
  //     <Home />
  //   </ThemeProvider>
  // )
  if (isLoading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Loading />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={themeIsDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login-customer"
            element={
              <AuthBox usertype="customer" nameOnBox="Customer Login"
                urlToSubmit="login"
                nameOnSubmit="Login"
                loginLinks={[{ name: "login as agency", url: "/login-agency" }]}
                registrationLinks={[{ name: "register as customer", url: "/register-customer" }, { name: "register as agency", url: "/register-agency" }]}
              />
            }
          />
          <Route
            path="/register-customer"
            element={<AuthBox usertype="customer" nameOnBox="Customer Registration" urlToSubmit="register" nameOnSubmit="Register" loginLinks={[{ name: "login as customer", url: "/login-customer" }, { name: "login as agency", url: "/login-agency" }]} registrationLinks={[{ name: "register as agency", url: "/register-agency" }]} />}
          />
          <Route
            path="/login-agency"
            element={<AuthBox usertype="agency" nameOnBox="Agency Login" urlToSubmit="login" nameOnSubmit="Login" loginLinks={[{ name: "login as customer", url: "/login-customer" }]} registrationLinks={[{ name: "register as customer", url: "/register-customer" }, { name: "register as agency", url: "/register-agency" }]} />}
          />
          <Route
            path="/register-agency"
            element={<AuthBox usertype="agency" nameOnBox="Agency Registration" urlToSubmit="register" nameOnSubmit="Register" loginLinks={[{ name: "login as customer", url: "/login-customer" }, { name: "login as agency", url: "/login-agency" }]} registrationLinks={[{ name: "register as customer", url: "/register-customer" }]} />}
          />
          <Route
            path="/add-car"
            element={<AddCar />}
          />
          <Route
            path="/rented-cars"
            element={<ViewRentedCars />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
