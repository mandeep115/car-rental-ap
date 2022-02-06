/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Center from './Center';
import { useStateValue } from './ContextProvider';
import { useLoginRequire } from './helpers';
// Vehicle model, Vehicle number, seating capacity, rent per day
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import CloseIcon from '@mui/icons-material/Close';
import API from './api';
import { updateCars } from './helpers';
const AddCar = ({ url = 'add-car', vModel = '', vNumber = '', capacity = 0, rent = 0, snackMessage = "Car listed for rent", buttonText = "Add Car", title = "Add car for rent", carId = 0 }) => {
  const navigate = useNavigate()
  useLoginRequire(navigate)
  const [{ user }, dispatch] = useStateValue()
  const [values, setValues] = useState({
    vModel,
    vNumber,
    capacity,
    rent
  });
  const [showSnack, setShowSnack] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = () => {

    for (const [k, v] of Object.entries(values)) {
      if (!v) {
        return
      }
    }
    API.post(url, {
      car_id: carId,
      agency_id: user.id,
      car_model: values.vModel,
      car_num: values.vNumber,
      car_seat_cap: values.capacity,
      car_rent_per_day: values.rent
    }).then(res => {
      if (res.data.status === 'success') {
        console.log(res.data)
        setValues({
          vModel: '',
          vNumber: '',
          capacity: 0,
          rent: 0,
        })
        setShowSnack(true)
        updateCars(dispatch)
        // dispatch({
        //   type: "APPEND_CAR",
        //   payload: res.data.car
        // })
      }
    })
  }
  const style = {
    position: 'fixed',
    bottom: '3%',
    left: '2%',
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
  };


  return (
    // <Center>

    <Card variant='outlined' sx={style}>
      <CardContent>
        <CardHeader title={title} />
        <Box component="form" css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-model">Vehicle Model</InputLabel>
            <OutlinedInput
              type='text'
              id="outlined-adornment-model"
              value={values.vModel}
              onChange={handleChange('vModel')}
              startAdornment={<InputAdornment position="start"><CopyrightIcon /></InputAdornment>}
              label="Vehicle Model"
            />
          </FormControl>
          <FormControl css={css`
          tab-size: -1;
        `}>
            <InputLabel htmlFor="outlined-adornment-number">Vehicle Number</InputLabel>
            <OutlinedInput
              type='text'
              id="outlined-adornment-number"
              value={values.vNumber}
              onChange={handleChange('vNumber')}
              startAdornment={<InputAdornment position="start"><TagRoundedIcon /></InputAdornment>}
              label="Vehicle Number"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-capacity">Vehicle Capacity</InputLabel>
            <OutlinedInput
              type='number'
              id="outlined-adornment-capacity"
              value={values.capacity}
              onChange={handleChange('capacity')}
              startAdornment={<InputAdornment position="start"><AirlineSeatReclineNormalIcon /></InputAdornment>}
              label="Vehicle Capacity"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-rent">Rent per day</InputLabel>
            <OutlinedInput
              type='number'
              id="outlined-adornment-rent"
              value={values.rent}
              onChange={handleChange('rent')}
              startAdornment={<InputAdornment position="start"><CurrencyRupeeRoundedIcon /></InputAdornment>}
              label="Rent per day"
            />
          </FormControl>

          <Button variant="text" onClick={handleSubmit}>{buttonText}</Button>
        </Box>

      </CardContent>
      <Snackbar
        css={css`
          background-color: greenyellow;
        `}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={showSnack}
        autoHideDuration={4000}
        onClose={() => setShowSnack(false)}
        message={snackMessage}
        action={<IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setShowSnack(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        }
      />

    </Card>
    // </Center>
  )
};

export default AddCar;
