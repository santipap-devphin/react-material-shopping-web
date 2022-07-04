import React from 'react';
import { Box ,Stack , Grid, Typography , Divider , Chip} from '@mui/material';
import CardOrder from '../../component/Card/CardOrder';

const SecOrderPendding = () => {
  return (
        <Box sx={{backgroundColor:"#f3f3f3"}}>
                <Divider  sx={{m:2}}>
                    <Chip label="Order 225xxx" sx={{fontSize:24}}  color="info"/>
                </Divider>
                <Grid container spacing={2} sx={{p:1}}>
                    <CardOrder RowsP={12 / 2}  cardTitle = {"ชื่อสินค้า"}  cardPrice={3500} cardStatus={"warning"} />
                    <CardOrder RowsP={12 / 2} cardTitle = {"ชื่อสินค้า"}  cardPrice={3500} cardStatus={"warning"} />       
                   
                </Grid>
                <Grid container sx={{p:1 , mb:2}} >
                    <Grid item xs={6} sx={{p:1 , backgroundColor:"#fff" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , textAlign:"center"}}>
                            <Typography variant='h6'>ยอดคำสั้งซื้อทั้งหมด</Typography>
                     </Grid>
                     <Grid item xs={6} sx={{p:1 , backgroundColor:"#fff" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , textAlign:"center"}}>
                            <Typography variant='h6'>2000</Typography>
                     </Grid>
                </Grid>
                <Divider textAlign="right" sx={{m:2}}>
                    <Chip label="End Order" sx={{fontSize:14}} color="warning" />
                </Divider>
        </Box>
  )
}

export default SecOrderPendding