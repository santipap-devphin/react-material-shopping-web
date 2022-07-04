import React from 'react'
import {Stack , Typography ,Grid} from "@mui/material";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const ShippingDetail = ({bgShip}) => {
  return (
        <React.Fragment>
            <Stack justifyContent="center" alignItems="center" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 1.5 }} sx={{mt:"70px"}}>
            <Grid item lg={4} md={6} sm={6}>
                <Card style={bgShip} sx={{pt:3 , pb:3  , pl:11 ,pr:11}}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        image="../../assets/img/support-13.png"
                        alt="green iguana"
                    />
                    <Typography gutterBottom variant="p" component="div" style={{color:"#fff" , marginTop:1}}>
                        FREE SHIPPING ON ALL ORDER
                        </Typography>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item lg={4} md={6} sm={6}>
                <Card style={bgShip} sx={{pt:3 , pb:3  , pl:11 ,pr:11}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image="../../assets/img/support-14.png"
                            alt="green iguana"
                        />
                        <Typography gutterBottom variant="p" component="div" style={{color:"#fff" , marginTop:1.5 , marginBottom:0.7}}>
                            BACK GUARANTEE UNDER 5 DAYS
                        </Typography>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item lg={4} md={6} sm={6}>
                <Card style={bgShip} sx={{pt:3 , pb:3  , pl:11 ,pr:11}}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        image="../../assets/img/support-15.png"
                        alt="green iguana"
                    />
                    <Typography gutterBottom variant="p" component="div" style={{color:"#fff" , marginTop:10,marginBottom:10}}>
                        ON EVERY ORDER OVER $150
                        </Typography>
                    </CardActionArea>
                </Card>
            </Grid>
        </Stack>
    </React.Fragment>
  )
}

export default ShippingDetail