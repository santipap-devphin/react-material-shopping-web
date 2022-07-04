import React , {useContext , useState} from 'react'
import { ThemeProvider} from '@mui/material/styles';
import {Grid , Stack , Box , Typography ,Container , TextField , IconButton  
    , InputAdornment , Button  } from "@mui/material";
import DataContext from '../context/DataContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalMaps from '../component/Maps/LocalMaps';
import HeaderOther from '../layout/HeaderOther';
import HeaderOtherPage from '../layout/HeaderOtherPage';
import BreadCrumbPage from '../component/Breadcrumbs/BreadCrumbPage';
import FooterOther from '../layout/FooterOther';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import RoomIcon from '@mui/icons-material/Room';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';

const Contact = () => {

    const {theme , styles , toggleDrawer , menuBar} = useContext(DataContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const ScreenXl = useMediaQuery('(min-width:1537px)');
    const open = Boolean(anchorEl);
    const ids = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    
  return (<ThemeProvider theme={theme}>
            <Grid
                sx={{ flexGrow: 1 , m:-1 ,pt:0}}
            >
                <HeaderOther/>
                <Box sx={{ flexGrow: 1  , mt:0 , mb:0 , backgroundColor:"#f5f5f5"}}>
                    <HeaderOtherPage ScreenXl={ScreenXl} id={ids} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                    <BreadCrumbPage pagename={"ติดต่อเรา"} />
                    <Container>
                        <Box sx={{position: "relative" , height: "560px" , mt:5 , mb:5 , display: { xs: 'none', md: 'flex' } ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                            <LocalMaps latitude="47.444" longitude="-122.176"/>
                        </Box>
                        <Grid container spacing={2} sx={{mt:1 , pb:5}}>
                            <Grid item xs={12} md={4}>
                                 <Box sx={{ backgroundColor:"#ffffff" ,color:"#000", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>

                                 <Stack spacing={6} sx={{p:5}}>

                                        <Stack direction="row" spacing={2}>
                                            
                                                <div className='radius-icon'>
                                                    <IconButton aria-label="call" sx={{mt:-1}}>
                                                        <CallIcon  />
                                                    </IconButton>
                                                </div>
                                            
                                             <Typography variant="p" sx={{fontSize:16}}>+012 345 678 102</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                                <div className='radius-icon'>
                                                    <IconButton aria-label="email" sx={{mt:-1}}>
                                                        <MarkunreadIcon  />
                                                    </IconButton>
                                                </div>
                                            <Typography variant="p" sx={{fontSize:16}}>urname@email.com</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                              <div className='radius-icon'>
                                                    <IconButton aria-label="email" sx={{mt:-1}}>
                                                        <RoomIcon  />
                                                    </IconButton>
                                                </div>
                                            <Typography variant="p" sx={{fontSize:16}}>Address goes here,street, Crossroad 123.</Typography>
                                        </Stack>
                                         <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                            <IconButton aria-label="facebook">
                                                <FacebookIcon sx={{color:"#3b5998"}} />
                                            </IconButton>
                                            <IconButton aria-label="twiter">
                                                <TwitterIcon sx={{color:"#55acee"}} />
                                            </IconButton>
                                            <IconButton aria-label="twiter">
                                                <InstagramIcon sx={{color:"#c32aa3"}} />
                                            </IconButton>
                                        </Stack>

                                    </Stack>

                                 </Box>
                                 
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Box sx={{backgroundColor:"#ffffff" ,color:"#000", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" , p:4}}>
                                <Typography variant="h4">ติดต่อเรา</Typography>
                                 <br/>
                                 <Stack spacing={2}>
                                
                                    <Stack direction="row" spacing={3}>
                                        <TextField
                                            label="ชื่อ"
                                            id="searchshop"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                        <TextField
                                            label="อีเมล์"
                                            id="email"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><MarkunreadIcon  /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />

                                    </Stack>
                                    <TextField
                                            label="หัวข้อ"
                                            id="subject"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><SubjectIcon  /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                    />
                                    <TextField
                                            label="ข้อความ"
                                            id="message"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><MessageIcon  /></InputAdornment>,
                                            }}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            
                                    />
                                 <Button variant="contained">ส่งข้อความ</Button>
                                 </Stack>
                                        
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                    
                    
                </Box>
                <FooterOther bgStyle={styles.bgFooter} />
            </Grid>
        </ThemeProvider>)
}

export default Contact