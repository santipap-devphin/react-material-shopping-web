import React ,{useState , useEffect , useContext} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logout from '../../component/Dialog/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import endpoint from '../../api/endpoint'

const MenuDbu = () => {

 const pathname = window.location.pathname;

 const {userLogin , setUserLogin} = useContext(DataContext);

 const [openDialog, setOpenDialog] = useState(false);

 let navicate = useNavigate();

 const [value, setValue] = useState(0);

 const ScreenMenu = useMediaQuery('(max-width:1023px)');

 const [openMenu, setOpenMenu] = useState(true);

 const [txtAlert , setTxtAlert] = useState({title:"ยืนยันการออกจากระบบ ใช่หรื่อไม่" , des:"หากต้องการออกจากระบบ ให้กด OK"});
 

 const handleClick = () => {
    setOpenMenu(!openMenu);
 };

 const handleCloseDialog = () => {
    setOpenDialog(false);
 };

 const confirmLogout = async() => {

    const response = await endpoint.post("/logout"  , {username:userLogin.username} , {withCredentials:true} )
        
    if(response.data.code === 1){
              setUserLogin(null);
              
              setOpenDialog(false);
    }else if(response.status === 204){
          console.log("inin")
          setTxtAlert({title:"ระบบขัดข้อง กรุณารอสักครู่" , des:"หรือลองใหม่อีกครั้ง"})
          setOpenDialog(true);
         
    }else{
         setOpenDialog(false);
    }
    //setTimeout(function() {setSnackOpen(false);}, 2000);
}
const handleChange = (event, newValue) => {
     console.log(newValue)
     switch(newValue) {
        case 1:
           console.log("1");
           navicate("/profile");
          break;
        case 2:
            navicate("/change-password");
          break;
        case 3:
            navicate("/orders");
          break;
        case 4:
            navicate("/confirm");
          break;
        case 5:
            navicate("/chatuser");
          break;
        case 6:
            setOpenDialog(true);
          break;
        default:
            navicate("/address");
      }
    setValue(newValue);
  };


  useEffect(() => {

    if(ScreenMenu === true){

        switch(pathname) {
            case "/profile":
                setValue(1);
            break;
            case "/change-password":
                setValue(2);
            break;
            case "/orders":
                setValue(3);
            break;
            case "/confirm":
                setValue(4);
            break;
            case "/chatuser":
                setValue(5);
            break;
            default:
                setValue(0);
          }

    }
  },[ScreenMenu])

  
useEffect(() => {

    let isApiSubscribed = true;

    if(userLogin === null && isApiSubscribed === true){

         navicate("/login-register");
         //window.location = "/login-register"

    }

    return () => {

        
        /**/
        localStorage.setItem("userlogin" , JSON.stringify(userLogin));
        isApiSubscribed = false;
    };
   
  },[userLogin])

 

return (   <>
            {
                ScreenMenu ? 
                
                <Box sx={{ maxWidth: { xs: 380, sm: 700 } , bgcolor: 'background.paper' , mt:2}}>
                    
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    
                        >
                        <Tab label="ที่อยู่" />
                        <Tab label="ข้อมูลส่วนตัว" />
                        <Tab label="เปลื่ยนรหัสผ่าน" />
                        <Tab label="รายการคำสั้งซื้อ" />
                        <Tab label="แจ้งชำระเงิน" />
                        <Tab label="แซท" />
                        <Tab label="ออกจากระบบ" />
                      
                    </Tabs>
                   
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {txtAlert.title}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                             {txtAlert.des}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            
                        <Button variant="contained" color="error" onClick={handleCloseDialog} >Cancel</Button>
                        <Button variant="contained" onClick={confirmLogout} autoFocus >
                            OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                     
             :
            <Container>
            <List
                sx={{ width: '100%', maxWidth: 240 , bgcolor: 'background.paper' , mt:5 , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}
                component="nav"
                aria-labelledby="nested-list-subheader"
             >
                <ListItemButton onClick={handleClick} sx={{color:"#000"}}>
                    <ListItemIcon>
                         <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="บัญชีของฉัน" />
                    {openMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to={"/address"} style={{textDecoration: "none"}}>
                                <ListItemButton sx={pathname === "/address" ? {pl: 4 , backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {pl: 4 , color:"#000"}}>
                                <ListItemIcon>
                                    <HomeIcon sx={{color:pathname === "/address" ? "#fff" :"#000"}} />
                                </ListItemIcon>
                                <ListItemText primary="ที่อยู่" />
                                </ListItemButton>
                            </Link>
                            <Link to={"/profile"} style={{textDecoration: "none"}}><ListItemButton sx={pathname === "/profile" ? {pl: 4 , backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {pl: 4 , color:"#000"}}>
                            <ListItemIcon>
                                <PersonIcon sx={{color:pathname === "/profile" ? "#fff" :"#000"}} />
                            </ListItemIcon>
                            <ListItemText primary="ข้อมูลส่วนตัว" />
                            </ListItemButton>
                            </Link>
                            <Link to={"/change-password"} style={{textDecoration: "none"}}>
                                <ListItemButton sx={pathname === "/change-password" ? {pl: 4 , backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {pl: 4 , color:"#000"}}>
                                <ListItemIcon>
                                    <ChangeCircleIcon sx={{color:pathname === "/change-password" ? "#fff" :"#000"}} />
                                </ListItemIcon>
                                <ListItemText primary="เปลื่ยนรหัสผ่าน" />
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>
                <Link to={"/orders"} style={{textDecoration: "none"}}>
                    <ListItemButton sx={pathname === "/orders" ? {backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {color:"#000"}}>
                        <ListItemIcon>
                            <MenuBookIcon sx={{color:pathname === "/orders" ? "#fff" :"#000"}} />
                        </ListItemIcon>
                        <ListItemText primary="รายการคำสั้งซื้อ" />
                    </ListItemButton>
                </Link>
                <Link to={"/confirm"} style={{textDecoration: "none"}}>
                    <ListItemButton sx={pathname === "/confirm" ? {backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {color:"#000"}}>
                        <ListItemIcon>
                            <PaidIcon sx={{color:pathname === "/confirm" ? "#fff" :"#000"}} />
                        </ListItemIcon>
                        <ListItemText primary="แจ้งชำระเงิน" />
                    </ListItemButton>
                </Link>
                <Link to={"/chatuser"} style={{textDecoration: "none"}}>
                    <ListItemButton sx={pathname === "/chatuser" ? {backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {color:"#000"}}>
                        <ListItemIcon>
                            <ChatIcon sx={{color:pathname === "/chatuser" ? "#fff" :"#000"}} />
                        </ListItemIcon>
                        <ListItemText primary="แซทกับแอดมิน" />
                    </ListItemButton>
                </Link>
                <Link to={"/history"} style={{textDecoration: "none"}}>
                <ListItemButton sx={pathname === "/history" ? {backgroundColor:"#202C45" , color:"#fff" , "&:hover": { backgroundColor:"#E81C2E"}} : {color:"#000"}}>
                    <ListItemIcon>
                        <HistoryIcon sx={{color:pathname === "/history" ? "#fff" :"#000"}} />
                    </ListItemIcon>
                    <ListItemText primary="ประวัติการสั้งซื้อ" />
                </ListItemButton>
                </Link>
             </List>
             <Grid container>
                <Grid item xs={12} textAlign="center" sx={{mt:3, mb:3}}>
                    <Logout userLogin={userLogin} setUserLogin={setUserLogin} />
                </Grid>
             </Grid>
            
            </Container>
                 }
             
           
            </>
         
        )
    }

export default MenuDbu