import React from 'react';
import {Grid} from '@mui/material';


const MessageContainer = ({children}) => {
  return ( <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2 , mb:3}}>
                    {children}
            </Grid>
         )
}

export default MessageContainer