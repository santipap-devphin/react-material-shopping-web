import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import SweetAlertCustom from '../SweetAlert/SweetAlertCustom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import endpoint from '../../api/endpoint';

const CardShipping = ({userLogin  , setPrvUrl , listCartProduct ,listCheckout ,setListCheckout , supDefault}) => {

  const [couponTxt , setCouponTxt] = useState('');
  const [validCou , setValidCou] = useState(false);
  const [validTxt , setValidtext] = useState('');
  const [validType , setValidType] = useState('');

  const [couObj , setCouObj] = useState(
          {
            couID : listCheckout !== null ? listCheckout.coupon.couID : "" , 
            couName:listCheckout !== null ? listCheckout.coupon.couName : "", 
            couCode :listCheckout !== null ? listCheckout.coupon.couCode : "" , 
            couPrice:listCheckout !== null ? listCheckout.coupon.couPrice : 0
         });
  let navicate = useNavigate();
  let objChk = {};
  var setStatus = "chklogin";

 const [swalProps, setSwalProps] = useState({
    show: false,
    title: 'กรุณาเข้าสู่ระบบ',
    text: 'หากต้องการเข้าสู่ระบบให้กด Ok',
    icon:"warning",
    showCancelButton: true,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
   });

   const sumProduct = () => {

    let last = 0;

    if (listCartProduct.length > 0){
 
        listCartProduct.forEach(pro => {
 
         last += Number(pro.prdPriceLast) * Number(pro.qty);
         
     
       });
    }
    return last;

  }

  const conFirmCheckout = () => {

    
     if(userLogin === null){

        //console.log("okkoko");
        setPrvUrl('cart');
        setSwalProps({...swalProps , show:true })
        
     }
     else {

       objChk["userID"] = userLogin.id;
       objChk["prdOrder"] = listCartProduct;
       objChk["coupon"] = couObj; 
       objChk["deliver"] = supDefault; 
       objChk["orderSum"] = sumTotal; 
       objChk["etc"] = ""; 
       
       setListCheckout(objChk);

       setTimeout(function() {navicate("/checkout")}, 1000);
        
     }
  }
 const useCoupon = async () => {

    if(couponTxt !== ""){

        try {

          const response = await endpoint.get(`/coupon/chk/${couponTxt}`);
          if(response.data.code === 1){

             setCouObj({...couObj , couID : response.data.list.id, couName:response.data.list.namecoupon, couCode :response.data.list.codecoupon , couPrice:response.data.list.detailcoupon })
          }else if(response.data.code === 6){

            setValidtext('ไม่พบคูปอง');
            setValidType('warning');
            setValidCou(true);
            setTimeout(function() {setValidCou(false);}, 3000);

          }
          else if(response.data.code === 7){

            setValidtext('คูปองหมดอายุ');
            setValidType('warning');
            setValidCou(true);
            setTimeout(function() {setValidCou(false);}, 3000);

          }
          else if(response.data.code === 8){

            setValidtext('คูปองหมดแล้ว');
            setValidType('warning');
            setValidCou(true);
            setTimeout(function() {setValidCou(false);}, 3000);

          }
          
          
        } catch (error) {
          
            console.error(error);
        }


    }else{

      setValidtext('กรุณากรอก หมายเลขคูปอง');
      setValidType('error');
      setValidCou(true);
      setTimeout(function() {setValidCou(false);}, 3000);

      
    }

}

const delCou = () => {

  setCouponTxt('');
  setCouObj({...couObj ,couID : "", couName:"", couCode :"" , couPrice:0 });
  
 }
 let sumTotal = 0;
 return (
    <Container>
                    <Grid container spacing={4} sx={{mt:1 , mb:0}}>
                        <Grid item xs={12} sm={6} lg={6} xl={6}>
                            <Card sx={{backgroundColor:"#f9f9f9" ,pb:2 , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                                <CardContent>
                                  <Divider textAlign="left" sx={{ fontSize: 24 }}> ใช้คูปอง</Divider>
                                  <Typography sx={{ mt: 1 , mb:1 }} color="text.secondary">
                                        หากมีคูปองกรุณาระบุ (ถ้ามี)
                                   </Typography>
                                   {
                                    validCou ? <Alert severity={validType}>{validTxt}</Alert> : null
                                   }
                                   
                                  <FormControl sx={{ mt:3}} fullWidth>
                                     
                                      <TextField
                                       label="หมายเลขคูปอง" variant="outlined"
                                       value={couponTxt}
                                      onChange={(e) => setCouponTxt(e.target.value)}
                                      />
                                    </FormControl>
                                </CardContent>
                                <CardActions>
                                <Button variant="contained" fullWidth onClick={useCoupon}>ใช้คูปอง</Button>
                              
                                </CardActions>
                              </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} xl={6} sx={{mb:10}}>

                              <Card sx={{transitionDuration: '0.3s', backgroundColor:"#f9f9f9" ,pb:2 ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                                  <CardContent>
                                    <Divider textAlign="left" sx={{ fontSize: 24 }}>ราคารวม</Divider>
                                    <Grid container justify="flex-start" spacing={1} sx={{mt:3}}>
                                        <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-start">
                                              <Typography color="text.secondary">
                                                    ราคารวมสินค้า
                                              </Typography>
                                            </Box>
                                      </Grid>
                                      <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography color="text.secondary">
                                                    {sumProduct()}
                                                </Typography>
                                            </Box>
                                      </Grid>
                                  </Grid>
                                  {
                                      couObj.couPrice !==0 ? 
                                        <Grid container justify="flex-end" spacing={1} sx={{mt:3}}>
                                          <Grid item sm={6}>
                                            
                                              <Box display="flex" justifyContent="flex-start">
                                                <Typography color="text.secondary">
                                                   คุปอง  ({couObj.couName})
                                                 </Typography>
                                                
                                                  <DeleteForeverIcon className='cursorpointer' onClick={delCou} sx={{color:"red"}}/>
                                                 
                                              </Box>
                                        </Grid>
                                        <Grid item sm={6}>
                                              <Box display="flex" justifyContent="flex-end">
                                                  <Typography color="text.secondary">
                                                   - {couObj.couPrice}
                                                  </Typography>
                                             </Box>
                                        </Grid>
                                    </Grid>
                                   :null

                                  }
                                  
                                  
                                  <Grid container justify="flex-end" spacing={1} sx={{mt:3}}>
                                        <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-start">
                                              <Typography color="text.secondary">
                                                {
                                                     Object.keys(supDefault).length > 0 ? 
                                                     `ค่าจัดส่ง ( ${supDefault.supName} )`
                                                     :null
                                                }
                                                    
                                              </Typography>
                                            </Box>
                                      </Grid>
                                      <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography color="text.secondary">
                                                 {
                                                      Object.keys(supDefault).length > 0 ? 
                                                      supDefault.supPrice
                                                      :null
                                                 }
                                                </Typography>
                                            </Box>
                                      </Grid>
                                  </Grid>
                                 <Grid container justify="flex-end" spacing={1} sx={{mt:3}}>
                                        <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-start">
                                              <Typography color="text.secondary">
                                                    ราคารวมทั้งหมด
                                              </Typography>
                                            </Box>
                                      </Grid>
                                      <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography color="text.secondary">
                                                    {
                                                          Object.keys(supDefault).length > 0 ? 
                                                          sumTotal = (Number(sumProduct()) + supDefault.supPrice) - Number(couObj.couPrice)
                                                          :null
                                                    }
                                                   
                                                </Typography>
                                            </Box>
                                      </Grid>
                                  </Grid>
                                </CardContent>
                                  <CardActions>
                                      <Button variant="contained" fullWidth onClick={conFirmCheckout}>ยืนยันสั้งซื้อสินค้า</Button>
                                  </CardActions>
                            </Card>

                        </Grid>
                       <SweetAlertCustom swalProps={swalProps} setSwalProps={setSwalProps} setStatus={setStatus}  />
                      </Grid> 

                 </Container>
  )
}

export default CardShipping