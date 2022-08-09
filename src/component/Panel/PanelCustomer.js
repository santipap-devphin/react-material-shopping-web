import React , {Fragment} from 'react';
import {Stack , Box , Typography , Grid} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';

const PanelCustomer = ({addr}) => {
   
  return (<Fragment>
            <Box sx={{backgroundColor:"#030f27", color:"#dfb163" , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}>
                            <Stack spacing={2}>
                                <Stack direction="row">
                                <RoomIcon sx={{fontSize:32 , color:"#dfb163"}} /> <Typography variant='h6' color="#ffffff">ที่อยู่ในการจัดส่ง</Typography>
                                </Stack>
                             </Stack>
                        </Grid>
                        
                </Grid>  
            </Box>
            <Box sx={{backgroundColor: "#f5f5f5" , color:"#000" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)"}}>
                <Grid container>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography>ชื่อผู้รับ</Typography></Grid>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography>{addr.address[0].nameAddr === null ? addr.username : addr.address[0].nameAddr }</Typography></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography>เบอร์โทรศัพท์</Typography></Grid>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography>{addr.address[0].telAddr === null ? "ไม่มีข้อมูล" : addr.address[0].telAddr}</Typography></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography>จังหวัด / อำเภอ / ตำบล / รหัสไปรษณีย์</Typography></Grid>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography>{addr.address[0].provinceAddr} / {addr.address[0].districtAddr} / {addr.address[0].tambonAddr} / {addr.address[0].postcodeAddr}</Typography></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography>รายละเอียดที่อยู่</Typography></Grid>
                    <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography>{addr.address[0].detailAddr}</Typography></Grid>
                </Grid>
            </Box>
        </Fragment>
  )
}

export default PanelCustomer