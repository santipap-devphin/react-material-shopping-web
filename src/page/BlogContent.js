import React , {useContext , useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import DataContext from '../context/DataContext'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HeaderOther from "../layout/HeaderOther";
import BreadCrumbPage from "../component/Breadcrumbs/BreadCrumbPage";
import MainContent from "../wrappers/BlogContent/MainContent";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOtherPage from "../layout/HeaderOtherPage";
import FooterOther from "../layout/FooterOther";

const BlogContent = () => {
    const {theme , styles , toggleDrawer , menuBar} = useContext(DataContext)

    const {id} = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const ScreenXl = useMediaQuery('(min-width:1537px)');
    const open = Boolean(anchorEl);
    const ids = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    

  return(<ThemeProvider theme={theme}>
            <Grid
                sx={{ flexGrow: 1 , m:-1 ,pt:0}}
            >
                <HeaderOther/>
                <Box sx={{ flexGrow: 1  , mt:0 , mb:5}}>
                    <HeaderOtherPage ScreenXl={ScreenXl} id={ids} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                    <BreadCrumbPage pagename={"รายละเอียดบล็อก"} />
                    <MainContent id={id} />
                </Box>
                <FooterOther bgStyle={styles.bgFooter} />
            </Grid>
        </ThemeProvider>)
}

export default BlogContent