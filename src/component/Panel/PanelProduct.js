import React , {Fragment , useState} from 'react';
import PropTypes from 'prop-types';
import {Stack , Box , Typography , Button  , Grid , TextField} from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReplayIcon from '@mui/icons-material/Replay';
import DrafModal from '../Modal/DrafModal';
import DrafDialog from '../Dialog/DrafDialog';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import slipblank from '../../assets/slipblank.jpg'
import endpoint from '../../api/endpoint';



const PanelProduct = ({items , status , statusChk}) => {

  
  const [confirmOrder , setConfirmOrder] = useState(false);
  const [cancelOrder , setCancelOrder] = useState(false);
  const [adjust , setAdjust] = useState(false);
  const [addShip, setAddShip] = useState(false);
  const [ship , setShip] = useState('');
  
  const submitAdjust = () => {
    
        alert("submitAdjust");
        setAdjust(false);

  }
  const submitOrder =  async (id) => {

        try {
            const response = await endpoint.put("/checkout/updatepayment" , {orderID : id})
            if(response.data.code === 1){

                setConfirmOrder(false);
                statusChk(true)
            }
            
        } catch (error) {
            console.error(error)
        }
      
  }
  const submitCancel = () => {
         alert("submitCancel");
         setCancelOrder(false);
  }
  const submitShipping = async (id) => {

     try {
        const response = await endpoint.post("/checkout/addshipping" , {id , shipno:ship})
        if(response.data.code === 1){

            statusChk(true);
            setAddShip(false);

        }
        
     } catch (error) {
        console.error(error)
     }
     console.log(ship)
    

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
  const openShip = () => {

    setAddShip(true)

  }

  //console.log(items)
    
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

                        {
                            items.prdOrder.length > 0 ?
                                items.prdOrder.map((item , index) => {
                                    
                                    return (<Grid key={index} container>
                                                <Grid item xs={4} sx={{pt:1 ,pb:1}}>
                                                    <Stack spacing={2}>
                                                            <Stack direction="row" sx={{p:1}} className="fontKanit">
                                                                <img src={item.prdImage} style={{width:"20%"}} alt="รูปภาพ text"/>   
                                                                <Typography variant='p' sx={{ml:1}}>{item.prdTitle}</Typography>
                                                            </Stack>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                </Grid>
                                                <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                    {item.qty}
                                                </Grid>
                                                <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                    {item.prdPriceLast}
                                                </Grid>
                                                <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                    {Number(item.prdPriceLast) * Number(item.qty) }
                                                </Grid>
                                            </Grid>
                                         )

                                })
                            :"ไม่มีข้อมูล"
                        }
                            
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
                                    <Typography>ราคารวมสินค้า</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>{Number(items.orderSum) + Number(items.coupon.couPrice) - Number(items.deliver.supPrice)}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ค่าส่ง ({items.deliver.supName})</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>{items.deliver.supPrice}</Typography>
                                </Grid>
                            </Grid>
                           
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ส่วนลด</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>{items.coupon.couPrice === 0 ? 0 : "-"+items.coupon.couPrice}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ยอดสุทธิ</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>{items.orderSum}</Typography>
                                </Grid>
                            </Grid>
                            {
                                items.status === "new" && items.notify === true ?
                                <Stack sx={{pt:2, pb:2}}>
                                     <img src={items["imgslip"] === undefined ? slipblank : "http://localhost:7000/"+items["imgslip"]} alt="รูปสลิปโอนเงิน" style={{maxWidth:300}} />
                                </Stack>
                                : null
                               

                            }
                             
                    </Box>
                    <Stack direction="row" sx={{mt:2}} spacing={2}> 
                         {
                            status === "new" && items.notify === true  ?
                              <><Button variant="contained" color="warning" onClick={clkConfirm}><CheckCircleOutlineIcon />ตรวจสอบรายการถูกต้อง</Button>
                                <Button variant="contained" color="error" onClick={clkCancle}><HighlightOffIcon />ยกเลิกรายการ</Button>
                              </> 
                                : status === "pending" ?
                                     <Button variant="contained" color="success" onClick={openShip}><CheckCircleOutlineIcon />เพิ่มเลขพัสดุ</Button>
                                     :
                                        status === "close" ?
                                            <Button variant="contained" color="info" onClick={clkAdjust}><ReplayIcon />แก้ไข</Button>
                                        :
                                null
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
                    <DrafModal open={confirmOrder} setOpen={setConfirmOrder} txthead ={"ยืนยันการตรวจสอบรายการ"} handleConfirm={() => submitOrder(items.orderID)}>
                        
                            
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
                    <DrafDialog open={addShip} setOpen={setAddShip} title = {"เพิ่มหมายเลขพัศดุ"} confirm={() => submitShipping(items.orderID)}>
                        
                        <TextField 
                            id="shippingNo" 
                            label="หมายเลยพัสดุ" 
                            variant="filled"
                            rows={2}
                            value={ship}
                            onChange={(e) => setShip(e.target.value)}
                            multiline
                            fullWidth
                             />
                            <Typography sx={{color:"red"}}>*** หมายเหตุ หากเพิ่มสถานะพัสดุ สถานะจะเปลื่ยนเป็น จัดส่งเรียบร้อย</Typography>
                           
                </DrafDialog>

            </Fragment>
    )
}

/*PanelProduct.propTypes  = {

    status : null

}*/

export default PanelProduct