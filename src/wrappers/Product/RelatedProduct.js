import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack  from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FeaturedCard from '../../component/Card/FeaturedCard';

const RelatedProduct = ({data , styles}) => {
  //console.log(data)
  return (

        <Container>
            <Divider sx={{p:5}}>
                <Chip label="สินค้าที่คุณสนใจ" sx={{fontSize:24}}/>
            </Divider>
            <Grid container columnSpacing={{ xs: 1, sm: 1, md: 3 }}>

                {
                    data !== null && data.length > 0 ?
                    data.slice(0,3).map((vals , index) => {

                        return (<Grid key={index} item xs={12} sm={4}>
                                    <Stack alignItems="center" sx={{backgroundColor:"#ffffff" ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , mb:5}}>
                                        <FeaturedCard prdId ={vals.id} prdTitle ={vals.productTitle} prdImage ={vals.image} prdPrice ={vals.productPrice} prdPriceLast={vals.productPriceLast} textWhite={styles}/>
                                    </Stack>
                                </Grid>)
                         })
                    : null
                }
            </Grid>
        </Container>
  )
}

export default RelatedProduct