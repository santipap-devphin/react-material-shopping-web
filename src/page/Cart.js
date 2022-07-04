import React , {useContext , useState , useEffect} from 'react'
import { ThemeProvider} from '@mui/material/styles';
import DataContext from '../context/DataContext'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOther from '../layout/HeaderOther';
import HeaderOtherPage from '../layout/HeaderOtherPage';
import BreadCrumbPage from '../component/Breadcrumbs/BreadCrumbPage';
import TableCart from '../component/Table/TableCart';
import CardShipping from '../component/Card/CardShipping';
import FooterOther from '../layout/FooterOther';


const Cart = () => {

    const {theme , styles , toggleDrawer , menuBar , listCartProduct} = useContext(DataContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
          setAnchorEl(null);
      };
    
    const [alignment, setAlignment] = useState(null);

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const ScreenXl = useMediaQuery('(min-width:1537px)');

    const MobileDetact = useMediaQuery('(min-width:1537px)');

    //console.log(window.screen.availWidth)
    const [ship, setShip] = useState('');

    const handleChangedata = (event) => {
        setShip(event.target.value);
    };

    useEffect(() => {

      localStorage.setItem('cartproduct', JSON.stringify(listCartProduct));

    },[listCartProduct])

  return (
    <ThemeProvider theme={theme}>
       <Grid
        sx={{ flexGrow: 1 , m:-1 ,pt:0}}
      >
        <HeaderOther/>
          <Box sx={{ flexGrow: 1  , mt:0 , backgroundColor:"#f5f5f5"}}>
                    
              <HeaderOtherPage ScreenXl={ScreenXl} id={id} open={open} anchorEl ={anchorEl} handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
              <BreadCrumbPage pagename={"ตระกร้าสินค้า"} />
              <TableCart alignment={alignment} setAlignment={() => setAlignment}/>
              <CardShipping data={ship} handleChangedata={handleChangedata} />
                      
          </Box>
        <FooterOther bgStyle={styles.bgFooter} />
      </Grid>
     </ThemeProvider>
  )
}

export default Cart