import React , {useContext} from 'react'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom';
import Badge from "@mui/material/Badge";
import Drawer from '@mui/material/Drawer';
import ListMenu from '../ListMenu';
import MenuIcon from "@mui/icons-material/Menu";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';


const menuMobile = ({toggleDrawer , menuBar , menuId}) => {

     const handleClick = () => {


     }

     const lowerToggle =  toggleDrawer;
    return (
    <>
                                  <Grid item xs={4} md={4} align="center" sx={{mt: 1 }}>
                                    <Typography align="center" variant="h3" component="div">
                                        SHOP
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={8} md={8} align="right" sx={{mt: 2 , pl:0 , color:"#fff"}}>
                                        
                                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                          <Badge badgeContent={4} color="error">
                                           
                                            <Link to="/compare"> <ShuffleIcon /> </Link>
                                          </Badge>
                                        </IconButton>
                                        <IconButton
                                          size="small"
                                          aria-label="show 17 new notifications"
                                          color="inherit"
                                        >
                                          <Badge badgeContent={17} color="error">
                                              <Link to="/wishlist"> <FavoriteBorderIcon /> </Link>
                                          </Badge>
                                        </IconButton>
                                        <IconButton
                                          size="small"
                                          aria-label="show 17 new notifications"
                                          color="inherit"
                                          onClick={handleClick}
                                        >
                                          <Badge badgeContent={1} color="error">
                                            <Link to="/cart"> <LocalGroceryStoreIcon /> </Link>
                                          </Badge>
                                        </IconButton>
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
                                                  onClose={toggleDrawer("bottom", true)}
                                                >
                                                <ListMenu toggleDrawer={lowerToggle} anchor={"bottom"}  />
                                                </Drawer>
                                  </Grid>
                                </>
  )
}

export default menuMobile