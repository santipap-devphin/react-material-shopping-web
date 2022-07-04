import React , {useState , useEffect , useContext} from 'react';
import {Stack , Box , Typography , TextField, InputAdornment , Button , Alert} from "@mui/material";
import useAxiosPrivate from '../../hook/useAxiosPrivate';
import KeyIcon from '@mui/icons-material/Key';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DataContext from '../../context/DataContext';
const SecChangePass = () => {

  const {setUserLogin} = useContext(DataContext);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [validEmpty , setValidEmpty] = useState(false);
  const [newPass , setNewPass] = useState('');
  const [validPass , setValidPass] = useState(false);
  const [conNewPass , setConNewPass] = useState('');
  const [validConPass , setValidConPass] = useState(false);
  const [txtStatus , setTxtStatus] = useState('');
  const [statusSuccess , setStatusSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {

    if(newPass === conNewPass){
        setTxtStatus('')
        setValidConPass(true)
    }else{
        setTxtStatus('รหัสผ่านไม่ตรงกัน')
        setValidConPass(false)
        
    }
    //console.log(PWD_REGEX.test(newPass))
    setValidPass(PWD_REGEX.test(newPass))

  },[newPass , conNewPass])

  const frmChangepass = async (e) => {
    e.preventDefault();

    if(newPass && conNewPass){

      try {

        const response = await axiosPrivate.post("/changepass" , {passnew:newPass});
        if(response.status === 200 && response.statusText === "OK"){

            if(response.data.code === 1){

                setNewPass('');
                setValidPass(false);
                setConNewPass('');
                setValidConPass(false);
                setTxtStatus('');
                setStatusSuccess(true);
                
                setTimeout(function() {setStatusSuccess(false); setUserLogin(null);}, 3000);

            }
        }
        
       
        
      } catch (err) {
          console.error(err);
      }

    }else{

        setValidEmpty(true)
        setTimeout(function() {setValidEmpty(false)}, 3000);
    }
    
  }


  //console.log(userLogin)

  return (
        <Stack spacing={1} sx={{mt:5 , mb:5}}>
           {
             validEmpty ? <Alert severity="warning" variant="outlined">กรุณากรอกข้อมูล</Alert> : null
           }
           {
              statusSuccess ? 
              <Alert variant="filled" severity="success">
                  <Typography variant='h6'>เปลื่ยนรหัสผ่าน เรียบร้อย กรุณา LOGIN ใหม่</Typography>
              </Alert>
              :null
           }
           
          <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
          <form onSubmit={frmChangepass}>
            <Stack spacing={3} sx={{p:3}}>
            <Typography variant='h4'>เปลื่ยนรหัสผ่าน</Typography>
                                  {/*<TextField
                                            label="รหัสผ่านเก่า"
                                            id="passold"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><PasswordIcon /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                          />*/}
                                        <TextField
                                            label="รหัสผ่านใหม่"
                                            id="passold"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">{validPass ? <CheckCircleIcon sx={{color:"green"}} /> : <KeyIcon />}</InputAdornment>,
                                            }}
                                            value={newPass}
                                            onChange={(e) => setNewPass(e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                        {
                                          newPass !== "" && !validPass ? <Alert severity="info"> กรอกตัวอักษรขั้นต่ำ 8 ตัว ไม่เกิน 24 ตัว รหัสผ่านต้องมี ตัวอักษร พิมพ์ใหญ่ พิมพ์เล็ก และ สัญลักษณ์ พิเศษ เช่น Aswwwq2255$ </Alert> : null
                                        }
                                        
                                        <TextField
                                            label="ยืนยันรหัสผ่านใหม่"
                                            id="passold"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">{validConPass && conNewPass !== "" ? <CheckCircleIcon sx={{color:"green"}} /> : <GppGoodIcon />}</InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={conNewPass}
                                            onChange={(e) => setConNewPass(e.target.value)}
                                            fullWidth
                                        />
              {
                !validConPass && conNewPass !== "" ?  <Alert severity="warning">{txtStatus}</Alert> : null
              }
            
            </Stack>
            <Button type="submit" variant="contained" sx={{m:3}}>ยืนยัน</Button>
            </form>
          </Box>
           
        </Stack>    
  )
}

export default SecChangePass