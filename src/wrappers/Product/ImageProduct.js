import React , { Fragment, useState , useEffect , useContext } from 'react';
import {
    LightgalleryProvider,
    LightgalleryItem,
    useLightgallery
  } from "react-lightgallery";
import { Swiper, SwiperSlide } from "swiper/react";
import DataContext from '../../context/DataContext';
import { FreeMode, Navigation, Thumbs } from "swiper";
import {Container , Stack,  Box ,Typography ,Button ,IconButton , Grid , Divider } from "@mui/material";
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import StarIcon from '@mui/icons-material/Star';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

  const ImageProduct = ({product}) => {

  const [alignment, setAlignment] = useState(null);

  const {listCartProduct , setListCartProduct} = useContext(DataContext);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [qtys , setQtys] = useState(1);

  const [openAlert, setOpenAlert] = useState(false);

  const [statuss, setStatuss] = useState(null);

  const [textMsg, settextMsg] = useState('');

  const [sWarning, setsWaring] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {

    console.log(listCartProduct);

    
    if(listCartProduct === null) return;
    const checkQty = listCartProduct.find(list => list.prdId === product.id);
    if(checkQty === undefined){
          setsWaring(false);
    }else{

          setQtys(checkQty.qty)
          setsWaring(true);
    }
    
   },[sWarning])
    
  const OpenButtonWithHook = props => {
        
  const { openGallery } = useLightgallery();

        
        
        return (
          <Button 
            {...props}
            onClick={() => openGallery("any")}
            className={["button is-primary", props.className || ""].join(" ")}
            style={{position:"absolute" , zIndex:2 , marginTop:10,marginLeft:10}}
          >
            <ZoomInMapIcon sx={{fontSize:36}} />
          </Button >
        );
      };

      const PhotoItem = ({image, thumb, group }) => (
        
          <LightgalleryItem group={group} src={image} thumb={thumb}>
                <img src={image} style={{ width: "100%" }} alt={`lightgalleryitem`} />
          </LightgalleryItem>
       
      );

      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
     });

      const handleChange = (event, newAlignment) => {
        if(newAlignment !== "input"){
          setAlignment(newAlignment);
        }
        else{
          setAlignment(null);
        }
        
      };
    const handdleplusQty =  () => {

        //const addList = listCartProduct.find(lists => lists.prdId === id);

         let newQty = qtys;

         newQty++;

          setQtys(newQty);
    }
    const handleSubQty = () => {

        let newQty = qtys;

        if(newQty !== 1){

          newQty--;

        }
        setQtys(newQty);
    }
    const btnAddCart = (id) => {

      const addList = listCartProduct.find(lists => lists.prdId === id);

      //console.log(addList)

      if(addList === undefined){

        const newsProduct = {
            prdId:product.id,
            prdTitle:product.productTitle,
            prdImage:product.image,
            prdPrice:product.productPrice,
            prdPriceLast:product.productPriceLast,
            qty:qtys
         }

          setListCartProduct([...listCartProduct , newsProduct]);

      }else{

        const reMapData = listCartProduct.map(lists => {

             if(lists.prdId === id){

                  lists.qty = qtys;
              
             }

             return lists;

        });

        //console.log(reMapData)

        setListCartProduct(reMapData);
        settextMsg(`คุณได้เพิ่มสินค้า ${product.productTitle} ลงไปในตระกร้า`)
        setStatuss('success');
        setOpenAlert(true)
       }

    }
 
    return (
    <Fragment >
        <Container>
        
        <Snackbar open={openAlert} autoHideDuration={2500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={statuss} sx={{ width: '100%' }}>
                         {textMsg}
                    </Alert>
         </Snackbar>
        <Box sx={{flexGrow:1 , mt:10 , backgroundColor:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , color:"#000"}}>
              
              <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 8, md: 8 }}>
                      <Grid item xs={12} sm={6}>
                      <LightgalleryProvider>

                      <OpenButtonWithHook />
                      <Swiper
                            style={{
                            "--swiper-navigation-color": "#fdbe33",
                            "--swiper-pagination-color": "#fdbe33",
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                    >

                       {product.imageList.map((p, idx) => 
                       
                            { 
                                return (
                                        <SwiperSlide key={idx}>
                                              <PhotoItem key={idx} image={p} group="any" style={{display:"none"}} />
                                              <img src={p} style={{ width: "100%" , position:"absolute"}} alt={`img-gallery=${idx}`} />
                                        </SwiperSlide>)
                            }
                        )
                        }
                    </Swiper>
                   
                    </LightgalleryProvider>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                        style={{marginTop:"20px"}}
                    >
                    {product.imageList.map((p, idx) => (
                            <SwiperSlide key={idx}>
                            <img src={p} alt={`img-swiper-${idx}`} />
                            </SwiperSlide>        
                        ))}
    
                    </Swiper>
                
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Stack spacing={2} sx={{m:3}}>
                              <Typography variant="h4" component="div" sx={{ flexGrow: 1  ,textAlign:"left" }}>
                                      {product.productTitle}
                              </Typography>
                               <Typography variant="h6" component="div" sx={{ flexGrow: 1  ,textAlign:"left" }}>
                                     ราคา <span style={{fontSize: "24px" , marginLeft:10, marginRight:20 , color: "#e90042"}}>{product.productPriceLast}</span>
                                          <span style={{textDecoration: "line-through", fontSize: "18px" , marginRight: "10px" , color: "#000"}}>{product.productPrice}</span> 
                                           
                              </Typography>
                              <Stack direction="row" sx={{color:"goldenrod"}}>
                                  <StarIcon />
                                  <StarIcon />
                                  <StarIcon />
                                  <StarIcon />
                              </Stack>
                          
                              <Typography variant="p" component="div" sx={{fontSize:16}}>
                                  {product.productDes}
                              </Typography>
                              {
                                sWarning ? <Alert severity="warning" sx={{width:"80%"}}>คุณมีสินค้านี้ในตระกร้าอยู่แล้ว หากต้องการเพิ่ม กรุณาเพิ่มจำนวน</Alert> : null
                              }
                               <Divider sx={{pt:3}} />
                              <Stack sx={{pt:3}} direction="row" spacing={2}>
                                  <ToggleButtonGroup
                                                    color="primary"
                                                    value={alignment}
                                                    exclusive
                                                    onChange={handleChange}
                                                    >
                                                    <ToggleButton value="dels" onClick={handleSubQty}>-</ToggleButton>
                                                    <ToggleButton value="input" sx={{width:40}}>{qtys}</ToggleButton>
                                                    <ToggleButton value="plus" onClick={handdleplusQty}>+</ToggleButton>
                                    </ToggleButtonGroup>
                                    <Button variant="contained" onClick={() => btnAddCart(product.id)}>เพิ่มลงตระกร้า</Button>
                                    <IconButton color="primary" aria-label="favoritecart">
                                          <FavoriteBorderIcon sx={{color:"#e81c2e"}} />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="shuffleicon">
                                          <ShuffleIcon sx={{color:"#e81c2e"}} />
                                    </IconButton>
                               </Stack>
                               <Typography variant="p" component="div" sx={{fontSize:16}}>
                                    Categories : 
                              </Typography>
                              <Typography variant="p" component="div" sx={{fontSize:16}}>
                                    Tag : 
                              </Typography>

                          </Stack>
                     </Grid>
              </Grid>
         </Box>
         </Container>
     </Fragment>
    )
}

export default ImageProduct