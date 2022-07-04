import React  , {useState , useContext, Fragment} from 'react';
import MetaTags from "react-meta-tags";
import useMediaQuery from '@mui/material/useMediaQuery';
import DataContext from '../context/DataContext';
import {AppBar , Toolbar ,Typography ,IconButton , Badge , Grid} from "@mui/material";
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import MenuIcon from "@mui/icons-material/Menu";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListMenu from '../component/ListMenu';
import PopOverCart from '../component/Cart/PopOverCart';

const Header = ({menuId , scroll , headerTop  , toggleDrawer , menuBar}) => {

    const {listCartProduct , listWishList , listCompare} = useContext(DataContext);
    
    const handleProfileMenuOpen = () => {

    }
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        //console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        
        setAnchorEl(null);
    };

    //const devices = useMediaQuery('(max-width:767px)');
    const Screen = useMediaQuery('(max-width:1200px)');

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;
    
    //console.log("open" , open)
  return (
          <Fragment>
              <MetaTags>
                <title>Shop | Devphin</title>
                <meta
                  name="description"
                  content="Devphin design"
                />
              </MetaTags>
                
                <AppBar className={`sticky-bar ${Screen ? "bgMobile" : null}`} position="fixed" style={ scroll === headerTop && Screen === false ? { background: 'transparent', boxShadow: 'none' , margin:0} : { background: '#fdbe33', boxShadow: 'none' , margin:0 }}
                >
                    <Toolbar>
                            <Grid container spacing={12}>
                            {
                                Screen ? 
                                  <>
                                  <Grid item xs={4} md={4} align="center" sx={{mt: 1 }}>
                                    <Link to="/" style={{ textDecoration: 'none' , color:"#fff" }}>
                                      <Typography align="center" variant="h3" component="div">
                                         SHOP
                                     </Typography>
                                    </Link>
                                  </Grid>
                                  <Grid item xs={8} md={8} align="right" sx={{mt: 2 , pl:0 , color:"#fff"}}>
                                        
                                        <IconButton size="large" aria-label={`show ${listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} new compare `} color="inherit">
                                          <Badge badgeContent={listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} color="error">
                                             <Link to="/compare"><ShuffleIcon sx={{color:"#fff"}} /></Link>
                                          </Badge>
                                        </IconButton>
                                        <IconButton
                                          size="small"
                                          aria-label={`show ${listWishList !== null && listWishList.length !== 0 ? listWishList.length:0} new wishlist`}
                                          color="inherit"
                                        >
                                          <Badge badgeContent={listWishList !== null && listWishList.length !== 0 ? listWishList.length:0} color="error">
                                          <Link to="/wishlist"><FavoriteBorderIcon sx={{color:"#fff"}} /></Link>
                                          
                                          </Badge>
                                        </IconButton>
                                        <IconButton
                                          size="small"
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
                                          aria-controls={menuId}
                                          aria-haspopup="true"
                                          onClick={toggleDrawer("bottom", true)}
                                          color="inherit"
                                        >
                                            <MenuIcon 
                                                    style={
                                                      {
                                                        fontSize: "30px"
                                                        ,color: "#fff"
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
                                                <ListMenu toggleDrawer={toggleDrawer} anchor={"bottom"} device={Screen}  />
                                        </Drawer>
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
                                                  onClick={toggleDrawer("left", true)}

                                                  >
                                                        <MenuIcon 
                                                              style={
                                                              {
                                                                  fontSize: "30px"
                                                                  ,color: "#fff"
                                                                  ,border: "none"
                                                                  ,background: "none"
                                                              }
                                                          }/>
                                          </IconButton>              
                                          <Drawer
                                            anchor={"left"}
                                            open={menuBar["left"]}
                                            onClose={toggleDrawer("left", false)}
                                          >
                                              <ListMenu toggleDrawer={toggleDrawer} anchor={"left"} device={Screen}  />
                                          </Drawer>
                                </Grid>
                                <Grid item xs={3} md={6} align="center" sx={{mt: 1}}>
                                  <Link to="/" style={{ textDecoration: 'none' , color:"#fff" }}>
                                      <Typography align="center" variant="h3" component="div">
                                        SHOP
                                      </Typography>
                                  </Link>
                                </Grid>
                                <Grid item xs={8} md={3} align="right" sx={{mt: 1 , pl:0 , color:"#fff"}}>
                                        
                                      <IconButton size="large" aria-label={`show ${listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} new compare `} color="inherit">
                                        <Badge badgeContent={listCompare !== null && listCompare.length !== 0 ? listCompare.length:0} color="error">
                                            <Link to="/compare"><ShuffleIcon sx={{color:"#fff"}} /></Link>
                                        </Badge>
                                      </IconButton>
                                      <IconButton
                                        size="large"
                                        aria-label={`show ${listWishList !== null && listWishList.length !== 0 ? listWishList.length:0} new wishlist`}
                                        color="inherit"
                                      >
                                        <Badge badgeContent={listWishList !== null && listWishList.length !== 0 ? listWishList.length:0} color="error">
                                            <Link to="/wishlist"><FavoriteBorderIcon sx={{color:"#fff"}} /></Link>
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
                                      <Link to="/login-register" style={{color:"#fff"}}>
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
                                      </Link>
                                      
                                </Grid>       
                                </>
                                
                          }
                          </Grid>
            </Toolbar>
          </AppBar>
         </Fragment>
    
  )
}

export default Header