import React , {useContext , useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import DataContext from '../context/DataContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HeaderOther from "../layout/HeaderOther";
import BreadCrumbPage from "../component/Breadcrumbs/BreadCrumbPage";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOtherPage from "../layout/HeaderOtherPage";
import FooterOther from "../layout/FooterOther";
import { Typography } from "@mui/material";

const NotFound = () => {

    let navigate = useNavigate();
    const {theme , styles , toggleDrawer , menuBar} = useContext(DataContext)

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
    const goBackPage = () => {

        //navigate(-1);
        navigate('/');

    }
    
    
    return (<ThemeProvider theme={theme}>
        <Grid
            sx={{ flexGrow: 1 , m:-1 ,pt:0}}
        >
            <HeaderOther/>
            <Box sx={{ flexGrow: 1  , mt:0 , mb:5}}>
                <HeaderOtherPage ScreenXl={ScreenXl} id={ids} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                <BreadCrumbPage pagename={"ไม่มีหน้านี้"} />
                <Stack textAlign="center" sx={{pt:5}}>
                    <Typography variant="h3">Not Found</Typography>
                    <Typography variant="h5"><Button onClick={goBackPage}>กลับหน้าหลัก</Button></Typography>
                </Stack>
                
            </Box>
            <FooterOther bgStyle={styles.bgFooter} />
        </Grid>
     </ThemeProvider>)
}

export default NotFound