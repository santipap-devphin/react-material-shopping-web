import React , {useState , useRef} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid , Button , TextField , FormGroup , FormControlLabel , Switch , Alert , AlertTitle} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import endpoint from '../../api/endpoint';

const FrmAddCoupon = () => {
 
  const addZero = (date) => {
        let data;
        if(date < 10){
             data = "0"+date;
        }else{
            data = date;
        }
        return data;
  }
  var myRef = useRef();
  var dates = new Date();
  var year  = dates.getFullYear();
  var months = addZero(parseInt(dates.getMonth())+1);
  var days =   addZero(dates.getDate());
  var current_date = year+"-"+months+"-"+days;
  const [sDate, setsDate] = useState(new Date(current_date));
  const [eDate, seteDate] = useState(new Date(current_date));
  const [nameCou , setNameCou] = useState('');
  const [codeCou , setCodeCou] = useState('');
  const [detailCou , setDetailCou] = useState('');
  const [limitCou , setLimitCou] = useState('');
  const [validFrm , setValidFrm] = useState(false);
  const [callSuccess , setCallSuccess] = useState(false);
  const [chkSwitch , setchkSwitch] = useState(true); 
  let navicate = useNavigate();
 const handleChangeSDate = (newValue) => {
        setsDate(newValue);
  };
  const handleChangeEDate = (newValue) => {
        seteDate(newValue);
  };
 const frmSubmit = async (e)=> {

        e.preventDefault();
        
        if(nameCou && codeCou && limitCou){

            try {

                const response = await endpoint.post("/coupon" , {namecoupon:nameCou , codecoupon:codeCou , detailcoupon:detailCou , status:chkSwitch , limitcoupon:limitCou , sdate:sDate , edate:eDate});
                if(response.data.code === 1){

                    setNameCou('')
                    setCodeCou('')
                    setDetailCou('')
                    setLimitCou('')
                    setsDate(new Date(current_date))
                    seteDate(new Date(current_date))
                    setchkSwitch(true)
                    window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
                    setCallSuccess(true);
                    setTimeout(function() {setCallSuccess(false)}, 2500);
                    setTimeout(function() {navicate("/backend/coupon")}, 3000);
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
    
    setchkSwitch(!chkSwitch);

 }

  return ( <>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/coupon"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <div ref={myRef}></div>
            <form onSubmit={frmSubmit} style={{width:"100%"}}>
            <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                 
                {
                    validFrm ? <Alert severity="error" sx={{m:2,width:"100%"}} >กรุณากรอกข้อมูลให้ครบถ้วน</Alert> : null
                }
                {
                    callSuccess ? 

                     <Alert severity="success" sx={{m:2,width:"100%"}}>
                     <AlertTitle>เพิ่มข้อมูลเสร็จสิ้น</AlertTitle>
                     <strong>ระบบได้เพิ่มหมวดหมู่เรียบร้อยแล้ว </strong>
                    </Alert>
                    :null
                }
                <Grid item xs={12} sx={{p:2}}>
                        <TextField 
                            id="namecoupon" 
                            label="ชื่อคูปอง" 
                            variant="filled" 
                            value={nameCou} 
                            onChange={(e) => setNameCou(e.target.value)} 
                            fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <TextField 
                            id="codecoupon" 
                            label="รหัสคูปอง" 
                            variant="filled" 
                            value={codeCou}
                            onChange={(e) => setCodeCou(e.target.value)} 
                            fullWidth/>
                </Grid>
                <Grid item xs={6} sx={{p:2}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="วันที่เริ่มใช้"
                                inputFormat="MM/dd/yyyy"
                                value={sDate}
                                onChange={handleChangeSDate}
                                renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
                            />
                        </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{p:2}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="วันที่หมดอายุ"
                                inputFormat="MM/dd/yyyy"
                                value={eDate}
                                onChange={handleChangeEDate}
                                renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
                            />
                        </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <TextField 
                            id="detailcoupon"
                            label="รายละเอียดคูปอง" 
                            variant="filled" 
                            value={detailCou}
                            onChange={(e) => setDetailCou(e.target.value)} 
                            fullWidth />
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <TextField 
                            id="filled-basic" 
                            label="จำนวนคูปอง" 
                            variant="filled" 
                            value={limitCou}
                            onChange={(e) => setLimitCou(e.target.value)} 
                            fullWidth />
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={chkSwitch} onChange={changeSwitch} />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                        <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
               
            </Grid>
            </form>
        </>
        )

 
}

export default FrmAddCoupon