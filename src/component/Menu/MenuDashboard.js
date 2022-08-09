import React  ,{useState} from 'react';
import { Stack , Box  } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChatIcon from '@mui/icons-material/Chat';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DiscountIcon from '@mui/icons-material/Discount';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MailIcon from '@mui/icons-material/Mail';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GradingIcon from '@mui/icons-material/Grading';
import StyleIcon from '@mui/icons-material/Style';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import PaymentsIcon from '@mui/icons-material/Payments';

const MenuDashboard = () => {

 const [open, setOpen] = useState(true);

 const [openReport , setOpenReport] = useState(true);

 const pathname = window.location.pathname

 console.log(pathname)

 const handleClick = () => {
    setOpen(!open);
  };
  const handleClickReport = () => {
    setOpenReport(!openReport);
  };
  return ( <Box sx={{ width: '100%'
            , height:parseInt(window.screen.availHeight) -150
            , maxWidth: 120 
            , bgcolor: 'background.paper' 
            , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" 
            , transformStyle: "preserve-3d" 
            , position:"fixed"
            , mt:6.5
            , overflow:"auto"
            ,'&::-webkit-scrollbar': {
                width: '0.3em'
                },
                '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '0px solid slategrey'
                }
            }}
            >
            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            >
                
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <DashboardIcon  />
                        </ListItemIcon>
                        <ListItemText primary="DashBoard" />
                    </Link>
                </Stack>
                
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/orders" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/orders"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </Link>
                </Stack>
            </ListItemButton>
            {/*<ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/confirm" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/confirm"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <ConfirmationNumberIcon />
                        </ListItemIcon>
                        <ListItemText primary="ConFirm" />
                    </Link>
                </Stack>
            </ListItemButton>*/}
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/shipping" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/shipping"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <LocalShippingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shipping" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/chat" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/chat"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/inbox" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/inbox"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton onClick={handleClickReport} sx={{justifyContent:"center"}}>
                <Stack spacing={1} textAlign="center" alignItems="center">
                    <ListItemIcon sx={{justifyContent:"center"}}>
                            <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                    {openReport ? <ExpandLess  /> : <ExpandMore />}
                </Stack>
            </ListItemButton>
            <Collapse in={openReport} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/reportproduct" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/reportproduct"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Product" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                </List>
                
                <List component="div" disablePadding>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/reportproductsale" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/reportproductsale"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <ReceiptIcon />
                                </ListItemIcon>
                                <ListItemText primary="ProductSale" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                </List>

            </Collapse>
            <ListItemButton onClick={handleClick} sx={{justifyContent:"center"}}>
                <Stack spacing={1} textAlign="center" alignItems="center">
                    <ListItemIcon sx={{justifyContent:"center"}}>
                            <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Setting" />
                    {open ? <ExpandLess  /> : <ExpandMore />}
                </Stack>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/category" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/category"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Category" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/sizeproduct" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/sizeproduct"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <GradingIcon />
                                </ListItemIcon>
                                <ListItemText primary="Unit" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/product" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/product"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <InventoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Product" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/supply" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/supply"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <StoreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Supply" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/blog" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/blog"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <BookIcon />
                                </ListItemIcon>
                                <ListItemText primary="Blog" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/promotion" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/promotion"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <CardMembershipIcon />
                                </ListItemIcon>
                                <ListItemText primary="Promotion" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/payment" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/payment"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <PaymentsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Payment" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/coupon" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/coupon"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <DiscountIcon />
                                </ListItemIcon>
                                <ListItemText primary="Coupon" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/tags" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/tags"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <StyleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tags" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    </List>
            </Collapse>
            </List>
            </Box>
  )
}

export default MenuDashboard