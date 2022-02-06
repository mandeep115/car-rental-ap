
/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/react'
import { Button, Card, CardActions, CardContent, CardMedia, Modal, Paper, Typography } from '@mui/material';
import { blue, green, teal } from '@mui/material/colors';
import { Box } from '@mui/system';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCar from './AddCar';
import API from './api';
import { useStateValue } from './ContextProvider';
import { updateCars, useLoginRequire } from './helpers';

const AgencyHome = () => {
  const [{ cars }, dispatch] = useStateValue()
  // const modalArray = useRef([]);
  const navigate = useNavigate()
  useLoginRequire(navigate)
  const [updateCarOpen, setUpdateCarOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  useEffect(() => {
    updateCars(dispatch)
    // API.get("get-all-agency-cars").then(res => {
    //   if (res.data.status === "success") {
    //     console.log(res.data)
    //     dispatch({
    //       type: "APPEND_CARS",
    //       payload: res.data.cars
    //     })
    //   }
    // })

    return () => {
      dispatch({ type: "CLEAR_CARS" })
    };
  }, []);

  const handleOpenUpdateCar = (car) => {
    setCurrentCar(car)
    setUpdateCarOpen(true)
  }
  const handleCloseUpdateCar = () => {
    setCurrentCar(null)
    setUpdateCarOpen(false)
  }
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
      {cars.map((car, idx) => (
        <Card elevation={2} css={css`
          min-width: 280px;
        `}
          key={car.id}
        >
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
            <CardActions>
              <Button size="small" onClick={() => handleOpenUpdateCar(car)}>Edit</Button>
              <Typography
                color={car.is_available === "1" ? blue[500] : green[400]}
                css={css`
                margin-left: 10px;
              `}
                variant='button'>{car.is_available === "1" ? "Available" : "Rented"}</Typography>
            </CardActions>
          </CardContent>
        </Card>

      ))}
      <Modal
        open={updateCarOpen}
        onClose={handleCloseUpdateCar}
      >
        <AddCar url="update-car" vModel={currentCar?.model} vNumber={currentCar?.num} capacity={currentCar?.seat_cap} rent={currentCar?.rent_per_day} title={`Update car listing for ${currentCar?.num}`} carId={currentCar?.id} snackMessage="Car listing updated" buttonText="Update Car" />
      </Modal>
    </Paper>
  )
};

export default AgencyHome;
