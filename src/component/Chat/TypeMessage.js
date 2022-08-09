import React from 'react';
import {Grid, TextField , Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const TypeMessage = ({typeMessage , setTypeMessage , sendMsg}) => {

  

  return (  <Grid container sx={{mt:0.5}} spacing={1}>
                <Grid item xs={10}>
                    <TextField
                        id="filled-multiline-static"
                        label="ข้อความ"
                        /*multiline
                        rows={3}*/
                        variant="filled"
                        fullWidth
                        value={typeMessage}
                        onChange={(e) => setTypeMessage(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" fullWidth sx={{height:55 , fontSize:18}} onClick={sendMsg}> Send <SendIcon sx={{fontSize:24 , ml:1}}  /></Button>
                        </Grid>
            </Grid>
  )
}

export default TypeMessage