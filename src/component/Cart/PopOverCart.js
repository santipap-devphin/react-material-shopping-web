import React  , {useState ,useEffect , useContext} from 'react';
import DataContext from '../../context/DataContext';
import {Typography ,Button ,IconButton , Grid , Popover , CardActionArea , Divider , Stack} from "@mui/material";
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const PopOverCart = ({id , open , anchorEl , handleClose}) => {
   

  const {listCartProduct , setListCartProduct ,setStatusDelCart} = useContext(DataContext);

  const [openAlertDel, setOpenAlertDel] = useState(false);

  const [nameDel , setNameDel] = useState();

  let sum = 0;

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseDelAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlertDel(false);
  };


 const handleDelProduct = (id , name) => {

        console.log("inin");

        console.log(id)

        const pfileter = listCartProduct.filter((listPro => listPro.prdId !== id))

        setListCartProduct(pfileter);
        
        //localStorage.setItem('cartproduct', JSON.stringify(null));
        
        setStatusDelCart(true)

        setNameDel(name);

        setOpenAlertDel(true);
  }

  

  return (  <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                sx={{mt:2}}
            >
                 
                <Card sx={{ maxWidth: 345 }}>
                    { listCartProduct !== null && listCartProduct.length !== 0 ?

                         listCartProduct.map((listP , index) => {

                                    sum += (parseInt(listP.qty) * parseInt(listP.prdPriceLast));
                                    
                                    return (<Grid key={index} container spacing={1} sx={{pt:2 ,pl:3 ,pr:3 ,pb:0}}>
                                                <Grid item xs={4} md={4}>
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    
                                                    height="100"
                                                    image="../../assets/img/blank.jpg"
                                                    alt="green iguana"
                                                    />
                                                </CardActionArea>
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                    <CardContent sx={{pt:0}}>
                                                    <Stack spacing={1}>
                                                            <Typography variant="p" component="div">
                                                                                    {listP.prdTitle} 
                                                                                    <IconButton
                                                                                    size="small"
                                                                                    edge="end"
                                                                                    aria-label="delete"
                                                                                    aria-controls={listP.prdId}
                                                                                    aria-haspopup="true"
                                                                                    onClick={() => handleDelProduct(listP.prdId , listP.prdTitle)}
                                                                                    color="primary"
                                                                                    
                                                                                    >
                                                                                        <CloseIcon />
                                                                                    </IconButton>
                                                                                    </Typography>
                                                                                    <Typography variant="p" color="text.secondary">
                                                                                        จำนวน : {listP.qty}
                                                                                    </Typography>
                                                                                    <Typography variant="p" color="text.secondary">
                                                                                    ราคา {parseInt(listP.prdPriceLast) * parseInt(listP.qty)}  บาท
                                                            </Typography>
                                                        </Stack>
                                                    </CardContent>
                                             </Grid>
                                        </Grid>)


                         })
                            
                        :<Grid container spacing={1} sx={{pt:2 ,pl:3 ,pr:3 ,pb:0}}>
                                <Grid item xs={12} md={12}>
                                        <Typography variant='h6' sx={{textAlign:"center"}}>ไม่มีข้อมูลในตระกร้า</Typography>
                                </Grid>
                          </Grid>
                        }
                        <Divider variant="middle" color="text.secondary">
                            Total
                        </Divider>
                        <Grid container spacing={1} sx={{pt:2 ,pl:3 ,pr:3 ,pb:0}}>
                            <Grid item xs={6} md={6}>
                                <Typography gutterBottom variant="p" component="div" >
                                                ราคารวม
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} textAlign="right">
                                <Typography gutterBottom variant="p" component="div">
                                                {sum}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                            <Link to="/cart" style={{textDecoration: "none" }}><Button color="primary" variant="outlined" size="large" sx={{color:"#fdbe33" , borderColor:"#1f1f2e"}} fullWidth>VIEW CART</Button></Link>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{pb:3}}>
                            <Link to="/checkout" style={{textDecoration: "none" }}> <Button color="primary" variant="outlined" size="large" sx={{color:"#fdbe33" , borderColor:"#1f1f2e"}} fullWidth>CHECK OUT</Button></Link>
                            </Grid>
                        </Grid>
                    </Card>
            </Popover>
            <Snackbar open={openAlertDel} autoHideDuration={3000} onClose={handleCloseDelAlert}>
                        <Alert onClose={handleCloseDelAlert} severity="error" sx={{ width: '100%' }}>
                            
                                            คุณได้ลบสินค้า {nameDel ? nameDel : null} ในตะกร้าเรียบร้อย
                      </Alert>
            </Snackbar>
            </>
  )
}

export default PopOverCart