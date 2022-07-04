import React , {useContext , useState} from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import {emphasize, styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { color } from '@mui/system';

const Tablewishlist = () => {

    const {listWishList , setListWishList , listCartProduct , setListCartProduct} = useContext(DataContext);

    const [openAlert, setOpenAlert] = useState(false);

    const [statuss, setStatuss] = useState(null);

    const [textMsg, settextMsg] = useState('');

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
     });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#030f27",
          color: "#dfb163",
          padding:"25px",
          fontSize: 18,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 18,
          backgroundColor: "#fff",
        },
      }));

    const handleAction = (id , title) => {

        const reData = listWishList.filter((product) => product.prdId !== id);

        if(reData.length !== 0){

            setListWishList(reData)

        }else{
            setListWishList(null)
        }

        setOpenAlert(true);  
        setStatuss('error');
        settextMsg(`คุณยกเลิกความสนใจสินค้า ${title}`);
       
    }
    const handleClose = () => {

        setOpenAlert(false)
    }
    const ClkAddToCart = (obj) => {

        const finds = listCartProduct.find((product) => product.prdId === obj.prdId);
        if(finds !== undefined){

            setOpenAlert(true);  
            setStatuss('warning');
            settextMsg(`คุณมีสินค้านี้ในตระกร้าแล้ว`);
            return;



        }else{

            if(listCartProduct !== null){

                setListCartProduct([...listCartProduct , obj]);

            }else{
                setListCartProduct([obj]);
            }

            
            setOpenAlert(true);  
            setStatuss('success');
            settextMsg(`คุณได้เพิ่มสินค้า ${obj.prdTitle} เรียบร้อย`);

        }
        
        //console.log(obj);


        //setListCartProduct([obj]);

    }

    const clearWishlist = () => {


        setListWishList(null);
        localStorage.setItem("wishlist" , null);

    }

  return (
    <Grid container spacing={1} sx={{mt:5}}>
                <Grid item xs={12}>
                <TableContainer component={Container}>
                    <Typography sx={{ minWidth: 80 , color:"#000" }} component="div" variant="h5">สินค้าที่คุณสนใจ</Typography>
                    <Table sx={{ minWidth: 650 , mt:2 }} aria-label="simple table" style={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"}}>
                    <TableHead>
                            <TableRow>
                            <StyledTableCell>สินค้า	</StyledTableCell>
                            <StyledTableCell align="center">ชื่อสินค้า</StyledTableCell>
                            <StyledTableCell align="center">ราคาต่อหน่วย</StyledTableCell>
                            <StyledTableCell align="center">จำนวน</StyledTableCell>
                            <StyledTableCell align="center">เพิ่มลงตระกร้า</StyledTableCell>
                            <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            
                           {
                           listWishList !== null && listWishList.length !==0 ? 

                           listWishList.map((list) => {

                            return (
                                <TableRow key={list.prdId} sx={{backgroundColor:"#ffffff"}}
                                    /*sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/>
                                    <TableCell component="th" scope="row">
                                        <img src="../../assets/img/7.jpg" style={{maxWidth:"108px"}} loading="lazy" />
                                    </TableCell>
                                    <TableCell align="center">{list.prdTitle}</TableCell>
                                    <TableCell align="center"><span style={{textDecoration:"line-through" , fontSize:"22px", marginRight:"10px" ,color:"#E81C2E"}}>{list.prdPrice}</span><span>{list.prdPriceLast}</span> </TableCell>
                                    <TableCell align="center">{list.qty}</TableCell>
                                    <TableCell align="center">
                                            <Button variant="contained" onClick={() => ClkAddToCart(list)}><AddCircleIcon sx={{fontSize:16 ,pr:0.2}} />เพิ่มลงตระกร้า</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                    <IconButton
                                                size="large"
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-controls={list.productTitle}
                                                aria-haspopup="true"
                                                onClick={() => handleAction(list.prdId , list.prdTitle)}
                                                color="inherit"
                                                
                                                >
                                                    <CloseIcon />
                                            </IconButton>
                                    </TableCell>
                                </TableRow>
                            )

                           })
                           
                            :<TableRow><TableCell component="th" scope="row"><Typography variant='h5'>ไม่มีสินค้าที่คุณสนใจ</Typography></TableCell></TableRow>
                           }
                         </TableBody>
                    </Table>

                        <Grid container spacing={1} justify="flex-end" sx={{mt:3 , mb:3}}>
                            <Grid item sm={6}>
                                <Box display="flex" justifyContent="flex-start">
                                    <Button variant="contained"><Link to={"/shop"} style={{textDecoration:"none", color:"#030f27"}}>ซื้อสินค้าต่อ</Link> <ArrowForwardIosIcon sx={{fontSize:14}} /></Button>
                                </Box>
                        </Grid>
                        <Grid item sm={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button variant="contained" onClick={clearWishlist}><DeleteSweepIcon sx={{fontSize:14 , pr:1}} /> ลบสิ้นค้าที่สนใจทั้งหมด</Button>
                                </Box>
                        </Grid>
                    </Grid>

                    </TableContainer>
                </Grid>
                <Snackbar open={openAlert} autoHideDuration={2500} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity={statuss} sx={{ width: '100%' }}>
                                              {textMsg}
                                            </Alert>
                </Snackbar>
            </Grid>
        )
}

export default Tablewishlist