import React  from 'react';
import { Link } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardMedia';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FeaturedCard = ({
              listCartProduct 
            , setListCartProduct 
            , listWishList 
            , setListWishList 
            , setLoadAlert 
            , setOpen
            , setStatuss
            , settextMsg
            , prdId 
            , prdTitle 
            , prdImage
            , prdPrice 
            , prdPriceLast 
            , textWhite}) => {

  // console.log(listCartProduct)
  const pages = window.location.pathname;

  const haddleAddCart = () => {

       //console.log(listCartProduct)
       let findId;

       if(listCartProduct !== null){

             findId =  listCartProduct.find(item => item.prdId === prdId);

             if(findId){

              setOpen(true);
              setStatuss('warning');
              settextMsg(`คุณได้เพิ่มสินค้า ${prdTitle} ชิ้นนี้ไปแล้ว`);
              setLoadAlert(true);
              setTimeout(function() {setLoadAlert(false); }, 2600);
              return;

              }else{

               const newsProduct = {
                    prdId:prdId,
                    prdTitle:prdTitle,
                    prdImage:prdImage,
                    prdPrice:prdPrice,
                    prdPriceLast:prdPriceLast,
                    qty:1
                }
                setListCartProduct([...listCartProduct , newsProduct]);

                setStatuss('success');

                settextMsg(`คุณได้เพิ่มสินค้า ${prdTitle} ลงในตะกร้าเรียบร้อย`);

                setOpen(true);

                setLoadAlert(true);
                setTimeout(function() {setLoadAlert(false); }, 2600);


            }

       }else{

        const newsProduct = {
                prdId:prdId,
                prdTitle:prdTitle,
                prdImage:prdImage,
                prdPrice:prdPrice,
                prdPriceLast:prdPriceLast,
                qty:1
         }

         setListCartProduct([newsProduct]);

         setStatuss('success');

         settextMsg(`คุณได้เพิ่มสินค้า ${prdTitle} ลงในตะกร้าเรียบร้อย`);

         setOpen(true);

         setLoadAlert(true);
         setTimeout(function() {setLoadAlert(false); }, 2600);

       }
  }

  const handdleAddWishlist =  () => {

      let newsObj = {};

      if(listWishList !== null){

        const checkWish = listWishList.find((item) => item.prdId === prdId);
        if(checkWish !== undefined){

              setStatuss('warning');

              settextMsg(`คุณได้กด สนใจสินค้า ${prdTitle} นี้ไปแล้ว `);

              setOpen(true);

              setLoadAlert(true);

              setTimeout(function() {setLoadAlert(false); }, 2600);

              return;


        }else{

          newsObj = { prdId:prdId,
              prdTitle:prdTitle,
              prdImage:prdImage,
              prdPrice:prdPrice,
              prdPriceLast:prdPriceLast,
              qty:1
          }

          setListWishList([...listWishList , newsObj]);

          setStatuss('success');

          settextMsg(`คุณได้กด สนใจสินค้า ${prdTitle} สำเร็จ `);
 
          setOpen(true);

          setLoadAlert(true);

          setTimeout(function() {setLoadAlert(false); }, 2600);

         }

       }else{

        newsObj = { prdId:prdId,
                    prdTitle:prdTitle,
                    prdImage:prdImage,
                    prdPrice:prdPrice,
                    prdPriceLast:prdPriceLast,
                    qty:1
                  }

         setListWishList([newsObj]);

         setStatuss('success');

         settextMsg(`คุณได้กด สนใจสินค้า ${prdTitle} สำเร็จ `);

         setOpen(true);

         setLoadAlert(true);

         setTimeout(function() {setLoadAlert(false); }, 2600);

      }
  }
 return (
    <Card sx={{ width: pages !== "/" ? 300 : 270 , height:"auto"}} style={{marginTop:"30px" ,  background: 'transparent', boxShadow: 'none'}}>
                                          <CardActionArea>
                                            <Link to={`/product/${prdId}`} style={{ textDecoration: 'none' , color:"#fff" }}>
                                            <CardMedia
                                              component="img"
                                              image={prdImage}
                                              alt="green iguana"
                                            />
                                            </Link>
                                            </CardActionArea>
                                            <CardContent sx={{paddingLeft:0}} style={textWhite}>
                                                
                                                <Stack direction="row" spacing={2}>
                                                    <Link to={`/product/${prdId}`} style={{ textDecoration: 'none' , color: textWhite.color }}>
                                                      <Typography gutterBottom variant="h6" component="div">
                                                        {prdTitle}
                                                      </Typography>
                                                    </Link>
                                                </Stack>

                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                    <Typography  variant="h6" component="div">
                                                      <span>{prdPriceLast}</span><span style={{textDecoration: "line-through" , color: "#C2B4D6"}}> {prdPrice}</span>
                                                    </Typography>
                                                </Stack>

                                            </CardContent>
                                          
                                          <CardActions style={{paddingLeft:0}}>
                                         
                                             
                                              <Stack spacing={12} direction="row" sx={{mb:2}}>

                                                  <Stack>
                                                      <Button size="small" color="primary" variant="contained" style={{color:"#fff" , paddingLeft:5}} onClick={haddleAddCart}>
                                                      <AddShoppingCart/>
                                                        ADD TO CART
                                                      </Button>
                                                  </Stack>
                                                  <Stack>

                                                    <IconButton size="small" color="primary" style={{color:"#E81C2E"}} onClick={handdleAddWishlist}>
                                                      <FavoriteBorderIcon sx={{color:"#e81c2e"}}/>
                                                    </IconButton>

                                                  </Stack>
                                             </Stack>
                                            </CardActions>
           </Card>
  )
}

export default FeaturedCard