import React , {useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';


const DesProduct = ({product , sizes}) => {

  //console.log(sizes)

  //const {addPro , dataSucess} = AddProduct();
  
  const [value, setValue] = useState(0);

  const [ratings, setRatings] = useState(2);

  const handleChange = (event, newValue) => {

        console.log(newValue)
        setValue(newValue);
  };

   return (
    <Container>   
    <Box sx={{ width: '100%', backgroundColor:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , color:"#000" , mt:5}}>
           
            <Tabs value={value} sx={{p:2}} onChange={handleChange} centered>
                <Tab label="รายละเอียดสินค้า" sx={{fontSize:sizes ? 14 : 26 , color:"#000"}} />
                <Tab label="คุณสมบัติ" sx={{fontSize:sizes ? 14 : 26 , color:"#000"}}  />
                <Tab label="รีวิว" sx={{fontSize:sizes ? 14 : 26 , color:"#000"}}  />
            </Tabs>
            
            <Container>    
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={12}>
                        <Stack sx={{p:5}}>

                            {
                                value === 0 ? 
                                <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                                : 
                                value === 1 ? 
                                <>
                                    <Typography>หมวดหมู่ : </Typography>
                                    <Typography>ยี่ห้อ : </Typography>
                                    <Typography>เพศ : </Typography>
                                    <Typography>จำนวนสินค้า : </Typography>
                                </>
                                : <>
                                    <Typography variant='h5' sx={{pb:1}}>คะแนนของสินค้า</Typography>
                                    <Box sx={{flexGrow:1 , backgroundColor:"#fffbf8"}}>
                                        
                                        <Stack spacing={0} sx={{pl:3}}>
                                            <Typography variant='h5' sx={{color:"#e81c2e"}}>4 เต็ม 5 </Typography> 
                                         </Stack>
                                         <Stack spacing={0} direction="row" sx={{pl:2,color:"#e81c2e"}}>
                                             <StarIcon />
                                             <StarIcon />
                                             <StarIcon />
                                             <StarIcon />
                                         </Stack>
                                     </Box>
                                     <Stack direction="row" spacing={1} sx={{p:5}}>
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                                    <Grid item xs={12} sm={2}>
                                                        <img src="../../assets/img/review1.jpg" alt='review1' />
                                                    </Grid>
                                                    <Grid item xs={12} sm={10}>
                                                         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 12, md: 12 }}>
                                                            <Typography>ชื่อ : </Typography>
                                                            <Typography>คะแนน : </Typography>
                                                            
                                                         </Stack>
                                                         <Stack spacing={1}>
                                                            <Typography>Vestibulum ante ipsum primis aucibus orci luctustrices posuere cubilia Curae Suspendisse viverra ed viverra. Mauris ullarper euismod vehicula. Phasellus quam nisi, congue id nulla.</Typography>
                                                            <Typography>วันที่ : </Typography>
                                                         </Stack>
                                                    </Grid>
                                                </Grid>
                                               
                                         </Stack>
                                         <Divider light />
                                         <Box
                                         component="form"
                                         sx={{p:5}}
                                         >
                                             <Typography variant='h5' sx={{pb:2}}>เขียนรีวิว</Typography>
                                             <Rating
                                                    name="simple-controlled"
                                                    value={ratings}
                                                    onChange={(event, newValue) => {
                                                        setRatings(newValue);
                                                    }}
                                            sx={{mb:1}}
                                             />
                                             <Stack spacing={1} direction="row">
                                                <TextField id="reviewName" label="ชื่อ-นามสกุล" variant="filled" fullWidth />
                                                <TextField id="reviewEmail" label="อีเมล์" variant="filled" fullWidth />
                                             </Stack>
                                             <Stack spacing={1} direction="row" sx={{mt:1}}>

                                                <TextField 
                                                    id="reviewMess" 
                                                    label="ข้อความ" 
                                                    multiline
                                                    rows={4}
                                                    variant="filled" 
                                                    fullWidth />
                                             </Stack>
                                             <Button variant="contained" sx={{mt:1}}>ส่งข้อความ</Button>
                                        </Box>
                                  </>
                            }

                        </Stack>
                    </Grid>
                </Grid>
            </Container>
    </Box>
    </Container>
  )
}

export default DesProduct