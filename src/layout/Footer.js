import React from 'react';
import { Link } from 'react-router-dom';
import {Container,Typography , Grid , TextField , Stack , Box } from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CallIcon from '@mui/icons-material/Call';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Footer = ({bgStyle}) => {
  return (
        <>
        <footer>
            <Box sx={{backgroundColor:"#202022", pt:7 , pb:7}}>
            <Container>
                    <Grid rowSpacing={4} alignItems="left" container sx={{color:"#fff"}}>
                                            <Grid item xs={12} md={6} lg={3} textAlign="left">
                                                
                                                <Stack spacing={2}>
                                                        <Typography variant='h5'>SHOP</Typography>
                                                        <Typography variant='p' component="div"> © 2020 <Link to="/" rel="noopener noreferrer">Devphin</Link>All Rights Reserved </Typography>
                                                </Stack>
                                                
                                                
                                            
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3} textAlign="left">

                                                <Stack spacing={2}>
                                                    <Typography variant='h5'>PAGE</Typography>
                                                    <Stack spacing={1}>
                                                            <Stack spacing={2} direction="row">
                                                                    <ArrowForwardIosIcon sx={{fontsize:14}} />
                                                                    <Typography variant='p'> Lorem ipsum</Typography>
                                                            </Stack>
                                                            <Stack spacing={2} direction="row">
                                                                    <ArrowForwardIosIcon sx={{fontsize:14}} />
                                                                    <Typography variant='p'> Lorem ipsum</Typography>
                                                            </Stack>
                                                            <Stack spacing={2} direction="row">
                                                                    <ArrowForwardIosIcon sx={{fontsize:14}} />
                                                                    <Typography variant='p'> Lorem ipsum</Typography>
                                                            </Stack>
                                                            <Stack spacing={2} direction="row">
                                                                    <ArrowForwardIosIcon sx={{fontsize:14}} />
                                                                    <Typography variant='p'> Lorem ipsum</Typography>
                                                            </Stack>
                                                    
                                                    </Stack>
                                                
                                                </Stack>
                                                
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}  textAlign="left">
                                                
                                            <Stack spacing={2}>
                                                    <Typography variant='h5'>CONTACT</Typography>
                                                        <Stack spacing={1}>
                                                                <Stack spacing={2} direction="row">
                                                                    <AddLocationAltIcon sx={{fontSize:24, mr:1}} />
                                                                    <Typography variant='p'> Lorem ipsum</Typography>
                                                                </Stack>
                                                                <Stack spacing={2} direction="row">
                                                                    <CallIcon sx={{fontSize:24, mr:1}} />
                                                                    <Typography variant='p'>Lorem ipsum</Typography>
                                                                </Stack>
                                                                <Stack spacing={2} direction="row">
                                                                    <ForwardToInboxIcon sx={{fontSize:24, mr:1}} />
                                                                    <Typography variant='p'>Lorem ipsum</Typography>
                                                                </Stack>
                                                        </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3} textAlign="left">

                                                        <Stack spacing={2}>
                                                            <Typography variant='h5'>SUBSCRIBE</Typography>
                                                            <Stack spacing={1}>
                                                                <Typography variant='p' component="div">Get E-mail updates about our latest shop and special offers.</Typography>
                                                                <TextField
                                                                        fullWidth
                                                                        label="กรอกอีเมล์ของคุณ"
                                                                        id="outlined-start-adornment"
                                                                        variant="outlined"
                                                                      
                                                                        sx={{ input: { color: 'white' } }}
                                                                        /*color="warning"*/
                                                                        InputLabelProps={{
                                                                            style: { color: '#fff'},
                                                                        }}
                                                                        />
                                                            </Stack>

                                                        </Stack>    
                                            </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
        <footer style={bgStyle}>
                <Typography variant="p">Copy right Devphin 2022</Typography>
         </footer>
        </>
  )
}

export default Footer