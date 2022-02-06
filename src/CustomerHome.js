/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import { Alert, Button, Card, CardActions, CardContent, CardMedia, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Paper, Select, Snackbar, SnackbarContent, Stack, TextField, Typography } from '@mui/material';
import { blue, green, red, teal } from '@mui/material/colors';
import { Box } from '@mui/system';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCar from './AddCar';
import API from './api';
import { useStateValue } from './ContextProvider';
import { useLoginRequire } from './helpers';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';


// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';

const CarCard = ({ car, setCars }) => {
  const [rentDays, setRentDays] = useState(0);
  let dateArr = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).split('/');
  const [startDate, setStartDate] = useState(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
  const [{ user }] = useStateValue()
  const [showLoginSnack, setShowLoginSnack] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = () => {
    if (!user) {
      setShowLoginSnack(true)
    }
    if (!(rentDays > 0)) {
      return
    }
    API.post("rent", {
      car_id: car.id,
      num_of_days: rentDays,
    }).then(res => {
      if (res.data.status === "success") {
        API.get("get-all-cars").then(res => {
          if (res.data.status === 'success') {
            console.log(res.data)
            setCars(res.data.cars)
          }
        })

      }
    })
  }
  return (

    <Card elevation={2} css={css`
          min-width: 280px;
        `}
      key={car.id}
    >
      <Snackbar open={showLoginSnack} autoHideDuration={6000} onClose={() => setShowLoginSnack(false)}>
        <Alert onClose={() => setShowLoginSnack(false)} severity="info">
          You should be logged in to rent a car.
          <MenuItem css={css`
            display: inline;
            margin-left: 10px;
          `} variant="outlined" onClick={() => navigate("/login-customer")}>
            Login
          </MenuItem>

        </Alert>
      </Snackbar>

      <CardMedia component="div" height={140} />
      <CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {car.model}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {car.num}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Seat Cap is {car.seat_cap}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Rent Per Day is {car.rent_per_day}
          </Typography>
        </CardContent>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
          label="Basic example"
          value={startDate}
          onChange={(newValue) => {
            console.log(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

        {/* <input type="date" /> */}
        <CardActions>
          {car.is_available === "1" ?
            <Box component="form" css={css`
              display: flex;
              gap: 10px;
              align-items: baseline;
              align-content: center;
              `}>
              <FormControl>

                {/* <InputLabel htmlFor="select-rent">Number of days</InputLabel> */}
                <Select
                  id="outlined-adornment-rent"
                  size="small"
                  disableEmpty
                  type='number'
                  value={rentDays}
                  onChange={(e) => setRentDays(e.target.value)}
                  startAdornment={<InputAdornment position="start"><TagRoundedIcon /></InputAdornment>}
                // label="Rent for number of days"
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>

                  <MenuItem value={1}>One Day</MenuItem>
                  <MenuItem value={3}>Three Days</MenuItem>
                  <MenuItem value={7}>One Week</MenuItem>
                  <MenuItem value={30}>One Month</MenuItem>
                </Select>
                <FormHelperText>Days to rent</FormHelperText>

              </FormControl>
              <Button size="small" onClick={handleSubmit}>Rent</Button>
            </Box>
            :
            <Typography
              color={car.is_available === "0" ? red[500] : green[400]}
              css={css`
                margin-left: 10px;
                `}
              variant='button'>{car.is_available === "1" ? "Available" : "Rented"}</Typography>
          }
        </CardActions>
      </CardContent>
    </Card>

  )
}

const CustomerHome = () => {
  // const modalArray = useRef([]);
  const navigate = useNavigate()
  // useLoginRequire(navigate)
  const [cars, setCars] = useState([]);
  useEffect(() => {
    API.get("get-all-cars").then(res => {
      if (res.data.status === 'success') {
        console.log(res.data)
        setCars(res.data.cars)
      }
    })
    return () => {

    };
  }, []);

  return (
    <Paper css={css`
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      padding: 30px 10px;

      align-content: flex-start;
      flex: 1;
      /* padding-bottom: 40px; */
    `}>
      {cars.map((car) => (
        <CarCard car={car} setCars={setCars} />
      ))}
    </Paper>
  )
};

export default CustomerHome;
