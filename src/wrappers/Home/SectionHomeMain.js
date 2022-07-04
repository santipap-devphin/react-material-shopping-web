import React from 'react'
import {Stack , Box , Typography ,Button , Paper } from "@mui/material";
import { Link } from 'react-router-dom';
const SectionHomeMain = ({stylePaper}) => {
  return (
    <section>
              <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    
                  }}
                >
                  <Paper style={stylePaper} component={Stack} direction="column" justifyContent="center">
                  
                    <Typography
                      style={{color:"white"}}
                      component="h3"
                      variant="h2"
                      align="center"
                      color="text.primary"
                      gutterBottom
                    >
                        Stylish
                    </Typography>
                    <Typography style={{color:"white"}} variant="h1" align="center" color="text.secondary" paragraph>
                          Male Clothes
                    </Typography>
                    <Typography style={{color:"white"}} variant="p" align="center" color="text.secondary" paragraph>
                          30% off Black Friday
                    </Typography>
                    <Stack
                      sx={{ pt: 6 }}
                      direction="row"
                      spacing={3}
                      justifyContent="center"
                    >
                      <Link to="/shop" style={{textDecoration: "none"}}><Button variant="contained" size="large" style={{paddingLeft:60 , paddingRight:60}}>Shop Now</Button></Link>
                    
                    </Stack>
                  </Paper>
                
                </Box>
          </section>
  )
}

export default SectionHomeMain