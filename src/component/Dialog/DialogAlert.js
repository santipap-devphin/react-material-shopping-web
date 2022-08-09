import React  from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogAlert = ({open , setOpen , title , children}) => {

    const handleClose = () => {
        setOpen(false);
    };

  return (<Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{textAlign:"center"}}>{title}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                
            </DialogContentText>
            {
                children
            }
            </DialogContent>
        </Dialog>
  )
}

export default DialogAlert