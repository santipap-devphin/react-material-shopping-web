import React , { useState , useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DataContext from '../../context/DataContext';
import endpoint from '../../api/endpoint';
import LogoutIcon from '@mui/icons-material/Logout';
import SweetAlertCustom from '../SweetAlert/SweetAlertCustom';

const Logout = () => {

  const {userLogin , setUserLogin} = useContext(DataContext);

  const [open, setOpen] = useState(false);

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

        const response = await endpoint.post("/logout"  , {username:userLogin.username} , {withCredentials:true} )
        
        if(response.data.code === 1){
                  setUserLogin(null);
        }else if(response.status === 204){
              console.log("inin")
              setAlertOpen({...alertOpen , show:true })
             
        }
        //setTimeout(function() {setSnackOpen(false);}, 2000);

        setOpen(false);

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
            
            </div>
  )
}

export default Logout