import React , {useState , useEffect , useContext} from 'react';
import DataContext from '../../context/DataContext';
import useAxiosPrivate from '../../hook/useAxiosPrivate';
import useAuth from '../../hook/useAuth';
import useRefreshToken from '../../hook/useRefreshToken';
import { Link , useNavigate } from 'react-router-dom';
import endpoint from '../../api/endpoint';
import { Stack , Box  , TextField  , InputAdornment , Button  , Grid , FormGroup , FormControlLabel , Checkbox  } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import SweetAlert2 from 'react-sweetalert2';

const FrmLogin = () => {

  const [user , setUser] = useState('');
  const [pass , setPass] = useState('');
  const [errMsg , setErrMsg] = useState({msg:'' , statusActive:null , code:0});
  const [swalProps, setSwalProps] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const refreshs = useRefreshToken();

  const {userLogin , setUserLogin} = useContext(DataContext);
  

  const {auth , setAuth} = useAuth(); 

  let navicate = useNavigate();
  
  const frmLoginSubmit = async (e) => {

    e.preventDefault();

    if(user && pass){

        setSwalProps({show: false});

        console.log(user , pass, 'send to server')

        const response = await endpoint.post("/chkUserLogin" , JSON.stringify({username:user , password:pass}) 
                                             ,{
                                                 headers : {"Content-Type":"application/json"} ,
                                                 withCredentials:true
                                              });

        //console.log(response.headers)

        if(response.data.code === 1){


            setSwalProps({
                show: true,
                title: 'ข้อมูลถูกต้อง',
                text: 'กด ยืนยันในการเข้าสู่ระบบ',
                icon:"success",
                confirmButtonText: 'ยืนยัน'
            });
            setTimeout(function(){ setSwalProps({...swalProps , show:false});}, 1000);    

            setErrMsg({...errMsg , code:1})
            setErrMsg({...errMsg , msg:"เข้าสู่ระบบสำเร็จ"})
            setErrMsg({...errMsg , statusActive:true})

            setTimeout(function(){ 
                setUserLogin({username:response.data.users , roles:response.data.roles , accessToken:response.data.accessToken}) 
                setAuth({username:response.data.users , accessToken : response.data.accessToken})
            }, 2000);
           
            

            //navicate("/");
        }
        else if(response.data.code === 2){

            
            setSwalProps({
                show: true,
                title: 'ไม่มี Username นี้ในระบบ',
                text: 'กรุณา กรอกข้อมูลใหม่',
                icon:"error",
                confirmButtonText: 'Close'
            });
            setErrMsg({...errMsg , code:2})
            setErrMsg({...errMsg , msg:"ไม่มี Username นี้ในระบบ"})
            setErrMsg({...errMsg , statusActive:false})
            //navicate("/");
        }
        if(response.data.code === 3){

           
            setSwalProps({
                show: true,
                title: 'รหัสผ่านของคุณไม่ถูกต้อง',
                text: 'กรุณา กรอกข้อมูลใหม่',
                icon:"error",
                confirmButtonText: 'Close'
            });
            setErrMsg({...errMsg , code:3})
            setErrMsg({...errMsg , msg:"รหัสผ่านของคุณไม่ถูกต้อง"})
            setErrMsg({...errMsg , statusActive:false})

            //navicate("/");
        }

    }
    else{
        console.error('username and password empty');
        return;
    }

  } 
 const chkRefresh = async () => {

    const response = await endpoint.get('/refresh' , {withCredentials:true});

    console.log(response)
    
  }

  const loadallUser = async () => {

     //const examsss = await refreshs();

     //console.log(examsss)

    const response = await axiosPrivate.get("/alluser");
    

    console.log(response)

    /*const response = await endpoint.get("/alluser" ,{
            headers : {"Authorization":`Bearer ${auth?.accessToken}`} ,
            withCredentials:true
    });*/

  
   

  }

  useEffect(() => {

    let isApiSubscribed = true;

    if(userLogin !== null){

        navicate("/address");
     }

     return () => {
        // cancel the subscription
        localStorage.setItem("userlogin" , JSON.stringify(userLogin));
        isApiSubscribed = false;
    };

 },[userLogin])



  return (
            <Grid container spacing={2} sx={{mt:1}} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={8}>
                <Box className='login-register'>
                <Button onClick={chkRefresh}>ReFresh</Button>
                <Button onClick={loadallUser}>LoadUser</Button>
                <SweetAlert2 
                        {...swalProps}
                       
                            onConfirm={result => {
                                
                                 if(result.isConfirmed === true){

                                    if(swalProps.icon === "success"){
                                            navicate("/address");
                                    }

                                 }
                            }}
                 /> 
                 
                <form onSubmit={frmLoginSubmit}>
                   <Stack spacing={2}>
                        
                                <TextField
                                label="ชื่อผู้ใช้"
                                id="user"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
                                }}
                            
                                variant="outlined"
                                size="small"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                                
                                />
                                <TextField
                                label="รหัสผ่าน"
                                id="pass"
                                type="password"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start"><KeyIcon /></InputAdornment>,
                                }}
                                variant="outlined"
                                size="small"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                                />
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox  />} label="Remember me" />
                                    
                                </FormGroup>
                                <Grid container sx={{pt:1 , pb:1}}>
                                    <Grid item xs={6}>
                                        <Button type="submit" variant="outlined" sx={{backgroundColor:"#030f27",color:"#dfb163" , "&:hover": { backgroundColor:"#fff"}}}>เข้าสู่ระบบ </Button>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Link to={"/forgot-password"} style={{ textDecoration: 'none'}}><Button variant="outlined" sx={{backgroundColor:"#030f27",color:"#dfb163" , "&:hover": { backgroundColor:"#fff"}}}>ลืมรหัสผ่าน ?</Button></Link>
                                    </Grid>
                                </Grid>
                         </Stack>
                </form>
                </Box>            
                </Grid>
        </Grid>
  )
}

export default FrmLogin