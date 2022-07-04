import React , {Fragment , useState , useEffect , useContext} from 'react';
import {Stack , Box , Typography , Button  , Grid , Chip , Dialog ,DialogActions , DialogContent , DialogContentText , DialogTitle} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';

const PanelAddress = () => {
  return (<Fragment>
                <Box sx={{backgroundColor:"#030f27", color:"#dfb163"  , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                    <Grid container>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2}>
                                    <Stack direction="row">
                                    <RoomIcon sx={{fontSize:32 , color:"#dfb163"}} /> <Typography variant='h6'>ที่อยู่ในการจัดส่ง</Typography>
                                    </Stack>

                                </Stack>

                            </Grid>
                            <Grid item xs={6} textAlign="right" sx={{pt:1 , pb:1}}>
                                <Button variant="outlined" sx={{mr:2}} disabled>ค่าเริ่มต้น</Button>
                                <Button variant="outlined" sx={{mr:1 , }}>เปลื่ยน</Button>
                            </Grid>
                    </Grid>  
                </Box>
                <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)"}}>
                    <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>ชื่อผู้รับ</Typography></Grid>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>xxxxxxx</Typography></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>เบอร์โทรศัพท์</Typography></Grid>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>000xxxxxxx</Typography></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>จังหวัด / อำเภอ / ตำบล / รหัสไปรษณีย์</Typography></Grid>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>อ่างทอง / วิเศษชัยชาญ / ศาลเจ้าโรงทอง / 14110</Typography></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>รายละเอียดที่อยู่</Typography></Grid>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>000xxxxxxx</Typography></Grid>
                    </Grid>
                </Box>
               
            </Fragment>
  )
}

export default PanelAddress