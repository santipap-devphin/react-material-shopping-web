import React from 'react';
import {Container ,Grid } from '@mui/material';
import MenuDbu from '../DashBoardUser/MenuDbu';
import SecConfirmU from './SecConfirmU';


const SecMainConfirmU = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                <MenuDbu />
                </Grid>
                <Grid item xs={12} md={9}>
                        <SecConfirmU />
                </Grid>
            </Grid>
        </Container>
    )
}

export default SecMainConfirmU