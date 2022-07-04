import React , {Fragment} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const HeaderOther = () => {
  return (
    <Fragment>
        <Box sx={{flexGrow:1 , backgroundColor:"#202C45" , p:1.5}} >
              <Grid container spacing={2}>
                      <Grid item xs={6}>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,textAlign:"center" , color:"#fff"}}>
                                      โทร 000xxxxxxx
                          </Typography>
                      </Grid>
                      <Grid item xs={6}>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1  ,textAlign:"center", color:"#fff"}}>
                                  Free delivery on order over $200.00
                          </Typography>
                      </Grid>
              </Grid>
          </Box>

    </Fragment>
  )
}

export default HeaderOther