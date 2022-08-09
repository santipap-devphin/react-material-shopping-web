import React from 'react';
import {Box  ,Grid } from '@mui/material';

const RightMessage = ({msg}) => {
  return (
                <Grid container sx={{mt:2}} justifyContent="right" alignItems="right">
                    <Grid item xs={6}>
                        <Box className="msgRight">{msg}</Box>
                        <span style={{fontSize:14}}>16:56 | July 04</span>
                    </Grid>
                 </Grid>
  )
}

export default RightMessage