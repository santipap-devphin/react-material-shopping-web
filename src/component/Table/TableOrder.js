import React , {useState} from 'react';
import {styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import img from "../../assets/prdimg.jpg";

const TableOrder = () => {

    const [openAlert, setOpenAlert] = useState(false);

    const [statuss, setStatuss] = useState(null);

    const [textMsg, settextMsg] = useState('');

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
     });

    const handleClose = () => {

        setOpenAlert(false)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#030f27",
          color: "#dfb163",
          padding:"10px",
          fontSize: 16,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 16,
          backgroundColor: "#ffffff",
        },
      }));
  return (<Box sx={{backgroundColor:"#ffffff",boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"}}>
            <TableContainer component={Container}>
                    <Typography sx={{ minWidth: 80 , color:"#000" ,mt:1 }} component="div" variant="h5">รายการสั้งซื้อ</Typography>
                    <Table sx={{ minWidth: 650 , mt:1 }} aria-label="simple table">
                    <TableHead>
                            <TableRow>
                            <StyledTableCell>รหัสรายการ	</StyledTableCell>
                            
                            <StyledTableCell align="center">ชื่อลูกค้า</StyledTableCell>
                            <StyledTableCell align="center">สินค้า</StyledTableCell>
                            <StyledTableCell align="center">สถานะ</StyledTableCell>
                            <StyledTableCell align="center">ยอดสั้งซื้อ</StyledTableCell>
                            <StyledTableCell align="center">ค่าส่ง</StyledTableCell>
                            <StyledTableCell align="center">วันที่สั้ง</StyledTableCell>
                            <StyledTableCell align="center">วันที่ส่ง</StyledTableCell>
                            <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            
                             <TableRow>
                                <TableCell component="th" scope="row" >
                                        <Typography variant='p'>1</Typography>
                                </TableCell>
                              
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>ทดสอบ</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <img src={img} style={{borderRadius: "50%" , margin:2}}></img>
                                    <img src={img} style={{borderRadius: "50%" , margin:2}}></img>
                                </TableCell>
                                <TableCell component="th" scope="row" align="center"><Chip label="กำลังดำเนินการ" color="info" /></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>79</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>30</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>25-05-65</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>26-05-65</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="view">
                                            <PreviewIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit">
                                            <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                            <DeleteIcon />
                                    </IconButton>
                                    
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" >
                                        <Typography variant='p'>2</Typography>
                                </TableCell>
                               
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>ทดสอบ</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'> <img src={img} style={{borderRadius: "50%" , margin:2}}></img></Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Chip label="ส่งสำเร็จ" color="success" /></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>100</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>20</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>25-05-65</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>25-05-65</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="view">
                                            <PreviewIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit">
                                            <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                            <DeleteIcon />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" >
                                        <Typography variant='p'>3</Typography>
                                </TableCell>
                               
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>ทดสอบ</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'> <img src={img} style={{borderRadius: "50%" , margin:2}}></img></Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Chip label="มาใหม่" color="warning" /></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>600</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>65</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>31-05-65</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>--------</Typography></TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="view">
                                            <PreviewIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit">
                                            <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                            <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Snackbar open={openAlert} autoHideDuration={2500} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity={statuss} sx={{ width: '100%' }}>
                                                ทดสอบ
                                            </Alert>
                </Snackbar>
            </Box>
         
  )
}

export default TableOrder