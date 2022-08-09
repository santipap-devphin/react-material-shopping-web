import React from 'react';
import Box from "@mui/material/Box";
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Divider from '@mui/material/Divider';
import ContactsIcon from '@mui/icons-material/Contacts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DiscountIcon from '@mui/icons-material/Discount';

const ListMenu = ({toggleDrawer , anchor , device}) => {
  return (
                <Box
                    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250  , justifyContent: 'center' ,alignItems:"center" , mt:anchor === 'bottom' ? 0 : "50%" , fontSize:20}}
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                >
                    <List>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon sx={{color:"#000"}} />
                                </ListItemIcon>
                                <ListItemText primary={"หน้าแรก"} sx={{color:"#000"}} />
                            </ListItem>
                        </Link>
                        <Link to={'/shop'} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ShoppingBagIcon sx={{color:"#000"}} />
                                </ListItemIcon>
                                <ListItemText primary={"สินค้า"} sx={{color:"#000"}} />
                            </ListItem>
                        </Link>
                        <Link to={'/promotion'} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <DiscountIcon sx={{color:"#000"}} />
                                </ListItemIcon>
                                <ListItemText primary={"โปรโมชั่น"} sx={{color:"#000"}} />
                            </ListItem>
                        </Link>
                        <Link to={'/blog'} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                    <ListItemIcon>
                                        <RssFeedIcon sx={{color:"#000"}} />
                                    </ListItemIcon>
                                <ListItemText primary={"ข่าวสาร | บล๊อค"} sx={{color:"#000"}} />
                            </ListItem>
                         </Link>
                         <Link to={'/contact'} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                    <ListItemIcon>
                                        <ContactsIcon sx={{color:"#000"}} />
                                    </ListItemIcon>
                                <ListItemText primary={"ติดต่อเรา"} sx={{color:"#000"}} />
                            </ListItem>
                         </Link>
                         {
                             device ? 
                             <>
                             <Link to={'/login-register'} style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                        <ListItemIcon>
                                            <LoginIcon sx={{color:"#000"}} />
                                        </ListItemIcon>
                                    <ListItemText primary={"เข้าสู่ระบบ"} sx={{color:"#000"}} />
                                </ListItem>
                            </Link>
                            <Link to={'/login-register'} style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                        <ListItemIcon>
                                            <HowToRegIcon sx={{color:"#000"}} />
                                        </ListItemIcon>
                                    <ListItemText primary={"สมัครสมาชิก"} sx={{color:"#000"}} />
                                </ListItem>
                            </Link>
                            </>
                            :null
                         }
                         
                    </List>
                    <Divider />
                    <Box display="flex" justifyContent="flex-end">
                            <ListItem button>
                                    <ListItemIcon>
                                            <CancelPresentationIcon sx={{color:"#000"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Close Menu"} />
                        </ListItem>
                    </Box>
                    
                
                </Box>
  )
}

export default ListMenu