import React , {useState} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid , Button , TextField , FormGroup , FormControlLabel , Switch , InputLabel , MenuItem , FormControl , Select, Stack  , Alert , AlertTitle} from '@mui/material';
import imgdefault from "../../assets/noimg.jpg";
import ImageIcon from '@mui/icons-material/Image';
import endpoint from '../../api/endpoint';
const FrmPaymentAdd = () => {

  const [typePayment , setTypePayment] = useState('');
  const [bank , setBank] = useState('');
  const [bankNum , setBankNum] = useState('');
  const [bankName , setBankName] = useState('');
  const [promptPayName , setPromptPayName] = useState('');
  const [promptPayNum , setPromptPayNum] = useState('');
  const [chkSwitch , setchkSwitch] = useState(true); 
  const [imgData , setImgData]= useState('');
  const [imgQrcode , setImgQrcode]= useState('');
  const [validFrm , setValidFrm] = useState(false);
  const [callSuccess , setCallSuccess] = useState(false);
  let navicate = useNavigate();
  var listBank = [
    {
       id:1 , bankname:"ธนาคาร กสิกรไทย" , bankcode:"KBANK"
    }
   ,{
       id:2 , bankname:"ธนาคาร กรุงเทพ" , bankcode:"BBL"
    }
   ,{
       id:3 , bankname:"ธนาคาร กรุงไทย" , bankcode:"KTB"
    }
   ,{
       id:4 , bankname:"ธนาคาร ไทยพาณิชย์" , bankcode:"KTB"
    }
   ,{
       id:5 , bankname:"ธนาคาร กรุงศรี" , bankcode:"BAY"
    }
    ,{
       id:6 , bankname:"ธนาคาร ทหารไทย" , bankcode:"TMB"
    }
  ]
  const changeType = (e) => {

    setTypePayment(e.target.value);

  }
  const changeBank = (e) => {

    setBank(e.target.value)

  }
  const submitPayment =  async (e) => {
    e.preventDefault();

    var obj = typePayment === "bank" ? 
      {typepayment:typePayment , bank:bank ,banknum:bankNum , bankname: bankName ,status:chkSwitch, imgqrcode: imgQrcode} 
    : {typepayment:typePayment , promptpaynum:promptPayNum ,promptpayname:promptPayName ,status:chkSwitch, imgqrcode: imgQrcode}
   
    if(typePayment !== ""){

        try {
            const response = await endpoint.post("payment" , obj );
            console.log(response)
            if(response.data.code === 1){

                setTypePayment('');
                setBank('');
                setBankNum('');
                setBankName('');
                setPromptPayName('');
                setPromptPayNum('');
                setchkSwitch(true)
                setImgData('');
                setImgQrcode('');
                setCallSuccess(true);
                setTimeout(function() {setCallSuccess(false)}, 2500);
                setTimeout(function() {navicate("/backend/payment")}, 3000);

            }
            
        } catch (error) {
            console.error(error)
        }
        


    }else{

        setValidFrm(true);
        setTimeout(function() {setValidFrm(false)}, 3500);


    }
    



  }
  const changeSwitch = () => {

    setchkSwitch(!chkSwitch)

  }

  const changeImg = async(e) => {
    
    const file = e.target.files[0];
    var reader = new FileReader();

     reader.onloadend = () => {

        setImgData(reader.result)

     }

     reader.readAsDataURL(file);

     if(file !== null){

        var formdata = new FormData();

        formdata.append("file", file);

        try {
            const response = await endpoint.post("/upload" , formdata ,  {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});

                if(response.status === 200 && response.statusText === "OK"){

                    var newpath = response.data.destination + response.data.filename;

                    if(newpath.indexOf("public/") > -1){

                        var sp = newpath.split("public/");
                        //console.log(sp[1])
                        setImgQrcode(sp[1])
                    }else{
                        setImgQrcode(newpath)
                    }
                   
                    
    
                }

            
        } catch (error) {
            console.error(error)
        }

     }


  }

  return (<>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/payment"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                <form style={{width:"100%"}} onSubmit={submitPayment}>
                {
                  validFrm ? <Alert severity="error" sx={{m:2}}>กรุณากรอกข้อมูล</Alert> : null
                }
                {
                    callSuccess ? 

                     <Alert severity="success" sx={{m:2}}>
                     <AlertTitle>เพิ่มข้อมูลเสร็จสิ้น</AlertTitle>
                     <strong>ระบบได้เพิ่มหมวดหมู่เรียบร้อยแล้ว </strong>
                    </Alert>
                    :null
                }
                <Grid item xs={12} sx={{p:2}}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel id="demo-simple-select-filled-label">ชนิดการชำระเงิน</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={typePayment}
                        onChange={changeType}
                        
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                            <MenuItem value={'bank'}>บัญชีธนาคาร</MenuItem>
                            <MenuItem value={'promptpay'}>พร้อมเพย์</MenuItem>
                            <MenuItem value={'etc'}>อื่น</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>
            
                <Grid item xs={12} sx={{pr:2 , pl:2}}>
                        {
                            typePayment === "bank" ? 
                            
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-filled-label">เลือกธนาคาร</InputLabel>
                                <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={bank}
                                onChange={changeBank}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                    {
                                        listBank.map((name , index) => {

                                            return (<MenuItem key={index} value={name.bankcode}>{name.bankname}</MenuItem>)

                                        })
                                    }
                              </Select>
                              <TextField id="filled-basic" label="หมายเลข บัญชีธนาคาร" 
                                variant="filled" 
                                value={bankNum} 
                                onChange={(e) => setBankNum(e.target.value)} 
                                fullWidth 
                                sx={{mt:2}}/>
                            <TextField id="filled-basic" label="ชื่อบัญชีธนาคาร" 
                                variant="filled" 
                                value={bankName} 
                                onChange={(e) => setBankName(e.target.value)} 
                                fullWidth 
                                sx={{mt:2}}/>
                            </FormControl>
                            :
                            typePayment !== "" ?
                            <FormControl fullWidth>
                                <TextField id="filled-basic" label="หมายเลข พร้อมเพย์" variant="filled" value={promptPayNum} onChange={(e) => setPromptPayNum(e.target.value)}  fullWidth/>
                                <TextField id="filled-basic" label="ชื่อ พร้อมเพย์" variant="filled" value={promptPayName} onChange={(e) => setPromptPayName(e.target.value)} sx={{mt:2}} fullWidth/>
                             </FormControl> 
                             : null
                        }
                        
                </Grid>
                {
                    typePayment !== "" ? 
                    <>
                    <Grid item xs={12} sx={{p:2}}>
                            <Button
                            variant="contained"
                            component="label"
                            size="small"
                            color="primary"
                            sx={{mt:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                            >
                                        <ImageIcon/>
                                        <input
                                        type="file"
                                        hidden
                                        onChange={changeImg}
                                        />
                                    อัพโหลด QRCODE
                            </Button>
                            
                        </Grid>
                        <Grid item xs={12} sx={{p:2}}>
                            <Stack>
                                รูป QRCODE สำหรับชำระเงิน
                                {
                                    imgData !== '' ? <img src={imgData} style={{maxWidth:"30%"}} alt="รูปภาพสำหรับจ่ายเงิน" /> : <img src={imgdefault} style={{maxWidth:"30%"}} alt="รูปภาพ default payment" />
                                }
                               
                            </Stack>
                            
                        </Grid>
                        <Grid item xs={12} sx={{p:2}}>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={chkSwitch} onChange={changeSwitch} />} label="สถานะเปิดใช้" />
                            </FormGroup>
                        </Grid>
                    </>
                    :null
                }
                <Grid item xs={12} sx={{p:2}}>
                        <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                        <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
                </form>
            </Grid>
          </>
  )
}

export default FrmPaymentAdd