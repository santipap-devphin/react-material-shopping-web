import React from 'react';
import { styled } from '@mui/material/styles';
import {Typography, Box , Stack  , Divider , Chip}  from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const Complete = () => {

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 1,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 1,
          backgroundColor: theme.palette.mode === 'light' ? '#2e7d32' : '#308fe8',
        },
    }));

    const BorderLinearProgressSuccess = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 1,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 1,
          backgroundColor: theme.palette.mode === 'light' ? '#fdbe33' : '#308fe8',
        },
    }));

  return (<Box
            sx={{
            width: "100%",
            backgroundColor: '#ffffff',
            boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
            pb:2
            }}
            >
            <Divider sx={{pt:1, pb:1}} textAlign="left">
                        <Chip label="Progress" />
            </Divider>
            <Stack spacing={2} sx={{pl:2 , pr:2}}>
                 
                        <BorderLinearProgress variant="determinate" color="success" value={50} />
                        <BorderLinearProgressSuccess variant="determinate" value={100}  />
                 
                
            </Stack>
            </Box>
        )
}

export default Complete