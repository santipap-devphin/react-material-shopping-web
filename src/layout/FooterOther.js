import React from 'react'
import {Typography , Grid , TextField } from "@mui/material";
const FooterOther = ({bgStyle}) => {
    {/**#f6f6f8 */}
  return (
        <>
        <footer>
            <Grid alignItems="left" container sx={{backgroundColor:"#ffffff" ,p :10, color:"#000000" ,  boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                                    <Grid item xs={12} sm={4} md={4} lg={4} textAlign="center">
                                        
                                        <h2>SHOP</h2>
                                        <p>© 2020 <a href="#" rel="noopener noreferrer" target="_blank">Devphin</a>All Rights Reserved</p>
                                    
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2}  textAlign="center">
                                        
                                            <div><h2>PAGE</h2></div>
                                            <div>
                                                    <p>Lorem ipsum</p>
                                                    <p>Lorem ipsum</p>
                                                    <p>Lorem ipsum</p>
                                                    <p>Lorem ipsum</p>
                                                </div>
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2}  textAlign="center">
                                        
                                                <h2>Contact</h2>
                                                <p>Lorem ipsum</p>
                                                <p>Lorem ipsum</p>
                                                <p>Lorem ipsum</p>
                                                <p>Lorem ipsum</p>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} textAlign="center">
                                            
                                                <h2>SUBSCRIBE</h2>
                                                <p>Get E-mail updates about our latest shop and special offers.</p>
                                                <TextField
                                                fullWidth
                                                label="กรอกอีเมล์ของคุณ"
                                                id="outlined-start-adornment"
                                                /*color="warning"*/
                                                InputLabelProps={{
                                                    style: { color: '#5d5d5d'},
                                                }}
                                                />
                                    </Grid>
            </Grid>
        </footer>
        <footer style={bgStyle}>
                <Typography variant="p">Copy right Devphin 2022</Typography>
         </footer>
        </>
  )
}

export default FooterOther