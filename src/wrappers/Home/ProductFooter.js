import React from 'react'
import {Typography ,Grid , IconButton , Button} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const ProductFooter = ({menuId , cardfooter}) => {
  return (
            <Grid container justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{mt:"70px"}}>
                                      <Grid item lg={6} md={6} justifyContent="center" alignItems="center">
                                            <Card style={cardfooter}>
                                                <CardContent>
                                                    <Typography variant="h3" color="#fff">
                                                      Lorem ipsum
                                                    </Typography>
                                                    <Typography variant="p" color="#E81C2E">
                                                        Starting at $99.00
                                                    </Typography>
                                                  </CardContent>
                                                  <CardActions sx={{pt:20}}>
                                                  <IconButton
                                                      size="large"
                                                      edge="end"
                                                      aria-label="account of current user"
                                                      aria-controls={menuId}
                                                      aria-haspopup="true"
                                                      color="inherit"
                                                  
                                                  >
                                                  <ArrowForwardIosIcon sx={{color:"#E81C2E"}} />
                                                  </IconButton>
                                                  <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                                                  </CardActions>
                                            </Card>
                                      </Grid>
                                      <Grid item lg={6} md={6} justifyContent="center" alignItems="center">
                                                  <Card style={cardfooter}>
                                                  
                                                  <CardContent>
                                                      
                                                      <Typography variant="h3" color="#fff">
                                                        Lorem ipsum
                                                      </Typography>
                                                      <Typography variant="p" color="#E81C2E">
                                                          Starting at $99.00
                                                      </Typography>
                                                    </CardContent>
                                                    <CardActions sx={{pt:20}}>
                                                    <IconButton
                                                        size="large"
                                                        edge="end"
                                                        aria-label="account of current user"
                                                        aria-controls={menuId}
                                                        aria-haspopup="true"
                                                        color="inherit"
                                                    >
                                                    <ArrowForwardIosIcon sx={{color:"#E81C2E"}} />
                                                    </IconButton>
                                                    <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                                                    </CardActions>
                                            </Card>
                                      </Grid>
            </Grid>
  )
}

export default ProductFooter