import React , {Fragment , useState , useEffect , useContext} from 'react';
import {Stack , Box , Typography , Button  , Grid , Chip , Dialog ,DialogActions , DialogContent , DialogContentText , DialogTitle} from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
const PanelPayment = () => {
  return (
    <Fragment>
            <Box sx={{ mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                    <Grid container sx={{backgroundColor:"#030f27"}}>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2} sx={{color:"#dfb163"}}>
                                    <Stack direction="row">
                                    <PaidIcon sx={{fontSize:30 , color:"#dfb163" , mr:0.3}} /> <Typography variant='h6'>วิธีการชำระเงิน</Typography>
                                    </Stack>

                                </Stack>

                            </Grid>
                            <Grid item xs={6} >
                                <Grid container>
                                    <Grid item xs={9} textAlign="right" sx={{mt:1.5}}>
                                        <Typography variant='p' sx={{color:"#fff"}}>เก็บเงินปลายทาง</Typography>
                                    </Grid>
                                    <Grid item xs={3} textAlign="right" sx={{mt:0.5}}>
                                         <Button variant="text"  sx={{mr:1}}>เปลื่ยน</Button>        
                                    </Grid>
                                </Grid>
                               
                            </Grid>
                    </Grid>
                    
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ยอดรวมสินค้า:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>฿44</Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>รวมการจัดส่ง:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>฿45</Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ยอดรวมทั้งหมด:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>฿80</Typography>
                                </Grid>
                        </Grid>
            </Box>
                    <Grid container sx={{mt:1}}>
                                <Grid item xs={12} sx={{pt:1 ,pb:3}} textAlign="right">
                                            <Button variant="contained" sx={{width:250}}><PriceCheckIcon/> ยืนยันการสั้งซื้อสินค้า</Button>
                                </Grid>
                    </Grid>
       </Fragment>
  )
}

export default PanelPayment