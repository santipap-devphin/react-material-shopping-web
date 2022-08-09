import React from 'react';
import {Grid , Stack ,Typography ,Button , IconButton} from "@mui/material";
import { Link , useNavigate  } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductListFirstRow = ({data , listWishList , setListWishList , listCompare , setListCompare, setOpenAlert , setStatuss , settextMsg , setLoadAlert}) => {

    let navigate = useNavigate();

    const haddleUrl = (id) => {

        navigate(`/product/${id}`)
    }
   
    const handlefavorite = () => {

        let newObj = {};
        
        if(listWishList !== null){

            const findSame = listWishList.find((product) => product.prdId === data.id);
            if(findSame !== undefined){

                setOpenAlert(true);  
                setStatuss('warning');
                settextMsg(`คุณได้สนใจสินค้า ${data.productTitle} ชิ้นนี้ไปแล้ว`);
                setLoadAlert(true);
                
                return;

            }else{

                newObj = {

                    prdId:data.id,
                    prdTitle:data.productTitle,
                    prdImage:data.image,
                    prdPrice:data.productPrice,
                    prdPriceLast:data.productPriceLast,
                    qty:1

                }

                setListWishList([...listWishList , newObj]);

                setOpenAlert(true);  
                setStatuss('success');
                settextMsg(`คุณได้สนใจสินค้า ${data.productTitle}`);
                setLoadAlert(true);


                console.log('favorite' , data)

            }
         }else{

                newObj = {

                    prdId:data.id,
                    prdTitle:data.productTitle,
                    prdImage:data.image,
                    prdPrice:data.productPrice,
                    prdPriceLast:data.productPriceLast,
                    qty:1

                }
                setListWishList([newObj]);

                setOpenAlert(true);  
                setStatuss('success');
                settextMsg(`คุณได้สนใจสินค้า ${data.productTitle}`);
                setLoadAlert(true);

        }
    }
    const handleCompare = () => {

        let objCompare = {};

        if(listCompare !== null){

            const findCompare = listCompare.find((item) => item.prdId === data.id);
            if(findCompare !== undefined){

                setOpenAlert(true);  
                setStatuss('warning');
                settextMsg(`คุณมีสินค้า ${data.productTitle} ในตารางเปรียบเทียบแล้ว`);
                setLoadAlert(true);

                return;


            }else{

                objCompare = {
                    prdId:data.id,
                    prdTitle:data.productTitle,
                    prdDes:data.productDes,
                    prdImage:data.image,
                    prdPrice:data.productPrice,
                    prdPriceLast:data.productPriceLast,
                    prdRating:data.productRating,
                    qty:1
                    }

                    setListCompare([...listCompare , objCompare]);

                    setOpenAlert(true);  
                    setStatuss('success');
                    settextMsg(`คุณเพิ่มสินค้า ${data.productTitle} ในตารางเปรียบเทียบแล้ว`);
                    setLoadAlert(true);
                 }
        }else{

             objCompare = {
                                prdId:data.id,
                                prdTitle:data.productTitle,
                                prdDes:data.productDes,
                                prdImage:data.image,
                                prdPrice:data.productPrice,
                                prdPriceLast:data.productPriceLast,
                                prdRating:data.productRating,
                         }

            setListCompare([objCompare]);
            setOpenAlert(true);  
            setStatuss('success');
            settextMsg(`คุณเพิ่มสินค้า ${data.productTitle} ในตารางเปรียบเทียบแล้ว`);
            setLoadAlert(true);


        }
    }


  return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{p:2}}>
            
            <Grid container spacing={2} sx={{backgroundColor:"#fff", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"}}>
                    <Grid item xs={12} md={4} sx={{pb:1.5}}>
                        <Link to={`/product/${data.id}`}>
                        <img
                                src={`${data.image}`}
                                alt={`imglist-${data.id}`}
                                width="100%"
                                loading="lazy"
                        />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                                <Link to={`/product/${data.id}`} style={{ textDecoration: 'none' , color:"#000" }}>
                                    <Typography variant='h5'>{data.productTitle}</Typography>
                                </Link>
                                <Typography variant='h5' sx={{color:"#000"}}>ราคา <span>350</span><span style={{textDecoration:"line-through" , marginLeft:"30px" ,color:"#E81C2E"}}>700</span></Typography>
                                <Stack direction="row" sx={{color:"goldenrod"}}>

                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarHalfIcon />
                                    
                                </Stack>
                                <Typography variant='p' component="div" sx={{pt:2 , pb:2 , color:"#000"}}>
                                    {data.productDes}
                                </Typography>
                                <Stack direction="row" sx={{pt:2}}>
                                    <Button variant="contained" onClick={() => haddleUrl(data.id)}><ArrowForwardIosIcon sx={{fontSize:12}} />
                                        รายละเอียด
                                    </Button>
                                    <IconButton onClick={handlefavorite} >
                                        <FavoriteBorderIcon sx={{color:"#000"}} />
                                    </IconButton>
                                    <IconButton onClick={handleCompare} >
                                        <ShuffleIcon sx={{color:"#000"}} />
                                    </IconButton>
                                </Stack>
                        </Stack>
                    </Grid>
            </Grid>
           
        </Stack>
  )
}

export default ProductListFirstRow