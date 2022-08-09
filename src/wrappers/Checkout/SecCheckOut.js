import React , {useContext , useState} from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import PanelAddress from '../../component/PanelBlock/PanelAddress';
import PanelProductChk from '../../component/PanelBlock/PanelProductChk';
import PanelCoupon from '../../component/PanelBlock/PanelCoupon';
import PanelPayment from '../../component/PanelBlock/PanelPayment';
import DataContext from '../../context/DataContext';

const SecCheckOut = () => {

  const {userLogin , listCheckout , setListCheckout , setListCartProduct} = useContext(DataContext);
  const [statusSuccess , setStatusSuccess] = useState(false);
  const [addrText , setAddrText] = useState({}); 

  //console.log(listCheckout)
 return (
         <>
            {
              statusSuccess ? 
              <Stack sx={{ width: '100%' , p:5 }} spacing={2}>
                <Alert severity="success" sx={{fontSize:24}}>
                    <AlertTitle>สั้งซื้อสินค้าเรียบร้อย</AlertTitle>
                      ขอขอบคุณที่สั้งซื้อสินค้ากับเรา  <strong> รอการจัดส่งไม่เกิน 3 วัน</strong>
                     </Alert>
              </Stack>
              :
              listCheckout === undefined || listCheckout === null ?
              <div style={{paddingBottom:20}}>
                <Box
                sx={{backgroundColor:"#fff",boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"
                ,mt:2,
                ml:1.2,
                mr:1.2,
                
               }}
                >
                    <Grid container>
                            <Grid item xs={12}>
                                    <Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูลการสั้งซื้อ</Typography>
                            </Grid>
                    </Grid>
                </Box>
              </div>
              :
              Object.keys(listCheckout).length > 0 && userLogin !== null ? 
                <>
                  
                  <PanelAddress userID = {listCheckout.userID} addrText={addrText} setAddrText={setAddrText} />
                  <PanelProductChk listCheckout={listCheckout} setListCheckout={setListCheckout}/>
                  <PanelCoupon coupon = {listCheckout.coupon}/>
                  <PanelPayment listCheckout={listCheckout} setListCheckout={setListCheckout} setListCartProduct={setListCartProduct} setStatusSuccess={setStatusSuccess} addrText={addrText} />
                </>
                :
               
              <div style={{paddingBottom:20}}>
                <Box
                sx={{backgroundColor:"#fff",boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"
                ,mt:2,
                ml:1.2,
                mr:1.2,
                
               }}
                >
                    <Grid container>
                            <Grid item xs={12}>
                                    <Typography variant='h6' sx={{p:2}}>{userLogin === null ? "กรุณาเข้าสู่ระบบ" : "ไม่มีข้อมูล"}</Typography>
                            </Grid>
                    </Grid>
                </Box>
              </div>
            
            }
           
         </>
         
  )
}

export default SecCheckOut