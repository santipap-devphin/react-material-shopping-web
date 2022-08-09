import React  from 'react';
import PropTypes from 'prop-types';
import {Button , IconButton  ,Dialog, DialogTitle , DialogContent ,DialogActions}  from '@mui/material';
import {styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

export const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
     
    return (
       <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
         {children}
         {onClose ? (
           <IconButton
             aria-label="close"
             onClick={onClose}
             sx={{
               position: 'absolute',
               right: 8,
               top: 8,
               color: (theme) => theme.palette.grey[500],
             }}
           >
             <CloseIcon />
           </IconButton>
         ) : null}
       </DialogTitle>
     );
   };
   BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}; 
const DrafModal = ({open  , setOpen , txthead, handleConfirm , children}) => {

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
          width:550
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));
    const handleClose = () => {

        setOpen(false);
    }
  return (<BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                 {txthead}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                 {children}
                </DialogContent>
                <DialogActions>
                <Button autoFocus color="primary" variant="contained" onClick={handleConfirm}>
                    ยืนยัน
                </Button>
                <Button onClick={handleClose} variant="contained" color="error">
                    ยกเลิก
                </Button>
                </DialogActions>
            </BootstrapDialog>
  )
}

export default DrafModal