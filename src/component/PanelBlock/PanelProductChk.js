import React , {Fragment , useState , useEffect , useContext} from 'react';
import {Stack , Box , Typography , Button  , Grid , TextField } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
const PanelProductChk = () => {
  return (  <Fragment>
                <Box sx={{backgroundColor:"#030f27" , color:"#dfb163"  , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                        <Grid container>
                                <Grid item xs={4} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2}>
                                        <Stack direction="row">
                                        <StorefrontIcon sx={{fontSize:32 , color:"#dfb163" , mr:0.5}} /> <Typography variant='h6'>สินค้าที่สั้งซื้อ</Typography>
                                        </Stack>

                                    </Stack>

                                </Grid>
                                <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">

                                    

                                </Grid>
                                <Grid item xs={2} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography variant='p'>ราคาต่อหน่วย</Typography>
                                </Grid>
                                <Grid item xs={2} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography variant='p'>จำนวน</Typography>
                                 </Grid>
                                <Grid item xs={2} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography variant='p'>รวม</Typography>
                                </Grid>
                        </Grid>  
                    </Box>
                    <Box sx={{backgroundColor:"#f5f0e0" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , color:"#000"}}>
                        <Grid container>
                                    <Grid item xs={4} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                                <Stack direction="row" sx={{p:1}}>
                                                    <img src="../../assets/img/img80.jpg" style={{width:"20%"}} alt="รูปภาพ text"/>   
                                                    <Typography variant='p' sx={{ml:1}}>ถ้วย ชาม ราเมน ชามบะหมี่ ชามเซรามิค สไตล์ญี่ปุ่น จานทวิตลายจุด</Typography>
                                                </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                        
                                    </Grid>
                                    <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                        1
                                    </Grid>
                                    <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                        255
                                    </Grid>
                                    <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                        255
                                    </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{backgroundColor:"#f5f0e0" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , color:"#000"}}>
                            
                            <Grid container>
                                    <Grid item xs={4} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                            <Stack direction="row">
                                                 <TextField id="filled-basic" label="ฝากข้อความถึงผู้ขาย" variant="filled" size='small' sx={{ml:2 ,mr:2}} fullWidth/>
                                            </Stack>

                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2} sx={{pt:1 ,pb:1}}>
                                        <Typography variant='p' sx={{fontSize:18}}>บริษัทขนส่ง</Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                                <Typography>Standard Delivery - ส่งธรรมดาในประเทศ</Typography>
                                                <Typography>จะได้รับในวันที่ 30 พ.ค. - 1 มิ.ย.</Typography>
                                        </Stack>

                                    </Grid>
                                    <Grid item xs={3} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                                 <Stack direction="row" justifyContent="center" spacing={6}>
                                                    <Button variant="outlined" color="warning">เปลื่ยน</Button>
                                                    <Typography>45</Typography>
                                                 </Stack>
                                         </Stack>
                                    </Grid>
                            </Grid>
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ยอดสั้งซื้อทั้งหมด</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                     <Typography>xxxxx</Typography>
                                </Grid>
                            </Grid>
                    </Box>
            </Fragment>
  )
}

export default PanelProductChk