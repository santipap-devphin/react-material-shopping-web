import React , { useState } from 'react';
import Button from '@mui/material/Button';
import DialogAlert from './DialogAlert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import endpoint from '../../api/endpoint';
import LogoutIcon from '@mui/icons-material/Logout';
import SweetAlertCustom from '../SweetAlert/SweetAlertCustom';
import CircularProgress from '@mui/material/CircularProgress';

const Logout = ({userLogin , setUserLogin}) => {

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [alertOpen , setAlertOpen] = useState({
                                      show: false,
                                      title: 'เกิดเหตุผิดพลาด',
                                      text: 'กด Ok เข้าสู่ระบบใหม่',
                                      icon:"warning",
                                      showCancelButton: true,
                                      confirmButtonText:"OK",
                                      cancelButtonText:"Cancel"
                                    });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allowed = async () => {

        setOpen(false);
        const response = await endpoint.post("/logout"  , {username:userLogin.username} , {withCredentials:true} )
        if(response.data.code === 1){

               setOpenAlert(true);
               setTimeout(function() 
               {
                  setOpenAlert(false);
                  setUserLogin(null);
                }, 1500);
              

        }else if(response.status === 204){
              //console.log("inin")
              setAlertOpen({...alertOpen , show:true })
             
        }
        //setTimeout(function() {setSnackOpen(false);}, 2000);

        
  }
  return (
            <div>
            <Button variant="contained" onClick={handleClickOpen}>
               <LogoutIcon sx={{pr:1}} /> ออกจากระบบ
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"คุณต้องการออกจากระบบใช่ไหม ?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                     กดปุ่ม OK เพื่อยืนยัน
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={allowed} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
             <SweetAlertCustom swalProps={alertOpen} setSwalProps={setAlertOpen} />
            <DialogAlert open={openAlert} setOpen={setOpenAlert} title={"กรุณารอสักครู่ กำลังออกจากระบบ"}>
                  <Stack sx={{alignItems:"center"}}>
                      <CircularProgress disableShrink />
                  </Stack>   
            </DialogAlert>
            </div>
  )
}

export default Logout