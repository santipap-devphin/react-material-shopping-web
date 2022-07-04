import React from 'react';
import {Grid ,Typography ,Button} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useNavigate  } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const ProductThreeRow = ({data}) => {

    let navigate = useNavigate();

    const haddleUrl = (id) => {

        navigate(`/product/${id}`)
    }

  return ( <Grid item xs={12} md={4}>
                <Card sx={{ maxWidth: 270 , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
                    <CardMedia
                        component="img"
                        height="50%"
                        image="../../assets/img/2.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.productTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.productDes}
                        </Typography>
                    </CardContent>
                    <CardActions style={{paddingLeft:0}}>
                                            
                                                <Button size="small" color="primary" style={{color:"#E81C2E" , paddingLeft:0}} onClick={()=> haddleUrl(data.id)}>
                                                <DoubleArrowIcon sx={{ml:2}} />
                                                    รายละเอียด
                                                </Button>
                </CardActions>
                </Card>
            </Grid>
        )
}

export default ProductThreeRow