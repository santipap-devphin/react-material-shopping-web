import React , {useState , useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const SnackBars = ({opens , status , textMess}) => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
     });

    const [openAlert , setOpenAlert]  = useState(opens)
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
        console.log('handdleclose')
      };


    return (<Snackbar open={openAlert} autoHideDuration={2500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    {textMess}
                </Alert>
            </Snackbar>
    )
    }

export default SnackBars