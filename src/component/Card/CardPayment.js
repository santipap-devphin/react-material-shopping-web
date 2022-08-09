import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import {Typography, Box  , IconButton , Grid , FormGroup , FormControlLabel , Switch, Stack}  from '@mui/material';
import DrafModal from '../Modal/DrafModal';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import endpoint from '../../api/endpoint';
//import qrcode from '../../assets/noimg.jpg'

const CardPayment = ({data , setStatusCallApi}) => {
    
    const [openDel , setOpenDel] = useState(false);
    const [delID , setDelID] = useState('');
    

    const modalDel  = (id) => {
  
      setDelID(id)
      setOpenDel(true);
    }
  
    const confirmDelete = async() => {
  
     
      setStatusCallApi(false);
      try {
         
        const response = await endpoint.delete(`/payment/${delID}`);
        if(response.data.code === 1){
            setStatusCallApi(true);
        }
        
      } catch (error) {
            console.error(error)
      }
      
      setOpenDel(false);
  
    }

  return (<Box
            sx={{
            m:1,
            p:1,
            width: "90%",
            backgroundColor: '#ffffff',
            color:"#000",
            boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
            }}
            >
            <Grid container>
                <Grid item xs={12}>
                    {
                        data.typepayment === "bank" ?
                        <>
                            <Typography variant='p' sx={{fontSize:20}}> บัญชีธนาคาร</Typography>
                            <hr />
                            <Typography variant='p' sx={{fontSize:14}}>{data.bank}<br />หมายเลขบัญชี {data.banknum}<br /> ชื่อบัญชี {data.bankname}  </Typography>
                            <p>QRCODE</p>
                            <img src={`http://localhost:7000/${data.imgqrcode}`} style={{maxWidth:"60%"}}  alt="qrcode" />
                            <Stack>
                                <Stack direction="row">
                                  
                                        <Link to={`/backend/payment/edit/${data.id}`} style={{textDecoration: "none"}}>
                                            <IconButton color="info" aria-label="edit" component="span" >
                                            <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton color="error" aria-label="delete" component="span" onClick={() => modalDel(data.id)}>
                                            <CloseIcon />
                                        </IconButton>
                                </Stack>
                            </Stack>
                        </>
                        :   data.typepayment === "promptpay" ? 
                            <>
                                <Typography variant='p' sx={{fontSize:20}}> พร้อมเพย์</Typography>
                                <hr />
                                <Typography variant='p' sx={{fontSize:14}}>ชื่อ {data.promptpayname} <br />หมายเลข {data.promptpaynum} <br/> <br/></Typography>
                                <p>QRCODE</p>
                                <img src={`http://localhost:7000/${data.imgqrcode}`} style={{maxWidth:"60%"}}  alt="qrcode" />
                                <Stack>
                                    <Stack direction="row">
                                            
                                            <Link to={`/backend/payment/edit/${data.id}`} style={{textDecoration: "none"}}>
                                                <IconButton color="info" aria-label="edit" component="span" >
                                                <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" aria-label="delete" component="span" onClick={() => modalDel(data.id)}>
                                                <CloseIcon />
                                            </IconButton>
                                    </Stack>
                                </Stack>
                            </>: null

                    }
                   
                </Grid>
            </Grid>
            <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูล ?"} handleConfirm={() => confirmDelete()}>
                    ลบลบ
            </DrafModal>
        </Box>
    )
}

export default CardPayment