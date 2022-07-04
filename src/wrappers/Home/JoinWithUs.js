import React from 'react'
import {Stack,Typography ,TextField ,Grid , Button} from "@mui/material";
const JoinWithUs = () => {
  return (
        <React.Fragment>
                <Typography
                    style={{color:"white" , marginTop:"70px"}}
                        component="h2"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        >
                Join With Us!
                </Typography>      
                         
                         <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <Typography  variant="p" component="div" style={{color:"#fff" , mt:1.5 , mb:0.7}}>
                                    Subscribe to our newsletter to receive news on update
                            </Typography>
                         </Stack>
                         <Grid container justifyContent="center" alignItems="center">

                                  <Grid item xs={12} sm={12} md={6} lg={6} sx={{mt:3}}>

                                        <center>
                                              <TextField
                                              fullWidth
                                              label="กรอกอีเมล์ของคุณ"
                                              id="outlined-start-adornment"
                                              variant="filled"
                                              /*color="warning"*/
                                              InputLabelProps={{
                                                style: { color: '#fff'},
                                              }}
                                              />

                                        </center>
                                  </Grid>
                                  <Grid item lg={12} sx={{mt:3}}>
                                      <center><Button variant="contained" size="large" style={{paddingLeft:60 , paddingRight:60}}>SUBSCRIBE</Button></center>
                                  </Grid>

                                  </Grid> 
        </React.Fragment>
  )
}

export default JoinWithUs