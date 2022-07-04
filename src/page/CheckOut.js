import React , {useContext , useState , useEffect} from 'react'
import { ThemeProvider} from '@mui/material/styles';
import DataContext from '../context/DataContext'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOther from '../layout/HeaderOther';
import HeaderOtherPage from '../layout/HeaderOtherPage';
import BreadCrumbPage from '../component/Breadcrumbs/BreadCrumbPage';
import SecCheckOutMain from '../wrappers/Checkout/SecCheckOutMain';
import FooterOther from '../layout/FooterOther';


const CheckOut = () => {

  const {theme , styles , toggleDrawer , menuBar} = useContext(DataContext)

   const [anchorEl, setAnchorEl] = useState(null);

   const ScreenXl = useMediaQuery('(min-width:1537px)');

   const open = Boolean(anchorEl);

   const id = open ? 'simple-popover' : undefined;

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
                <HeaderOtherPage ScreenXl={ScreenXl} id={id} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                <BreadCrumbPage pagename={"สั้งซื้อสินค้า"} />
                 <SecCheckOutMain />
                </Box>
                <FooterOther bgStyle={styles.bgFooter} />
                </Grid>
            </ThemeProvider>
        )
}

export default CheckOut