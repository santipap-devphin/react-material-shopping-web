import React from 'react';
import {Typography, Box , Stack}  from '@mui/material';

const CardDashBoard = ({icons , textmsg , count}) => {
  return (<Box
                sx={{
                width: "95%",
                height: 100,
                backgroundColor: '#ffffff',
                boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                '&:hover': {
                        backgroundColor: '#FBF1d5',
                        opacity: [0.9, 0.8, 0.7],
                            },
                }}
                >
                    <Stack direction="row" spacing={6}>
                            {icons}
                            <Stack spacing={1}>
                                <Typography variant='p' sx={{fontSize:24 , mt:1}}>{textmsg}</Typography>
                                <Typography variant='p' sx={{fontSize:18}}>{count}</Typography>
                            </Stack>
                    </Stack>
            </Box>
        )
    }

export default CardDashBoard