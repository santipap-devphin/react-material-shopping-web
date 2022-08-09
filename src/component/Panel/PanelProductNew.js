import React , {Fragment , useState , useEffect , useContext} from 'react';
import PropTypes from 'prop-types';
import {Stack , Box , Typography , Button  , Grid , TextField  , InputLabel , MenuItem , FormControl , Select} from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import imgprd from "../../assets/img80.jpg";
import ReplayIcon from '@mui/icons-material/Replay';
import DrafModal from '../Modal/DrafModal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import slipblank from '../../assets/slipblank.jpg'

const PanelProductNew = ({status}) => {

 const [confirmOrder , setConfirmOrder] = useState(false);

  const [cancelOrder , setCancelOrder] = useState(false);

  const [adjust , setAdjust] = useState(false);
  
  const submitAdjust = () => {
    
        alert("submitAdjust");
        setAdjust(false);

  }
  const submitOrder = () => {
        alert("submitOrder");
        setConfirmOrder(false);
  }
  const submitCancel = () => {
         alert("submitCancel");
         setCancelOrder(false);
  }
  const clkAdjust = () => {

    setAdjust(true);
  }
  const clkConfirm = () => {

    setConfirmOrder(true)
  }
  const clkCancle = () => {

    setCancelOrder(true)
  }
    
  return ( <Fragment>
                <Box className='fontKanit' sx={{backgroundColor:"#030f27" , color:"#dfb163"  , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                        <Grid container>
                                <Grid item xs={4} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2}>
                                        <Stack direction="row">
                                        <StorefrontIcon sx={{fontSize:32 , color:"#dfb163" , mr:0.5}} /> <Typography variant='h6' sx={{color:"#ffffff"}}>สินค้าที่สั้งซื้อ</Typography>
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
                                                <Stack direction="row" sx={{p:1}} className="fontKanit">
                                                    <img src={imgprd} style={{width:"20%"}} alt="รูปภาพ text"/>   
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
                    <Box className='fontKanit' sx={{backgroundColor:"#f5f0e0" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , color:"#000"}}>
                            
                            <Grid container>
                                    <Grid item xs={4} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                            <Stack direction="row">
                                                 <Typography variant='p'>ข้อความจากผู้ซื้อ ระวังของแตก</Typography>
                                            </Stack>

                                        </Stack>
                                    </Grid>
                                    
                            </Grid>
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ค่าส่ง (ส่งธรรมดา ไปรษณีย์ไทย)</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>45</Typography>
                                </Grid>
                            </Grid>
                           
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ส่วนลด</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>100</Typography>
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
                            {
                                status === "neworder" ?
                                <Stack sx={{pt:2, pb:2}}>
                                     <Typography>สถานะ รอโอนเงิน (ต้องมาเช็คว่าโอนเงินหรือยัง ถ้ายังไม่โอนจะไม่มีสลิปขึ้น)</Typography>
                                     <img src={slipblank} alt="blank" style={{maxWidth:300}} />
                                </Stack>
                                :
                                null

                            }
                             
                    </Box>
                    <Stack direction="row" sx={{mt:2}} spacing={2}> 
                         {
                            status === "neworder" ?
                              <><Button variant="contained" color="warning" onClick={clkConfirm}><CheckCircleOutlineIcon />ยืนยันรายการ</Button>
                                <Button variant="contained" color="error" onClick={clkCancle}><HighlightOffIcon />ยกเลิกรายการ</Button>
                              </> :
                                status === "complete" ?
                                    <Button variant="contained" color="info" onClick={clkAdjust}><ReplayIcon />แก้ไข</Button>
                                : null
                         }
                         
                     </Stack>
                     <DrafModal open={adjust} setOpen={setAdjust} txthead ={"แก้ไขรายการ รอการจัดส่ง"} handleConfirm={submitAdjust}>
                        
                            <TextField 
                                id="filled-basic" 
                                label="เหตุผลที่แก้ไข" 
                                variant="filled"
                                rows={2}
                                multiline
                                fullWidth
                                 />
                                <Typography sx={{color:"red"}}>*** หมายเหตุ หากทำการแก้ไข สถานะสินค้าจะเปลื่ยนเป็นยกเลิก</Typography>
                               

                    </DrafModal>
                    <DrafModal open={confirmOrder} setOpen={setConfirmOrder} txthead ={"ยืนยันการตรวจสอบรายการ"} handleConfirm={submitOrder}>
                        
                            
                                <Typography sx={{color:"red"}}>*** หมายเหตุ หากยืนยัน Order สถานะจะเปลื่ยนเป็น รอจัดส่ง</Typography>
                               

                    </DrafModal>
                    <DrafModal open={cancelOrder} setOpen={setCancelOrder} txthead ={"ยกเลิกรายการสินค้า"} handleConfirm={submitCancel}>
                        
                            <TextField 
                                id="filled-basic" 
                                label="เหตุผลยกเลิก" 
                                variant="filled"
                                rows={2}
                                multiline
                                fullWidth
                                 />
                                <Typography sx={{color:"red"}}>*** หมายเหตุ หากยกเลิก Order สถานะจะเปลื่ยนเป็น ยกเลิก</Typography>
                               

                    </DrafModal>

            </Fragment>
    )
}
export default PanelProductNew