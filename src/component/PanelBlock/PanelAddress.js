import React , {Fragment , useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Stack , Box , Typography , Button  , Grid } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import endpoint from '../../api/endpoint';

const PanelAddress = ({userID , addrText , setAddrText}) => {

   useEffect(() => {


    const fetchProfile  = async () => {
        
        try {

            const response = await endpoint.get(`/userprofile/per/${userID}`)
            if(response.data.code === 1){
                setAddrText(response.data.list)
            }
            else if(response.data.code === 6){
                setAddrText({})
            }
        } catch (error) {
            console.error(error)
        }


    }

    fetchProfile();

   
   },[userID , setAddrText])

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
                                <Link to={'/address'}><Button variant="outlined" sx={{mr:1}}>เปลื่ยน</Button></Link>
                            </Grid>
                    </Grid>  
                </Box>
               
                <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)"}}>
                    {
                        Object.keys(addrText).length > 0 ? 
                        <>
                            <Grid container>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>ชื่อผู้รับ</Typography></Grid>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>{addrText.nameAddr}</Typography></Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>เบอร์โทรศัพท์</Typography></Grid>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>{addrText.telAddr}</Typography></Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>จังหวัด / อำเภอ / ตำบล / รหัสไปรษณีย์</Typography></Grid>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>{addrText.provinceAddr} / {addrText.districtAddr} / {addrText.tambonAddr} / {addrText.postcodeAddr}</Typography></Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>รายละเอียดที่อยู่</Typography></Grid>
                                <Grid item xs={6} sx={{pt:1 ,pb:1}}><Typography variant='p'>{addrText.detailAddr}</Typography></Grid>
                            </Grid>
                        </>
                        :
                        <Grid container>
                            <Grid item xs={12} sx={{pt:1 ,pb:1}} textAlign="center"><Typography variant='p'>ไม่พบข้อมูล กรุณา เพิ่มที่อยู่</Typography></Grid>
                       </Grid>


                    }
                   
                </Box>
               
            </Fragment>
  )
}

export default PanelAddress