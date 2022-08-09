import React , {useState , useContext} from 'react';
import DataContext from '../../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import BreadCrumbPage from '../../component/Breadcrumbs/BreadCrumbPage';
import HeaderOtherPage from "../../layout/HeaderOtherPage";
import FooterOther from "../../layout/FooterOther";
import HeaderOther from '../../layout/HeaderOther';

const MainBlock = ({titlepage , children}) => {
  
  const {theme , styles , toggleDrawer , menuBar} = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const ScreenXl = useMediaQuery('(min-width:1537px)');
  const open = Boolean(anchorEl);
  const id = open ? 'popover-cart' : undefined;
  const handleClose = () => {
    setAnchorEl(null);
};
const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
};

  return (<ThemeProvider theme={theme}>
            <Grid  sx={{ flexGrow: 1 , m:-1 ,pt:0}}>
                <HeaderOther/>
                <Box sx={{ flexGrow: 1  , mt:0 , mb:0 , backgroundColor:"#f5f5f5"}}>
                    <HeaderOtherPage ScreenXl={ScreenXl} id={id} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                    <BreadCrumbPage pagename={titlepage} />
                        {children}
                </Box>
                <FooterOther bgStyle={styles.bgFooter} />
            </Grid>
          </ThemeProvider>
  )
}

export default MainBlock