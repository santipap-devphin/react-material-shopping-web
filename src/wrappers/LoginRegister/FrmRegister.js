import React , {useState , useEffect} from 'react';
import { Stack , Box , TextField , IconButton , InputAdornment , Button  , Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import endpoint from '../../api/endpoint';
import SweetAlertCustom from '../../component/SweetAlert/SweetAlertCustom';

const FrmRegister = ({setValue}) => {

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

    const [swalProps, setSwalProps] = useState({});
    

    const [txtUser , setTxtUser] = useState('');
    const [txtPass , setTxtPass] = useState('');
    const [txtConfirmPass , setTxtConfirmPass] = useState('');
    const [txtEmail , settxtEmail] = useState('');

    const [statusRegister , setStatusRegister] = useState(false);

    const [validUser , setValidUser] = useState(false);
    const [validPass , setValidPass] = useState(false);
    const [validEmail , setValidEmail] = useState(false);
    const [validConPass , setValidConPass] = useState(false);

    const [clkShowPass , setClkShowPass] = useState(false);
    const [clkShowConPass , setClkShowConPass] = useState(false);

    const onSubmitRegister = async (e) => {
            e.preventDefault();
            setStatusRegister(false);
            if(txtUser && txtPass && txtConfirmPass && txtEmail){

                console.log(txtUser , txtPass)
                const response = await endpoint.post("/userregister" , {username:txtUser , password:txtPass , email:txtEmail});

                if(response.data.code === 1){

                    setSwalProps({
                        show: true,
                        title: 'สมัครสมาชิกเรียบร้อย',
                        text: 'กรุณาเข้าสู่ระบบ',
                        icon:"success",
                        showCancelButton: false,
                        confirmButtonText:"OK",
                        cancelButtonText:"Cancel"});

                        setTimeout(function(){ setSwalProps({...swalProps , show:false});}, 2000);

                        setTimeout(function(){ setStatusRegister(true);}, 2500);
                        
                    
                }
                else if(response.data.code === 2){

                    setSwalProps({
                        show: true,
                        title: 'Username นี้มีข้อมูลในระบบแล้ว',
                        text: 'กรุณาเปลื่ยนชื่อ Username',
                        icon:"warning",
                        showCancelButton: false,
                        confirmButtonText:"OK",
                        cancelButtonText:"Cancel"
                     });

                     setStatusRegister(false);

                    //setSwalProps({...swalProps , show:true })
                    

                }
                


            }else{
                return;
            }
    }
    const handleClickShowPassword = () => {
             setClkShowPass(!clkShowPass);
    }
    const handleClkConfirmPass = () => {

        setClkShowConPass(!clkShowConPass);

    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setValidUser(USER_REGEX.test(txtUser))
    },[txtUser])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(txtEmail))
    },[txtEmail])

    useEffect(() => {

        setValidPass(PWD_REGEX.test(txtPass))

        if(txtPass !== txtConfirmPass){

            setValidConPass(false)

        }else{
            setValidConPass(true)
        }

    },[txtPass , txtConfirmPass])

    useEffect(() => {

        if(statusRegister){

            setValue(0)
        }
            

    },[statusRegister])

  return (
    <Grid container spacing={2} sx={{mt:1}} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
            <Box className='login-register'>
            <form onSubmit={onSubmitRegister}>
              
                <Stack spacing={2}>

                            <TextField
                            label="ชื่อผู้ใช้"
                            id="txtusername"
                            InputProps={{
                                endAdornment:<InputAdornment position="start">{validUser === false  ? <AccountCircleIcon /> : <CheckCircleIcon sx={{color:"#2e7d32"}} />}</InputAdornment>,
                                
                            }}
                           
                            size="small"
                            onChange={(e) => setTxtUser(e.target.value)}
                            value={txtUser}
                            helperText={validUser === false && txtUser !== '' ? "กรุณากรอก ตัวอักษร ขั้นต่ำ 4 ตัว และ ไม่เกิน 24 ตัว ชื่อ Username ต้องเป็น ภาษาอังกฤษเท่านั้น" : null}
                            error={validUser === false && txtUser !== '' ? true : false}
                            required
                            />
                            <TextField
                            type="email"
                            label="อีเมล์"
                            id="txtemail"
                            InputProps={{
                                endAdornment:<InputAdornment position="start">{validEmail === false  ? <EmailIcon /> : <CheckCircleIcon sx={{color:"#2e7d32"}} />}</InputAdornment>,
                                
                            }}
                           
                            size="small"
                            onChange={(e) => settxtEmail(e.target.value)}
                            value={txtEmail}
                            helperText={validEmail === false && txtEmail !== '' ? "กรุณากรอก อีเมล์" : null}
                            error={validEmail === false && txtEmail !== '' ? true : false}
                            required
                            />
                            <TextField
                            type={clkShowPass ? "text" : "password"}
                            label="รหัสผ่าน"
                            id="txtpassword"
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {clkShowPass ? <VisibilityOff/> : <Visibility />}
                                        </IconButton>
                                        {validPass ? <CheckCircleIcon sx={{color:"#2e7d32"}} /> : null}
                                </InputAdornment>,
                            }}
                            variant="outlined"
                            size="small"
                            onChange={(e) => setTxtPass(e.target.value)}
                            value={txtPass}
                            helperText = { validPass === false && txtPass !== '' ? "กรุณากรอกตัวอักษรขั้นต่ำ 8 ตัว ไม่เกิน 24 ตัว รหัสผ่านต้องมี ตัวอักษร พิมพ์ใหญ่ พิมพ์เล็ก และ สัญลักษณ์ พิเศษ เช่น " : null}
                            error={validPass === false && txtPass !== '' ? true : false}
                            required
                            />
                            <TextField
                            type={clkShowConPass ? "text" : "password"}
                            label="ยืนยันรหัสผ่าน"
                            id="txtconpassword"
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClkConfirmPass}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {clkShowConPass ? <VisibilityOff/> : <Visibility />}
                                        </IconButton>
                                        {validConPass && txtConfirmPass !== '' ? <CheckCircleIcon sx={{color:"#2e7d32"}} /> : null}
                                </InputAdornment>,
                            }}
                            variant="outlined"
                            size="small"
                            onChange={(e) => setTxtConfirmPass(e.target.value)}
                            value={txtConfirmPass}
                            helperText={validConPass === false && txtConfirmPass ? "รหัสผ่านไม่ตรงกัน":null}
                            error={validConPass === false && txtConfirmPass  !== '' ? true : false}
                            required
                            />
                           
                            

                </Stack>

                <Grid container sx={{pt:1 , pb:1}}>
                    <Grid item xs={12}>
                            <Button type='submit' variant="contained"> สมัครสมาชิก </Button>
                    </Grid>
                   
                 </Grid>
            </form>
             <SweetAlertCustom swalProps={swalProps}  setSwalProps={setSwalProps} />
            </Box>
        </Grid>
    </Grid>
  )
}

export default FrmRegister