import React , {Fragment , useState } from 'react';
import {Stack , Box , Typography , Button  , Grid   } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DrafDialog from '../Dialog/DrafDialog';
import endpoint from '../../api/endpoint';
const PanelPayment = ({listCheckout , setListCheckout , setListCartProduct , setStatusSuccess , addrText}) => {

  const [openModal , setOpenModal] = useState(false);
  const openChk = () => {

    setOpenModal(true)
  }
  const sumProduct = () => {

    let last = 0;

   if ('prdOrder' in listCheckout){

      listCheckout.prdOrder.forEach(pro => {

        last += Number(pro.prdPriceLast) * Number(pro.qty);
       
     });

      return last
   }

  }
  const confirmCheckOut = async() => {
    
     if(Object.keys(addrText).length === 0){
        setOpenModal(false); 
        return alert("กรุณาเพิ่มที่อยู่ในการจัดส่ง");
     }

     try {
        const response = await endpoint.post("/checkout/add" , JSON.stringify(listCheckout) , {headers: {
            'Content-Type': 'application/json'
        }})
        if(response.data.code === 1){

            setOpenModal(false);
            setStatusSuccess(true);
            setListCheckout(null);
            setListCartProduct([]);
            setTimeout(function() { window.location = "/orders" }, 5000);


        }
     } catch (error) {
        console.error(error)
     }  
     

  }
    
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
                                        <Typography variant='p' sx={{color:"#fff"}}>โอนเข้าบัญชี</Typography>
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
                                        <Typography>{sumProduct()}</Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ค่าจัดส่ง:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>{listCheckout !== null ? listCheckout.deliver.supPrice : null}</Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ส่วนลด:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>-{listCheckout !== null ? listCheckout.coupon.couPrice : null}</Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#e6f4f6" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ยอดรวมทั้งหมด:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>{listCheckout !== null ? listCheckout.orderSum : null}</Typography>
                                </Grid>
                        </Grid>
            </Box>
                    <Grid container sx={{mt:1}}>
                                <Grid item xs={12} sx={{pt:1 ,pb:3}} textAlign="right">
                                            <Button variant="contained" sx={{width:250}} onClick={openChk}><PriceCheckIcon/> ยืนยันการสั้งซื้อสินค้า</Button>
                                </Grid>
                    </Grid>
                    <DrafDialog open={openModal} setOpen={setOpenModal} title={"ยืนยันการสั้งซื้อ"}  confirm={() => confirmCheckOut()}>
                        <Typography component="div"> หากต้องการสั้งซื้อให้กดยืนยัน</Typography>
                    </DrafDialog>
       </Fragment>
  )
}

export default PanelPayment