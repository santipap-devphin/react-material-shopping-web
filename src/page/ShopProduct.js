import React , {useContext , useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import DataContext from '../context/DataContext'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HeaderOther from "../layout/HeaderOther";
import BreadCrumbPage from "../component/Breadcrumbs/BreadCrumbPage";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOtherPage from "../layout/HeaderOtherPage";
import FooterOther from "../layout/FooterOther";
import ImageProduct from "../wrappers/Product/ImageProduct";
import DesProduct from "../wrappers/Product/DesProduct";
import RelatedProduct from "../wrappers/Product/RelatedProduct";


const ShopProduct = () => {

    //localStorage.removeItem("relateproduct");

    const {id} = useParams();

    const {theme , styles , toggleDrawer , menuBar , reData , relateProduct , setRelateProduct} = useContext(DataContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const ScreenXl = useMediaQuery('(min-width:1537px)');

    const Screensm = useMediaQuery('(max-width:768px)');
    const open = Boolean(anchorEl);

    const ids = open ? 'simple-popover' : undefined;


    const finds = reData.find((item) => item.id === id);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        //console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    useEffect(()=> {

        //console.log(finds)

        window.scrollTo({top:0}) 

        if(finds === undefined) return;
        if(relateProduct === null || relateProduct[0] === null){

            setRelateProduct([finds])
           


        }else{

            const checkSame = relateProduct.find((data) => data.id === id);

            if(checkSame === undefined){

                setRelateProduct([...relateProduct , finds])
    
            }

        }
        
        
        
    },[])

    useEffect(() => {

        

        //localStorage.removeItem("relateproduct");
        localStorage.setItem('relateproduct', JSON.stringify(relateProduct));
       //console.log(relateProduct)

        //console.log("inin");

        
        

    }, [relateProduct])

    console.log(relateProduct)
    

    return (<ThemeProvider theme={theme}>
                <Grid
                sx={{ flexGrow: 1 , m:-1 ,pt:0}}
                >
                <HeaderOther/>
                <Box sx={{ flexGrow: 1  , mt:0 , mb:0 , backgroundColor:"#f5f5f5"}}>
                <HeaderOtherPage ScreenXl={ScreenXl} id={ids} open={open} anchorEl ={anchorEl}  handleClose={handleClose} handleClick={handleClick} menuBar={menuBar} toggleDrawer={toggleDrawer} />
                <BreadCrumbPage pagename={"รายละเอียดสินค้า"} />
              
                {
                    finds ? 
                    <>
                    <ImageProduct product={finds} /> 
                    <DesProduct product={finds} sizes={Screensm} />
                    </>
                    : 
                    null
                }
                {
                     relateProduct !== null && relateProduct[0] !== null  ? <RelatedProduct data={relateProduct} styles={styles.textBlack}/> : null
                }
                {/*  */}
                </Box>
                <FooterOther bgStyle={styles.bgFooter} />
                </Grid>
            </ThemeProvider>)
    }

export default ShopProduct