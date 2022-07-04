import React, { useEffect, useState , useRef} from "react";
import { fontFamily, padding, styled } from '@mui/system';
import {Container , Stack,  AppBar , Box , Toolbar ,Typography ,Button ,IconButton , Badge , Paper , Grid , CardActionArea  } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { createTheme ,makeStyles , ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Carousel from 'react-material-ui-carousel';
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MoreIcon from '@mui/icons-material/MoreVert';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FormControl from '@mui/material/FormControl';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import MapIcon from '@mui/icons-material/Map';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Swiper, SwiperSlide } from "swiper/react";
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import data from '../data/testimonial/testimonial-one.json';

import "swiper/css";
import "swiper/css/navigation";
import "../assets/styles.css";
import { Navigation } from "swiper";

const Home = () => {
    let scrolltohead = document.querySelector(".dv1");
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);
    const [offcanvasActive, setOffcanvasActive] = useState(false);
    const [sizeScreen , setSizeScreen] = useState(0);
    const [detactMobile , setDetactMobile] = useState(false);
    const [pos , setPos] = useState(false);
    const matches = useMediaQuery('(max-width:767px)');
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const myRef = useRef(null);
  
    const handleTop = () => {
      
      
      window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
      
      setPos(false);
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250  , alignItems:"center"}}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
            <CancelPresentationIcon/>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
        </List>
        <Divider />
       
      </Box>
    );
  
   
  
    useEffect(() => {
      const header = document.querySelector(".sticky-bar");
      setHeaderTop(header.offsetTop);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
   useEffect(() => {
  
      
      setSizeScreen(window.screen.availWidth)
      if(window.screen.availWidth < 768){
            setDetactMobile(true)
      }
  
    },[])
  
    const handleScroll = () => {
  
        //console.log(window.scrollY)
      if (window.scrollY > 700) {
               setPos(true);
      } else {
              setPos(false);
      }
  
      setScroll(window.scrollY);
    };
  
    const getActiveState = state => {
      setOffcanvasActive(state);
    };
  
    const menuId = 'primary-search-account-menu';
    
  
    const handleProfileMenuOpen = () => {
  
         //console.log('testtest')
  
    }
  
    const [value, setValue] =  useState(0);
    
    const handleChange = (event, newValue) => {
     //console.log(newValue)
      setValue(newValue);
    };
  
   
  
    var items = [
      {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!"
      },
      {
          name: "Random Name #2",
          description: "Hello World!"
      }
   ]
  
   const styles = {
    paperContainer: {
        backgroundImage: `url(${'../../assets/img/slider-36.jpg'})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },
    cardBg: {
      backgroundImage: `url(${'../../assets/img/banner-51.png'})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    bgShip: {
       backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#303030',
       
    },
    cardfooter: {
      backgroundImage: `url(${'../../assets/img/banner-54.png'})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important"
    }
    ,
    bgFooter:{
      backgroundColor:"#e90042",
      textAlign:"center",
      color:"#fff",
      padding:"20px"
    },
    textWhite:{
      color:"#fff"
    }
    
  };
  
  const theme = createTheme({
    root: {
      margin: "0px",
      padding: "0px"
    }
  ,  palette: {
      primary: {
        main: "#e90042",
        
      }
      
    },
    typography: {
      fontFamily: "Kanit",
      fontWeightBold:100,
      fontWeightLight: 300,
      
    }
  });
  
  
  
  
  /*const useStyles = makeStyles({
    root: {
      borderRadius: 12,
      backgroundColor: "blue"
    }
  });
  
  
  const classes = useStyles();*/
  
    {/*pt: 8,
       pb: 6,  ใช้กับ box*/}

  return (
    <ThemeProvider theme={theme}>
    <div ref={myRef}></div>
    <Grid
      sx={{ flexGrow: 1 , m:-1 ,pt:0}}
      
      
     >
       {
         console.log(matches)
       }
      <AppBar className={`sticky-bar ${matches ? "bgMobile" : null}`} position="fixed" style={ scroll === headerTop && matches === false ? { background: 'transparent', boxShadow: 'none' , margin:0} : { background: '#000', boxShadow: 'none' , margin:0 }}
      >
          <Toolbar>
                 

                  <Grid container spacing={12}>

                  {
                       sizeScreen < 1200 ? 
                       
                       
                       <>
                        <Grid item xs={4} md={4} align="center" sx={{mt: 1 }}>
                          <Typography align="center" variant="h3" component="div">
                              SHOP
                          </Typography>
                        </Grid>
                        <Grid item xs={8} md={8} align="right" sx={{mt: 2 , pl:0 , color:"#fff"}}>
                              
                              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                  <ShuffleIcon />
                                </Badge>
                              </IconButton>
                              <IconButton
                                size="small"
                                aria-label="show 17 new notifications"
                                color="inherit"
                              >
                                <Badge badgeContent={17} color="error">
                                  <FavoriteBorderIcon />
                                </Badge>
                              </IconButton>
                              <IconButton
                                size="small"
                                aria-label="show 17 new notifications"
                                color="inherit"
                              >
                                <Badge badgeContent={1} color="error">
                                  <LocalGroceryStoreIcon />
                                </Badge>
                              </IconButton>
                              <IconButton
                                size="small"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                              >
                                    <Button onClick={toggleDrawer("bottom", true)}>

                                      <MenuIcon 
                                          style={
                                            {
                                              fontSize: "30px"
                                              ,color: "#fff"
                                              ,border: "none"
                                              ,background: "none"
                                            }
                                          }/>

                                      </Button>
                                      <Drawer
                                        anchor={"bottom"}
                                        open={state["bottom"]}
                                        onClose={toggleDrawer("bottom", false)}
                                      >
                                        {list("bottom")}
                                      </Drawer>
                              </IconButton>
                        </Grid>
                       </>
                       
                       :  
                       <>
                       <Grid item xs={1} md={3}>
                          <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 , mt: 1 , ml: 3 }}
                            >
                            
                                <Button onClick={toggleDrawer("left", true)}>

                                <MenuIcon 
                                    style={
                                      {
                                        fontSize: "30px"
                                        ,color: "#fff"
                                        ,border: "none"
                                        ,background: "none"
                                      }
                                    }/>

                                </Button>
                                <Drawer
                                  anchor={"left"}
                                  open={state["left"]}
                                  onClose={toggleDrawer("left", false)}
                                >
                                 {list("left")}
                                 
                                </Drawer>

                          </IconButton>
                      </Grid>
                      <Grid item xs={3} md={6} align="center" sx={{mt: 1}}>
                        <Typography align="center" variant="h3" component="div">
                            SHOP
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={3} align="right" sx={{mt: 1 , pl:0 , color:"#fff"}}>
                              
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                              <Badge badgeContent={4} color="error">
                                <ShuffleIcon />
                              </Badge>
                            </IconButton>
                            <IconButton
                              size="large"
                              aria-label="show 17 new notifications"
                              color="inherit"
                            >
                              <Badge badgeContent={17} color="error">
                                <FavoriteBorderIcon />
                              </Badge>
                            </IconButton>
                            <IconButton
                              size="large"
                              aria-label="show 17 new notifications"
                              color="inherit"
                            >
                              <Badge badgeContent={1} color="error">
                                <LocalGroceryStoreIcon />
                              </Badge>
                            </IconButton>
                            <IconButton
                              size="large"
                              edge="end"
                              aria-label="account of current user"
                              aria-controls={menuId}
                              aria-haspopup="true"
                              onClick={handleProfileMenuOpen}
                              color="inherit"
                            >
                              <AccountCircle />
                            </IconButton>
                      </Grid>       


                      </>
                       
                 }
                      
                      
                      
                </Grid>

          </Toolbar>
              
              
        </AppBar>

        {/*<AppBar position="fixed">
          <Toolbar>dsdsd</Toolbar>
                            </AppBar>   */}                   
                          
    
        <section>
              <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    
                  }}
                >
                  <Paper style={styles.paperContainer} component={Stack} direction="column" justifyContent="center">
                  
                    <Typography
                      style={{color:"white"}}
                      component="h3"
                      variant="h2"
                      align="center"
                      color="text.primary"
                      gutterBottom
                    >
                        Stylish
                    </Typography>
                    <Typography style={{color:"white"}} variant="h1" align="center" color="text.secondary" paragraph>
                          Male Clothes
                    </Typography>
                    <Typography style={{color:"white"}} variant="p" align="center" color="text.secondary" paragraph>
                          30% off Black Friday
                    </Typography>
                    <Stack
                      sx={{ pt: 6 }}
                      direction="row"
                      spacing={3}
                      justifyContent="center"
                    >
                      <Button color="warning" variant="contained" size="large" style={{paddingLeft:60 , paddingRight:60}}>Shop Now</Button>
                    
                    </Stack>
                  </Paper>
                
                </Box>
          </section>

          <section>
          <Box  sx={{ flexGrow: 1 }}>
                <Paper elevation={0} style={{backgroundColor:"#1b1b1b" ,paddingTop:"70px"}}> 
                
                <Typography
                      style={{color:"white", marginBottom:"70px"}}
                      component="h2"
                      variant="h2"
                      align="center"
                      color="text.primary"
                      gutterBottom
                      className="useFontKanit"
                    >
                        สินค้าแนะนำ

                </Typography>

                
                 <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={{ xs: 3, sm: 2, md: 4 }}>
                            

                            <Card sx={{ width: 370 , height:215 }} style={styles.cardBg}>
                              
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div" 
                                  style={{ lineHeight: 1
                                        ,color: "#e90042"}}>
                                  -70% Off
                                </Typography>
                                <Typography variant="h4" color="#fff">
                                       Easy Chair
                                </Typography>
                              </CardContent>
                              <CardActions sx={{pt:7}}>
                              <IconButton
                                  size="large"
                                  edge="end"
                                  aria-label="account of current user"
                                  aria-controls={menuId}
                                  aria-haspopup="true"
                                  onClick={handleProfileMenuOpen}
                                  color="inherit"
                                  
                                >
                              <ArrowForwardIosIcon sx={{color:"#e90042"}} />
                            </IconButton>
                                <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                              </CardActions>
                            </Card>

                            <Card sx={{ width: 370 , height:215 }} style={styles.cardBg}>
                             
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div" 
                                  style={{ lineHeight: 1
                                        ,color: "#e90042"}}>
                                  -70% Off
                                </Typography>
                                <Typography variant="h4" color="#fff">
                                       Sofa
                                </Typography>
                              </CardContent>
                              <CardActions sx={{pt:7}}>
                                <IconButton
                                  size="large"
                                  edge="end"
                                  aria-label="account of current user"
                                  aria-controls={menuId}
                                  aria-haspopup="true"
                                  onClick={handleProfileMenuOpen}
                                  color="inherit"
                                  
                                >
                                  <ArrowForwardIosIcon sx={{color:"#e90042"}} />
                              </IconButton>
                                <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                              </CardActions>
                            </Card>

                            <Card sx={{ width: 370 , height:215 }} style={styles.cardBg}>
                             
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div" 
                                    style={{ lineHeight: 1
                                          ,color: "#e90042"}}>
                                    -70% Off
                                  </Typography>
                                <Typography variant="h4" color="#fff">
                                       Office Chair
                                </Typography>
                              </CardContent>
                              <CardActions sx={{pt:7}}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    
                                  >
                                <ArrowForwardIosIcon sx={{color:"#e90042"}} />
                              </IconButton>
                                <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                              </CardActions>
                            </Card>
                </Stack>

                   <Typography
                      style={{color:"white" , marginTop:"70px"}}
                      component="h2"
                      variant="h2"
                      align="center"
                      color="text.primary"
                      gutterBottom
                      className="useFontKanit"
                    >
                        รายละเอียดสินค้า

                   </Typography>

                   <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Item One" sx={{color:"#e90042"}} />
                        <Tab label="Item Two" sx={{color:"#fff"}} />
                        <Tab label="Item Three" sx={{color:"#fff"}} />
                  </Tabs>

                  
                   <div label="list0">

                   <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={{ xs: 3, sm: 2, md: 4 }}>

                            <Card sx={{ width: 270 , height:500 }} style={{marginTop:"40px" ,  background: 'transparent', boxShadow: 'none'}}>
                                          <CardActionArea>
                                            <CardMedia
                                              component="img"
                                              image="../../assets/img/2.jpg"
                                              alt="green iguana"
                                            />
                                            </CardActionArea>
                                            <CardContent sx={{paddingLeft:0}} style={styles.textWhite}>

                                                <Stack direction="row" spacing={2}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                      Lorem ipsum black three
                                                    </Typography>
                                                  
                                                </Stack>

                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                    <Typography  variant="h6" component="div">
                                                      <span>350</span><span style={{textDecoration: "line-through" , color: "#fa6bff"}}> 650</span>
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                          
                                          <CardActions style={{paddingLeft:0}}>
                                          
                                              <Button size="small" color="primary" style={{color:"#e90042" , paddingLeft:0}}>
                                              <AddShoppingCartIcon/>
                                                ADD TO CART
                                              </Button>
                                          </CardActions>
                                      
                            </Card>

                            <Card sx={{ width: 270 , height:500 }} style={{marginTop:"40px" ,  background: 'transparent', boxShadow: 'none'}}>
                                          <CardActionArea>
                                            <CardMedia
                                              component="img"
                                              image="../../assets/img/2.jpg"
                                              alt="green iguana"
                                            />
                                            </CardActionArea>
                                            <CardContent sx={{paddingLeft:0}} style={styles.textWhite}>

                                                <Stack direction="row" spacing={2}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                      Lorem ipsum black three
                                                    </Typography>
                                                  
                                                </Stack>

                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                    <Typography  variant="h6" component="div">
                                                      <span>350</span><span style={{textDecoration: "line-through" , color: "#fa6bff"}}> 650</span>
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                          
                                          <CardActions style={{paddingLeft:0}}>
                                          
                                              <Button size="small" color="primary" style={{color:"#e90042" , paddingLeft:0}}>
                                              <AddShoppingCartIcon/>
                                                ADD TO CART
                                              </Button>
                                          </CardActions>
                                      
                            </Card>

                            <Card sx={{ width: 270 , height:500 }} style={{marginTop:"40px" ,  background: 'transparent', boxShadow: 'none'}}>
                                          <CardActionArea>
                                            <CardMedia
                                              component="img"
                                              image="../../assets/img/2.jpg"
                                              alt="green iguana"
                                            />
                                            </CardActionArea>
                                            <CardContent sx={{paddingLeft:0}} style={styles.textWhite}>

                                                <Stack direction="row" spacing={2}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                      Lorem ipsum black three
                                                    </Typography>
                                                  
                                                </Stack>

                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                    <Typography  variant="h6" component="div">
                                                      <span>350</span><span style={{textDecoration: "line-through" , color: "#fa6bff"}}> 650</span>
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                          
                                          <CardActions style={{paddingLeft:0}}>
                                          
                                              <Button size="small" color="primary" style={{color:"#e90042" , paddingLeft:0}}>
                                              <AddShoppingCartIcon/>
                                                ADD TO CART
                                              </Button>
                                          </CardActions>
                                      
                            </Card>

                            <Card sx={{ width: 270 , height:500 }} style={{marginTop:"40px" ,  background: 'transparent', boxShadow: 'none'}}>
                                          <CardActionArea>
                                            <CardMedia
                                              component="img"
                                              image="../../assets/img/2.jpg"
                                              alt="green iguana"
                                            />
                                            </CardActionArea>
                                            <CardContent sx={{paddingLeft:0}} style={styles.textWhite}>

                                                <Stack direction="row" spacing={2}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                      Lorem ipsum black three
                                                    </Typography>
                                                  
                                                </Stack>

                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                    <Typography  variant="h6" component="div">
                                                      <span>350</span><span style={{textDecoration: "line-through" , color: "#fa6bff"}}> 650</span>
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                          
                                          <CardActions style={{paddingLeft:0}}>
                                          
                                              <Button size="small" color="primary" style={{color:"#e90042" , paddingLeft:0}}>
                                              <AddShoppingCartIcon/>
                                                ADD TO CART
                                              </Button>
                                          </CardActions>
                                      
                            </Card>

                           

                  </Stack>
                 

                   </div>
                   <div label="list1" style={{display:"none"}}>
                          testesfsdf
                   </div>

                   <Stack justifyContent="center" alignItems="center" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 1.5 }} sx={{mt:"70px"}}>

                                  
                              
                                  <Grid item lg={4} md={6} sm={6}>

                                            <Card style={styles.bgShip} sx={{pt:3 , pb:3  , pl:11 ,pr:11}}>
                                              <CardActionArea>
                                                <CardMedia
                                                  component="img"
                                                  image="../../assets/img/support-13.png"
                                                  alt="green iguana"
                                                />
                                              <Typography gutterBottom variant="p" component="div" style={{color:"#fff" , marginTop:1}}>
                                                    FREE SHIPPING ON ALL ORDER
                                                  </Typography>
                                              </CardActionArea>
                                            </Card>

                                  </Grid>

                                  <Grid item lg={4} md={6} sm={6}>

                                            <Card style={styles.bgShip} sx={{pt:3 , pb:3  , pl:11 ,pr:11}}>
                                              <CardActionArea>
                                                <CardMedia
                                                  component="img"
                                                  image="../../assets/img/support-14.png"
                                                  alt="green iguana"
                                                />
                                              <Typography gutterBottom variant="p" component="div" style={{color:"#fff" , marginTop:1.5 , marginBottom:0.7}}>
                                                    BACK GUARANTEE UNDER 5 DAYS
                                              </Typography>
                                              </CardActionArea>
                                            </Card>

                                  </Grid>

                                  <Grid item lg={4} md={6} sm={6}>

                                            <Card style={styles.bgShip} sx={{pt:3 , pb:3  , pl:11 ,pr:11}}>
                                              <CardActionArea>
                                                <CardMedia
                                                  component="img"
                                                  image="../../assets/img/support-15.png"
                                                  alt="green iguana"
                                                />
                                              <Typography gutterBottom variant="p" component="div" style={{color:"#fff" , marginTop:10,marginBottom:10}}>
                                                  ON EVERY ORDER OVER $150
                                                  </Typography>
                                              </CardActionArea>
                                            </Card>

                                  </Grid>
                      </Stack>

                      <Typography
                            style={{color:"white" , marginTop:"70px"}}
                            component="h2"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                          >
                          Join With Us!
                         </Typography>      
                         
                         <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <Typography  variant="p" component="div" style={{color:"#fff" , mt:1.5 , mb:0.7}}>
                                    Subscribe to our newsletter to receive news on update
                            </Typography>
                         </Stack> 
                          
                          <Container>
                          <Grid container justifyContent="center" alignItems="center">

                                  <Grid item xs={12} sm={12} md={6} lg={6} sx={{mt:3}}>

                                        <center>
                                              <TextField
                                              fullWidth
                                              label="กรอกอีเมล์ของคุณ"
                                              id="outlined-start-adornment"
                                              variant="filled"
                                              /*color="warning"*/
                                              InputLabelProps={{
                                                style: { color: '#fff'},
                                              }}
                                              />

                                        </center>
                                  </Grid>
                                  <Grid item lg={12} sx={{mt:3}}>
                                      <center><Button variant="contained" size="large" style={{paddingLeft:60 , paddingRight:60}}>SUBSCRIBE</Button></center>
                                  </Grid>

                                  </Grid> 

                                  <Grid container justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{mt:"70px"}}>
                                      <Grid item lg={6} md={6} justifyContent="center" alignItems="center">
                                            <Card style={styles.cardfooter}>
                                            
                                                <CardContent>
                                                    
                                                    <Typography variant="h3" color="#fff">
                                                      Lorem ipsum
                                                    </Typography>
                                                    <Typography variant="p" color="#e90042">
                                                        Starting at $99.00
                                                    </Typography>
                                                  </CardContent>
                                                  <CardActions sx={{pt:20}}>
                                                  <IconButton
                                                      size="large"
                                                      edge="end"
                                                      aria-label="account of current user"
                                                      aria-controls={menuId}
                                                      aria-haspopup="true"
                                                      onClick={handleProfileMenuOpen}
                                                      color="inherit"
                                                  
                                                  >
                                                  <ArrowForwardIosIcon sx={{color:"#e90042"}} />
                                                  </IconButton>
                                                  <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                                                  </CardActions>
                                            </Card>
                                      </Grid>
                                      <Grid item lg={6} md={6} justifyContent="center" alignItems="center">
                                                  <Card style={styles.cardfooter}>
                                                  
                                                  <CardContent>
                                                      
                                                      <Typography variant="h3" color="#fff">
                                                        Lorem ipsum
                                                      </Typography>
                                                      <Typography variant="p" color="#e90042">
                                                          Starting at $99.00
                                                      </Typography>
                                                    </CardContent>
                                                    <CardActions sx={{pt:20}}>
                                                    <IconButton
                                                        size="large"
                                                        edge="end"
                                                        aria-label="account of current user"
                                                        aria-controls={menuId}
                                                        aria-haspopup="true"
                                                        onClick={handleProfileMenuOpen}
                                                        color="inherit"
                                                    
                                                    >
                                                    <ArrowForwardIosIcon sx={{color:"#e90042"}} />
                                                    </IconButton>
                                                    <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                                                    </CardActions>
                                            </Card>
                                      </Grid>
                                    
                                </Grid>



                          </Container>
                                        
                          <Container>
                                  <Grid item lg={6} md={6} justifyContent="center" alignItems="center" sx={{mt:"70px" , pb:"70px"}}>
                                              {/*console.log(data)*/}
                                  <Swiper
                                            rewind={true}
                                            navigation={false}
                                            modules={[Navigation]}
                                            className="swiper"
                                            
                                          >
                                          

                                            {
                                               data.map((item , keys) => {

                                                 return   <SwiperSlide key={keys}>
                                                              <Stack justifyContent="center" alignItems="center" spacing={2} sx={{pt:2}}>
                                                                  <div><img src="../../assets/img/1.jpg" style={{borderRadius: '50%'}}/></div>
                                                                  <div style={{lineHeight:"30px" , paddingLeft:"60px" , paddingRight:"60px"}}><b>{item.content}</b></div>
                                                                  <MapIcon />
                                                                  <div>{item.customerName}</div>
                                                                  <div>{item.title}</div>
                                                              </Stack>
                                                          </SwiperSlide>

                                               })

                                            }
                                         </Swiper>

                                  </Grid>

                                  <IconButton
                                                  style={{
                                                    position: "fixed",
                                                    bottom: 10,
                                                    right: 10,
                                                    display: pos ? "block" : "none"
                                                    ,color:"red"
                                                    ,backgroundColor:"#fff"
                                                  }}
                                                  onClick={handleTop}
                                                >
                                                  <KeyboardArrowUpIcon />
                                                </IconButton>
                                         

                          </Container>
                         

                          <footer>

                         

                          <Grid alignItems="left" container sx={{backgroundColor:"#202022" ,p :10, color:"#fff"}}>
                                                          <Grid item xs={12} sm={4} md={4} lg={4} textAlign="center">
                                                              
                                                                <h2>SHOP</h2>
                                                                <p>© 2020 <a href="#" rel="noopener noreferrer" target="_blank">Devphin</a>All Rights Reserved</p>
                                                            
                                                          </Grid>
                                                          <Grid item xs={12} sm={2} md={2} lg={2}  textAlign="center">
                                                                
                                                                    <div><h2>PAGE</h2></div>
                                                                    <div>
                                                                          <p>Lorem ipsum</p>
                                                                          <p>Lorem ipsum</p>
                                                                          <p>Lorem ipsum</p>
                                                                          <p>Lorem ipsum</p>
                                                                      </div>

                                                                  
                                                                  
                                                          </Grid>
                                                          <Grid item xs={12} sm={2} md={2} lg={2}  textAlign="center">
                                                                
                                                                      <h2>Contact</h2>
                                                                      <p>Lorem ipsum</p>
                                                                      <p>Lorem ipsum</p>
                                                                      <p>Lorem ipsum</p>
                                                                      <p>Lorem ipsum</p>
                                                                
                                                          </Grid>
                                                          <Grid item xs={12} sm={4} md={4} lg={4} textAlign="center">
                                                                  
                                                                      <h2>SUBSCRIBE</h2>
                                                                      <p>Get E-mail updates about our latest shop and special offers.</p>
                                                                      <TextField
                                                                        fullWidth
                                                                        label="กรอกอีเมล์ของคุณ"
                                                                        id="outlined-start-adornment"
                                                                      
                                                                        
                                                                        /*color="warning"*/
                                                                        InputLabelProps={{
                                                                          style: { color: '#fff'},
                                                                        }}
                                                                        />
                                                                    
                                                                  
                                                          </Grid>
                                              </Grid>
                                              

                          </footer>

                        <footer style={styles.bgFooter}>

                              <Typography variant="p">Copy right Devphin 2022</Typography>

                        </footer>

                             
                       </Paper>
               

                
          </Box>
          </section>

         
                                          
         
          
      
          {/*<AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">News</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
                </AppBar>  */} 
                  
   
        </Grid>
    </ThemeProvider>
  )
}

export default Home