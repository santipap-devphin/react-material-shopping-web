import React , {useContext , useEffect} from 'react'
import {emphasize, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Stack } from '@mui/material';

const TableCart = ({alignment ,setAlignment}) => {

    //console.log(pCart)
    const {listCartProduct , setListCartProduct  , setTotalPrice} = useContext(DataContext);

    //console.log(listCartProduct)
    let sumPrice = 0;
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#030f27",
          color: "#dfb163",
          padding:"25px",
          fontSize: 18,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 18,
        },
      }));

      const handleChange = (event, newAlignment) => {
       
        if(newAlignment !== "input"){
            setAlignment(newAlignment);
        }
        else{
          setAlignment(null);
        }
        
      };

      const handleProfileMenuOpen = () => {

      }

      const handleDelQty = (id) => {

            let newReData;
           
            const newData = listCartProduct.map((product , index) => {

                if(product.prdId === id) {

                        product.qty -= 1;
                 }

                return product;


           })
           //console.log(newData)
           let checkQty = newData.filter((check) => check.qty !== 0);

           //console.log(checkQty)

           setListCartProduct(checkQty);

      }

      const handleAddQty = (id) => {

            const newData = listCartProduct.map((product) => {

                 if(product.prdId === id) {

                      product.qty += 1;

                 }

                 return product;


            })

            //console.log(newData)
             setListCartProduct(newData);
     }
     const delCart = (id) => {

        const dels = listCartProduct.filter((chk) => chk.prdId !== id);

        setListCartProduct(dels);

     }

     useEffect(() => {

        setTotalPrice(sumPrice)
        console.log('ininin')

     },[listCartProduct])


     const clearCart = () => {

            setListCartProduct([]);
     }
     
     

      

  return (
            <Grid container spacing={1} sx={{mt:5}}>
                <Grid item xs={12}>
                <TableContainer component={Container}>
                    <Typography sx={{ minWidth: 80 , color:"#000"}} component="div" variant="h5">ตระกร้าสินค้าของคุณ</Typography>
                    <Table sx={{ minWidth: 650 , mt:2 }} aria-label="simple table" style={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                    <TableHead>
                            <TableRow>
                            <StyledTableCell>สินค้า	</StyledTableCell>
                            <StyledTableCell align="center">ชื่อสินค้า	</StyledTableCell>
                            <StyledTableCell align="center">ราคาต่อหน่วย	</StyledTableCell>
                            <StyledTableCell align="center">จำนวน</StyledTableCell>
                            <StyledTableCell align="center">ราคารวม</StyledTableCell>
                            <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            listCartProduct !== null && listCartProduct.length !== 0 ?

                            listCartProduct.map((row , index) => {

                                 sumPrice += (parseInt(row.prdPriceLast) * parseInt(row.qty));

                                 return (<TableRow
                                            key={index}
                                            sx={{backgroundColor:"#fff"}}
                                            /*sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/
                                        >
                                            <TableCell component="th" scope="row">
                                                <img src="../../assets/img/7.jpg" style={{maxWidth:"108px"}} loading="lazy" />
                                            </TableCell>
                                            <TableCell align="center">{row.prdTitle}</TableCell>
                                            <TableCell align="center"><span style={{textDecoration:"line-through" , fontSize:"22px", marginRight:"10px" ,color:"#e90042"}}>{row.prdPrice}</span><span>{row.prdPriceLast}</span> </TableCell>
                                            <TableCell align="center">
                                            <ToggleButtonGroup
                                                color="primary"
                                                value={alignment}
                                                exclusive
                                                onChange={handleChange}
                                                >
                                                <ToggleButton value="dels" onClick={() => handleDelQty(row.prdId)}>-</ToggleButton>
                                                <ToggleButton value="input" sx={{width:80}}>{row.qty}</ToggleButton>
                                                <ToggleButton value="plus" onClick={() => handleAddQty(row.prdId)}>+</ToggleButton>
                                            </ToggleButtonGroup>
                                            </TableCell>
                                            <TableCell align="center">{parseInt(row.prdPriceLast) * parseInt(row.qty)}</TableCell>
                                            <TableCell align="center">
                                            <IconButton
                                                        size="large"
                                                        edge="end"
                                                        aria-label="account of current user"
                                                        aria-controls={row.prdId}
                                                        aria-haspopup="true"
                                                        onClick={() => delCart(row.prdId)}
                                                        color="inherit"
                                                        
                                                        >
                                                            <CloseIcon />
                                            </IconButton>
                                                        
                                            </TableCell>
                                        </TableRow>)

                                    })
                         :
                        <TableRow>
                            <TableCell component="th" scope="row" rowSpan="3">ไม่มีข้อมูลในตระกร้า</TableCell>
                        </TableRow>
                        }
                         </TableBody>
                    </Table>

                    <Grid container spacing={1} justify="flex-end" sx={{mt:3}}>
                            <Grid item sm={6}>
                                <Box display="flex" justifyContent="flex-start">
                                    <Button variant="contained"><Link to="/shop" style={{color:"#030f27" , textDecoration: "none"}}>ซื้อสินค้าต่อ</Link> <ArrowForwardIosIcon sx={{fontSize:14}} /></Button>
                                </Box>
                        </Grid>
                        <Grid item sm={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button variant="contained" onClick={clearCart}><DeleteSweepIcon sx={{fontSize:14}} /> ลบสิ้นค้าในตะกร้าทั้งหมด</Button>
                                </Box>
                        </Grid>
                    </Grid>

                    </TableContainer>
                </Grid>
          </Grid>
    )
}

export default TableCart