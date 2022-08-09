import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import {Typography, Box  , IconButton , Grid , FormGroup , FormControlLabel , Switch, Stack}  from '@mui/material';
import DrafModal from '../Modal/DrafModal';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import endpoint from '../../api/endpoint';


const CardSupply = ({data , setStatusCallApi}) => {

  const [openDel , setOpenDel] = useState(false);
  

  const modalDel  = () => {

    setOpenDel(true);
  }

  const confirmDelete = async (id) => {

    setStatusCallApi(false);
    
    try {
        const response = await endpoint.delete(`/supply/${id}`);
        if(response.data.code ===1){

            setStatusCallApi(true)

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
                        <Typography variant='p' sx={{fontSize:20}}> {data.supplyname} ({data.supplycode})</Typography>
                        <hr />
                        <Typography variant='p' sx={{fontSize:14}}>ราคา {data.supplyprice}<br /> </Typography>
                        <Stack>
                            <Stack direction="row">
                              
                                    <Link to={`/backend/supply/edit/${data.id}`} style={{textDecoration: "none"}}>
                                        <IconButton color="info" aria-label="edit" component="span" >
                                        <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton color="error" aria-label="delete" component="span" onClick={modalDel}>
                                        <CloseIcon />
                                    </IconButton>
                            </Stack>
                        </Stack>
                       
                    </Grid>
            </Grid>
            <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูล ?"} handleConfirm={() => confirmDelete(data.id)}>
                    ลบลบ
            </DrafModal>
            </Box>
        )
}

export default CardSupply