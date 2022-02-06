/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import { Card, CardContent, CardMedia, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';
import { useStateValue } from './ContextProvider';
import { useLoginRequire } from './helpers';
import Nav from './Nav';

const RentCard = ({ rent }) => {
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.post("get-car-by-id", {
      car_id: rent.car_id
    }).then(res => {
      console.log(res.data)
      setCar(res.data)
      setIsLoading(false)
    })
    return () => {

    };
  }, []);
  if (isLoading) {
    return <CircularProgress />
  }
  let startDate = new Date(rent.start_date);
  let endDate = new Date(rent.start_date);

  endDate = endDate.setDate(endDate.getDate() + parseInt(rent.num_of_days))

  const diffTime = Math.abs(endDate - new Date());
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(daysLeft)



  return (
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
          <Typography gutterBottom variant="body1" color="text.secondary">
            Car Rented on {rent.start_date}
          </Typography>
          {
            daysLeft > 0
              ?
              <Typography gutterBottom variant="body2" color="text.">
                Days left: {daysLeft}
              </Typography>
              :
              <Typography gutterBottom variant="body2" color="red" >
                Rent Expired
              </Typography>
          }
        </CardContent>
      </CardContent>
    </Card>
  )

}

const ViewRentedCars = () => {
  const navigate = useNavigate()
  useLoginRequire(navigate)
  const [rents, setRents] = useState([]);
  const [{ user }] = useStateValue()
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    API.get("get-booked-cars").then(res => {
      console.log(res.data.cars)
      setRents(res.data.cars)
      setIsLoading(false)
    })
    return () => {

    };
  }, []);

  if (isLoading) {
    return <>
      <Nav />
      <CircularProgress color='inherit' />
    </>
  }

  return (
    <div css={css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    `}>
      <Nav />
      <Paper css={css`
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      padding: 30px 10px;

      align-content: flex-start;
      flex: 1;
     `}>

        {rents?.map(rent => <RentCard key={rent?.id} rent={rent} />)}
      </Paper>
    </div>
  )
};

export default ViewRentedCars;
