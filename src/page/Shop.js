import React , {useContext , useState , useEffect} from "react";
import { ThemeProvider } from '@mui/material/styles';
import DataContext from '../context/DataContext'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HeaderOther from "../layout/HeaderOther";
import BreadCrumbPage from "../component/Breadcrumbs/BreadCrumbPage";
import ShopList from "../wrappers/Shop/ShopList";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOtherPage from "../layout/HeaderOtherPage";
import FooterOther from "../layout/FooterOther";

const Shop = () => {

    const {relateProduct , theme , styles , toggleDrawer , menuBar , listWishList ,listCompare} = useContext(DataContext)

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

      useEffect(() => {
          localStorage.setItem('relateproduct', JSON.stringify(relateProduct));
     },[relateProduct])

     useEffect(() => {
         localStorage.setItem("wishlist" , JSON.stringify(listWishList));
     },[listWishList])

     useEffect(() => {
      localStorage.setItem("compare" , JSON.stringify(listCompare));
    },[listCompare])

     

  return (<ThemeProvider theme={theme}>
                <Grid
                sx={{ flexGrow: 1 , m:-1 ,pt:0}}
                >
                <HeaderOther/>
                <Box sx={{ flexGrow: 1  , mt:0 , mb:0 , backgroundColor:"#f5f5f5"}}>
                <HeaderOtherPage ScreenXl={ScreenXl} id={id} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                <BreadCrumbPage pagename={"สินค้า"} />
                 <ShopList />
                </Box>
                <FooterOther bgStyle={styles.bgFooter} />
                </Grid>
        </ThemeProvider>
  )
}

export default Shop