import React , {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DrafDialog = ({open , setOpen , title ,children , confirm}) => {
 
  const handleClose = () => {
    setOpen(false);
  };
  return ( <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    
                </DialogContentText>
                 {
                    children
                 }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">ยกเลิก</Button>
                <Button onClick={confirm} variant="contained">ยืนยัน</Button>
                </DialogActions>
            </Dialog>
  )
}

export default DrafDialog