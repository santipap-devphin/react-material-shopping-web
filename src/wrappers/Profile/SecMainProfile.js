import React from 'react';
import {Container ,Grid } from '@mui/material';
import MenuDbu from '../DashBoardUser/MenuDbu';
import SecProfile from './SecProfile';

const SecMainProfile = () => {
  return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
            <MenuDbu />
            </Grid>
            <Grid item xs={12} md={9}>
                    <SecProfile />
            </Grid>
        </Grid>
    </Container>
   )
}

export default SecMainProfile