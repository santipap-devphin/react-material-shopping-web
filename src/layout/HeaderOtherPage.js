import React , {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import PopOverCart from '../component/Cart/PopOverCart';
import ListMenu from '../component/ListMenu';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';


const HeaderOtherPage = ({ScreenXl , id , open ,anchorEl , handleClose , handleClick ,menuBar ,toggleDrawer}) => {

  //const ScreenDevice = useMediaQuery('(max-width:768px)');
  const pathname = window.location.pathname
  
  const {listCartProduct , listWishList ,listCompare} = useContext(DataContext);

  const ScreenDeviceOther = useMediaQuery('(max-width:1024px)');

  //console.log(pCart)
  return (
    <div className='sticky-bar'>
            <AppBar position="static" sx={{backgroundColor:"#fff" , color:"#000"}}>
                    <Toolbar>
                        <Grid container spacing={1}>
                            <Grid item xs={3} align="left">
                                <Link to="/" style={{ textDecoration: 'none' , color:"#000" }}>
                                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 ,textAlign:"center" , pt:1 }}>
                                              โลโก้
                                  </Typography>
                                </Link>
                            </Grid>   
                             {
                               ScreenDeviceOther ? 
                               null
                               :
                               <Grid item xs={6} xl={6} sx={{justifyContent:"center",textAlign:"center",alignItems:"center"}} align="center">
                               <Stack 
                                   direction={{ xs: 'column', sm: 'row' }}
                                   divider={<Divider orientation="vertical" flexItem />}
                                   spacing={{ xs: 2, sm: 2, md: 4 }}
                                   sx={ScreenXl ? {textAlign:"center" , alignItems:"center" , pt:1.2 , pl:8} : {textAlign:"center" , alignItems:"center" , pt:1.2}}>
                                   
                                   <Typography sx={{ minWidth: 80 }}><Link to="/" style={pathname === "/" ? {color:"#E81C2E",textDecoration: "none"} : {color:"#000",textDecoration: "none"}}>หน้าแรก</Link></Typography>
                                   <Typography sx={{ minWidth: 80 }}><Link to="/shop" style={pathname === "/shop"?{color:"#E81C2E",textDecoration: "none"} :{color:"#000",textDecoration: "none"}}>สินค้า</Link></Typography>
                                   <Typography sx={{ minWidth: 80 }}>คอลเลคชั่น</Typography>
                                   <Typography sx={{ minWidth: 80 }}><Link to="/blog" style={pathname === "/blog"?{color:"#E81C2E",textDecoration: "none"} :{color:"#000",textDecoration: "none"}}>บล็อก</Link></Typography>
                                   <Typography sx={{ minWidth: 80 }}><Link to="/contact" style={pathname === "/contact"?{color:"#E81C2E",textDecoration: "none"} :{color:"#000",textDecoration: "none"}}>ติดต่อเรา</Link></Typography>
                               </Stack>
                               
                              </Grid> 
                             }

                           
                             {
                                ScreenDeviceOther ? 
                                    <Grid item xs={9} align="right">
                                    <IconButton size="large" aria-label={`show ${listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} new compare`} color="inherit">
                                    <Badge badgeContent={listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} color="error">
                                        <Link to="/compare"><ShuffleIcon sx={{color:"#000"}} /></Link>
                                    </Badge>
                                  </IconButton>
                                  <IconButton
                                    size="large"
                                    aria-label={`show ${listWishList !== null && listWishList.length !== 0 ? listWishList.length : 0} new wishlist`}
                                    color="inherit"
                                  >
                                    <Badge badgeContent={listWishList !== null && listWishList.length !== 0 ? listWishList.length : 0} color="error">
                                        <Link to="/wishlist"><FavoriteBorderIcon sx={{color:"#000"}} /></Link>
                                    </Badge>
                                  </IconButton>
                                  <IconButton
                                    aria-describedby={id}
                                    size="large"
                                    aria-label={`show ${listCartProduct !== null && listCartProduct.length !== 0 ? listCartProduct.length : 0} new cart`}
                                    color="inherit"
                                    onClick={handleClick}
                                  >
                                    <Badge badgeContent={listCartProduct !== null && listCartProduct.length !== 0 ? listCartProduct.length : 0} color="error">
                                      <LocalGroceryStoreIcon />
                                    </Badge>
                                  </IconButton>
                                  <PopOverCart id={id} open={open} anchorEl={anchorEl} handleClose={handleClose}/>
                                  <IconButton
                                          size="small"
                                          edge="end"
                                          aria-label="account of current user"
                                          aria-controls={`menu-${listCartProduct !== null && listCartProduct.length !== 0 ? listCartProduct.length : 0}`}
                                          aria-haspopup="true"
                                          onClick={toggleDrawer("bottom", true)}
                                          color="inherit"
                                        >
                                            <MenuIcon 
                                                    style={
                                                      {
                                                        fontSize: "30px"
                                                        ,color: "#000"
                                                        ,border: "none"
                                                        ,background: "none"
                                                      }
                                                    }/>
                                        
                                        </IconButton>
                                        <Drawer
                                                  anchor={"bottom"}
                                                  open={menuBar["bottom"]}
                                                  onClose={toggleDrawer("bottom", false)}
                                                >
                                                <ListMenu toggleDrawer={toggleDrawer} anchor={"bottom"} device={ScreenDeviceOther}  />
                                        </Drawer>
                                </Grid>  
                                 :
                                 <Grid item xs={3} align="center">
                                    <IconButton size="large" aria-label={`show ${listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} new compare`} color="inherit">
                                    <Badge badgeContent={listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} color="error">
                                        <Link to="/compare"><ShuffleIcon sx={{color:"#000"}} /></Link>
                                    </Badge>
                                  </IconButton>
                                  <IconButton
                                    size="large"
                                    aria-label={`show ${listWishList !== null && listWishList.length !== 0 ? listWishList.length : 0} new wishlist`}
                                    color="inherit"
                                  >
                                    <Badge badgeContent={listWishList !== null && listWishList.length !== 0 ? listWishList.length : 0} color="error">
                                        <Link to="/wishlist"><FavoriteBorderIcon sx={{color:"#000"}} /></Link>
                                    </Badge>
                                  </IconButton>
                                  <IconButton
                                    aria-describedby={id}
                                    size="large"
                                    aria-label={`show ${listCartProduct !== null && listCartProduct.length !== 0 ? listCartProduct.length : 0} new cart`}
                                    color="inherit"
                                    onClick={handleClick}
                                  >
                                    <Badge badgeContent={listCartProduct !== null && listCartProduct.length !== 0 ? listCartProduct.length : 0} color="error">
                                      <LocalGroceryStoreIcon />
                                    </Badge>
                                  </IconButton>
                                  <PopOverCart id={id} open={open} anchorEl={anchorEl} handleClose={handleClose}/>
                                  <Link to="/login-register" style={{color:"#000"}}>
                                        <IconButton
                                          size="large"
                                          edge="end"
                                          aria-label="account of current user"
                                          aria-controls={"profilelink"}
                                          aria-haspopup="true"
                                           color="inherit"
                                        >
                                          <AccountCircle />
                                        </IconButton>
                                      </Link>
                                </Grid>

                             }

                            
                        </Grid>
                    </Toolbar>
            </AppBar>
      </div>
  )
}

export default HeaderOtherPage