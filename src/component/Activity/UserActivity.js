import React from 'react';
import {Typography, Box , Stack  , Divider , Chip}  from '@mui/material';
import img from "../../assets/prdimg.jpg";

const UserActivity = () => {
  return (
            <Box
                sx={{
                width: "98%",
                backgroundColor: '#ffffff',
                boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                pb:2
                }}
                >
                    <Divider sx={{p:1}}  textAlign="left">
                        <Chip label="User Activity" />
                    </Divider>
                    <Stack direction="row" spacing={1} sx={{'&:hover': {backgroundColor: '#FBF1d5', opacity: [0.9, 0.8, 0.7]}}}>
                            <Stack spacing={1}>
                                <img src={img} style={{borderRadius: "50%" , padding:20}} />
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant='p' sx={{fontSize:18 , mt:1}}>What you name ?</Typography>
                                <Typography variant='p' sx={{fontSize:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Typography>
                            </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{'&:hover': {backgroundColor: '#FBF1d5', opacity: [0.9, 0.8, 0.7]}}}>
                            <Stack spacing={1}>
                                <img src={img} style={{borderRadius: "50%" , padding:20}} />
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant='p' sx={{fontSize:18 , mt:1}}>What you name ?</Typography>
                                <Typography variant='p' sx={{fontSize:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Typography>
                            </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{'&:hover': {backgroundColor: '#FBF1d5', opacity: [0.9, 0.8, 0.7]}}}>
                            <Stack spacing={1}>
                                <img src={img} style={{borderRadius: "50%" , padding:20}} />
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant='p' sx={{fontSize:18 , mt:1}}>What you name ?</Typography>
                                <Typography variant='p' sx={{fontSize:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Typography>
                            </Stack>
                    </Stack>
            </Box>
  )
}

export default UserActivity