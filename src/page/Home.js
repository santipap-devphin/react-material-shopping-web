import React, { useEffect, useState , useContext} from "react";
import {Container , Stack,  Box ,Typography ,IconButton , Paper , Grid} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import data from '../data/testimonial/testimonial-one.json';
import listitem from '../data/product/products.json'
import DataContext from "../context/DataContext";
import Header from "../layout/Header";
import SectionHomeMain from "../wrappers/Home/SectionHomeMain";
import ProductRecom from "../wrappers/Home/ProductRecom";
import ShippingDetail from "../wrappers/Home/ShippingDetail";
import JoinWithUs from "../wrappers/Home/JoinWithUs";
import ProductFooter from "../wrappers/Home/ProductFooter";
import Swipers from "../component/Swiper/Swipers";
import FeaturedCard from "../component/Card/FeaturedCard";
import SnackBars from "../component/Snackbar/SnackBars";
import Footer from "../layout/Footer";
import imgprotest from './../assets/imgprotest.png';
import imgback from './../assets/imgtestback.jpg';

const Home = () => {

    const {menuBar  
          , scroll  
          , headerTop 
          , pos , toggleDrawer , handleTop , myRef
          , items, setItems , theme , styles  
          , listCartProduct , setListCartProduct, listWishList , setListWishList
    } = useContext(DataContext)

    const [showItem , setShowItem] = useState(listitem[0].new);

    const menuId = 'primary-search-account-menu';

    const [activeTabs , setActiveTabs] = useState({active:0});
    
    const [LoadAlert , setLoadAlert] = useState(false);

    const [open, setOpen] = useState(false);

    const [statuss, setStatuss] = useState(null);

    const [textMsg, settextMsg] = useState('');

    const [changeStyleTab , setChangeStyleTab] = useState([
      {
        id:0,
        active:true,
        
      },
      {
        id:1,
        active:false,
        
      },
      {
        id:2,
        active:false,
        
      }
  ]);

    //localStorage.removeItem("relateproduct");
    const handleChange = (event, newItem) => {
       if(newItem === 0){
            setItems(newItem);
            setShowItem(listitem[0].new)
            //setChangeStyleTab({...changeStyleTab , active:true});
            //setChangeStyleTab({...changeStyleTab , style:{backgroundColor:"#e90042"}});
          
       }
       else if(newItem === 1){
            setItems(newItem);
            setShowItem(listitem[1].best)

      }
      else{
          setItems(newItem);
          setShowItem(listitem[2].sale)
      }

      const findlist = changeStyleTab.filter((data) => {

            if(data.id === newItem){

                data.active  = true;

            }else{
                 data.active  = false;
            }
            return data;

      })

      
      setChangeStyleTab(findlist);
      setActiveTabs({active:newItem})
     
    };
    useEffect(() => {

        document.getElementById("tab-"+activeTabs.active).setAttribute("style", "font-weight:800"); 

    },[activeTabs])
    useEffect(() => {

      localStorage.setItem('cartproduct', JSON.stringify(listCartProduct));
 
   },[listCartProduct])
 
   useEffect(() => {
 
    localStorage.setItem('wishlist', JSON.stringify(listWishList));
 
   },[listWishList])

    return (
    <ThemeProvider theme={theme}>
    <div ref={myRef}></div>
    <Grid
      sx={{ flexGrow: 1 , m:-1 ,pt:0}}
     >
      
       <Header menuId ={menuId} scroll={scroll} headerTop={headerTop} toggleDrawer={toggleDrawer} menuBar={menuBar}/>               
       <SectionHomeMain stylePaper={styles.paperContainer} />  

          <section>
          <Box  sx={{ flexGrow: 1 }}>
                <Paper elevation={0} style={{backgroundColor:"#202C45" ,paddingTop:"70px"}}> 
                
                 <ProductRecom cardBg={styles.cardBg} menuId={menuId}/>
                 <Typography
                      style={{color:"white" , marginTop:"70px"}}
                      component="h2"
                      variant="h2"
                      align="center"
                      color="text.primary"
                      gutterBottom
                      className="useFontKanit"
                    >
                        รายละเอียดสินค้า

                   </Typography>

                   <Tabs value={items} onChange={handleChange} centered>
                        <Tab id="tab-0" label="สินค้ามาใหม่" sx={
                            changeStyleTab[0].active ?
                            {backgroundColor:"#E5E5E5" , color:"#fff",fontSize:22}
                            :{color:"#fff",fontSize:22}
                        }
                        />
                        <Tab id="tab-1" label="สินค้าขายดี" sx={
                            changeStyleTab[1].active ?
                            {backgroundColor:"#E5E5E5" , color:"#fff",fontSize:22}
                            :{color:"#fff",fontSize:22}
                        } />
                        <Tab id="tab-2" label="สินค้าลดราคา" sx={
                            changeStyleTab[2].active ?
                            {backgroundColor:"#E5E5E5" , color:"#fff",fontSize:22}
                            :{color:"#fff",fontSize:22}
                        } />
                  </Tabs>

                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={{ xs: 3, sm: 2, md: 4 }}>

                             {showItem.map((vals, i) => {
                                   
                                   return <FeaturedCard 
                                                key={i} 
                                                listCartProduct={listCartProduct} 
                                                setListCartProduct={setListCartProduct} 
                                                listWishList = {listWishList} 
                                                setListWishList={setListWishList} 
                                                setLoadAlert={setLoadAlert}
                                                setOpen={setOpen}
                                                setStatuss={setStatuss}
                                                settextMsg={settextMsg}
                                                prdId = {vals.id} 
                                                prdTitle ={vals.productTitle} 
                                                prdImage ={vals.image} 
                                                prdPrice ={vals.productPrice} 
                                                prdPriceLast={vals.productPriceLast} 
                                                textWhite={styles.textWhite} />

                                }
                                  
                              )}
                  </Stack>
                  <ShippingDetail bgShip={styles.bgShip}/>
                    <Container>
                          <JoinWithUs />
                          <ProductFooter menuId={menuId} cardfooter={styles.cardfooter}/>

                    </Container>
                     <Container>
                          <Grid item lg={6} md={6} justifyContent="center" alignItems="center" sx={{mt:"70px" , pb:"70px"}}>
                                              {/*console.log(data)*/}
                              <Swipers data={data} />
                           </Grid>
                           <IconButton
                              style={{
                              position: "fixed",
                              bottom: 10,
                              right: 10,
                              display: pos ? "block" : "none"
                              ,color:"red"
                              ,backgroundColor:"#fff"
                              }}
                              onClick={handleTop}
                            >
                            <KeyboardArrowUpIcon />
                            </IconButton>
                      </Container>

                 </Paper>
          </Box>
          {
            LoadAlert ? <SnackBars opens={open} status={statuss} textMess={textMsg} /> : null
          }
          </section>
           <Footer bgStyle={styles.bgFooter} />
         </Grid>
    </ThemeProvider>
  )
}

export default Home