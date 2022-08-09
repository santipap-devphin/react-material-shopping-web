import React  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const DrafDialogDefault = ({open , setOpen , title , children }) => {

 const handleClose = () => {
        setOpen(false);
  };

  return (<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                {
                    children
                }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">ยกเลิก</Button>
                </DialogActions>
        </Dialog>
  )
}

export default DrafDialogDefault