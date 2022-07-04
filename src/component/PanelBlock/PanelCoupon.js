import React , {Fragment , useState , useEffect , useContext} from 'react';
import {Stack , Box , Typography , Button  , Grid , Chip , Dialog ,DialogActions , DialogContent , DialogContentText , DialogTitle} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
const PanelCoupon = () => {
  return (
    <Fragment>
            <Box sx={{backgroundColor:"#ffffff", color:"#000" , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                    <Grid container>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2}>
                                    <Stack direction="row">
                                    <ArticleIcon sx={{fontSize:32 , color:"#dfb163" , mr:1}} /> <Typography variant='h6'>โค้ดส่วนลด</Typography>
                                    </Stack>

                                </Stack>

                            </Grid>
                            <Grid item xs={6} textAlign="right" >
                                 <Button variant="text" color="info" sx={{mr:1}}>เลือกโค้ดส่วนลด</Button>
                            </Grid>
                    </Grid>
                    <Grid container>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2} textAlign="center">
                                    <Typography>สมาชิกใหม่ (newmember)</Typography>
                                </Stack>

                            </Grid>
                            <Grid item xs={6} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography>-100</Typography>
                            </Grid>
                    </Grid>
            </Box>
       </Fragment>
  )
}

export default PanelCoupon