import React , {useContext} from 'react'
import DataContext from '../../context/DataContext';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const CardShipping = ({data , handleChangedata}) => {

  const {totalPrice} = useContext(DataContext);

  let sumTotal = 0;
 return (
    <Container>
                    <Grid container spacing={4} sx={{mt:1 , mb:0}}>
                        {/*<Grid item xs={12} sm={6} lg={4} xl={4}>
                              <Card sx={{backgroundColor:"#f9f9f9" }}>
                                  <CardContent>
                                    <Divider textAlign="left" sx={{ fontSize: 24 }}> Shipping</Divider>
                                    <Typography variant="p" component="div">
                                    Enter your destination to get a shipping estimate.
                                  </Typography>
                                  
                                    <FormControl sx={{ mt:1, mb: 1.5 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">จังหวัด</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={data}
                                          label="country"
                                          onChange={handleChangedata}
                                        >
                                          <MenuItem value={10}>กรุงเทพ</MenuItem>
                                          <MenuItem value={20}>ปทุมธานี</MenuItem>
                                          <MenuItem value={30}>นนทบุรี</MenuItem>
                                        </Select>
                                      </FormControl>
                                      <FormControl sx={{ mt:1, mb: 1.5 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">เขต</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={data}
                                          label="country"
                                          onChange={handleChangedata}
                                        >
                                          <MenuItem value={10}>สายไหม</MenuItem>
                                          <MenuItem value={20}>รังสิต</MenuItem>
                                          <MenuItem value={30}>ประเวศ</MenuItem>
                                        </Select>
                                      </FormControl>
                                      <FormControl sx={{ mt:1, mb: 1.5 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">รหัสไปรษณีย์</InputLabel>
                                        <TextField></TextField>
                                      </FormControl>
                                  </CardContent>
                                  <CardActions>
                                    
                                  </CardActions>
                            </Card>
                        </Grid>*/}
                        <Grid item xs={12} sm={6} lg={6} xl={6}>
                            <Card sx={{backgroundColor:"#f9f9f9" ,pb:2 , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                                <CardContent>
                                  <Divider textAlign="left" sx={{ fontSize: 24 }}> Use Coupon Code</Divider>
                                  <Typography sx={{ mt: 1 }} color="text.secondary">
                                        Enter your coupon code if you have one.
                                    </Typography>
                                  <FormControl sx={{ mt:3}} fullWidth>
                                      <InputLabel id="demo-simple-select-label">หมายเลขคูปอง</InputLabel>
                                      <TextField></TextField>
                                    </FormControl>
                                </CardContent>
                                <CardActions>
                                <Button variant="contained" fullWidth>ใช้คูปอง</Button>
                              
                                </CardActions>
                              </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} xl={6} sx={{mb:10}}>

                              <Card sx={{transitionDuration: '0.3s', backgroundColor:"#f9f9f9" ,pb:2 ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                                  <CardContent>
                                    <Divider textAlign="left" sx={{ fontSize: 24 }}>ราคารวม</Divider>
                                    <Grid container justify="flex-start" spacing={1} sx={{mt:3}}>
                                        <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-start">
                                              <Typography color="text.secondary">
                                                    ราคารวมสินค้า
                                              </Typography>
                                            </Box>
                                      </Grid>
                                      <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography color="text.secondary">
                                                    {totalPrice}
                                                </Typography>
                                            </Box>
                                      </Grid>
                                  </Grid>
                                  <Grid container justify="flex-end" spacing={1} sx={{mt:3}}>
                                        <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-start">
                                              <Typography color="text.secondary">
                                                    ค่าจัดส่ง
                                              </Typography>
                                            </Box>
                                      </Grid>
                                      <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography color="text.secondary">
                                                    {(totalPrice * 0.05).toFixed(0)}
                                                </Typography>
                                            </Box>
                                      </Grid>
                                  </Grid>
                                  <Grid container justify="flex-end" spacing={1} sx={{mt:3}}>
                                        <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-start">
                                              <Typography color="text.secondary">
                                                    ราคารวมทั้งหมด
                                              </Typography>
                                            </Box>
                                      </Grid>
                                      <Grid item sm={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography color="text.secondary">
                                                    {
                                                      sumTotal = parseInt(totalPrice) + parseInt((totalPrice * 0.05).toFixed(0))
                                                    }
                                                </Typography>
                                            </Box>
                                      </Grid>
                                  </Grid>
                                </CardContent>
                                  <CardActions>
                                      <Button variant="contained" fullWidth>ยืนยันสั้งซื้อสินค้า</Button>
                                  </CardActions>
                            </Card>

                        </Grid>
                        


                      </Grid> 

                 </Container>
  )
}

export default CardShipping