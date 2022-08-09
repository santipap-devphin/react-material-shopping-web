import React , {useState , Fragment, useContext} from 'react';
import { Container , Typography, Grid , Box , Stack}  from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement  , 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import HeaderDashBoard from '../../layout/HeaderDashBoard';
import MenuDashboard from '../../component/Menu/MenuDashboard'
import MenuDashboardMobile from '../../component/Menu/MenuDashboardMobile';
import { ThemeProvider } from '@mui/material/styles';
import DataContext from '../../context/DataContext';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CardDashBoard from '../../component/Card/CardDashBoard';
import { Line , Doughnut } from 'react-chartjs-2';
import TableOrder from "../../component/Table/TableOrder";
import UserActivity from '../../component/Activity/UserActivity';
import Complete from '../../component/Product/Complete';
import FooterDashBoard from '../../layout/FooterDashBoard';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
export const dataCircle = {
  labels: ['สินค้า1', 'สินค้า2', 'สินค้า3', 'สินค้า4', 'สินค้า5', 'สินค้า6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export const data = {
  labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'รายได้',
      data: [65, 59, 80, 81, 56 , 100 , 50],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'รายจ่าย',
      data:  [10, 20, 30, 40, 50 , 60 ,70],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const Home = () => {
  const {theme , scaleTablet , matches} = useContext(DataContext);

  return ( <ThemeProvider theme={theme}>
            <Fragment>
            
                  <HeaderDashBoard />
                  <Grid container sx={{backgroundColor:"#f5f5f5" ,color:"#000"}}>
                    
                          <Grid item xs={12} md={1} sx={{mt:scaleTablet && !matches ? 0 : 10}}>
                          {
                            scaleTablet && !matches   ? <MenuDashboard /> : <MenuDashboardMobile />
                          }
                          </Grid>
                          
                          <Grid item xs={12} md={11} sx={{mt:matches ? 5 : 10 , backgroundColor:"#f5f5f5" , mt: { xs: 5, sm: 10 }}}>

                                <Stack spacing={2} sx={{ml:matches ? 0 : 10 , mr:matches ? 0 : 5}}>
                                    <Typography variant='h6'>Dashboard Shop</Typography>
                                <hr/>
                                <Grid container spacing={1} sx={{ml:matches ? 0 : 10}}>
                                    <Grid item xs={12} sm={12} md={12} lg={3}>
                                        <CardDashBoard icons={<PersonAddAlt1Icon sx={{fontSize:110}}/> } textmsg={"สมาชิกใหม่"} count={"10"}  />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={3} >
                                        <CardDashBoard icons={<MonetizationOnIcon sx={{fontSize:100}}/> } textmsg={"ยอดขาย"} count={"10"}  />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={3} >
                                        <CardDashBoard icons={<BookmarkBorderIcon sx={{fontSize:100}}/> } textmsg={"ออเดอร์"} count={"500"}  />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={3} >
                                        <CardDashBoard icons={<CircleNotificationsIcon sx={{fontSize:100}}/> } textmsg={"แจ้งเตือน"} count={"10"}  />
                                    </Grid>
                                    {/** section graph */}
                                    <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                                        <Grid item xs={12} sm={12} md={12} lg={8} >
                                            <Box
                                                  sx={{
                                                  width: "99%",
                                                  backgroundColor: '#ffffff',
                                                  boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                                                  '&:hover': {
                                                          backgroundColor: '#FBF1d5',
                                                          opacity: [0.9, 0.8, 0.7],
                                                              },
                                                  }}
                                            >
                                                <Line options={options} data={data} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={4} >
                                            <Box
                                                  sx={{
                                                  width: "99%",
                                                  backgroundColor: '#ffffff',
                                                  boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                                                  '&:hover': {
                                                          backgroundColor: '#FBF1d5',
                                                          opacity: [0.9, 0.8, 0.7],
                                                              },
                                                  }}
                                            >
                                                <Doughnut data={dataCircle} />
                                            </Box>
                                        </Grid>
                                      </Grid> 
                                        {/** Section table */}
                                      <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                                          <Grid item xs={12} sm={12} md={12} lg={12} >
                                              <TableOrder />          
                                        </Grid>       
                                      </Grid>
                                      <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                                          <Grid item xs={12} sm={12} md={12} lg={6} >
                                              <UserActivity />          
                                        </Grid>   
                                        <Grid item xs={12} sm={12} md={12} lg={6} >
                                            <Complete />         
                                        </Grid>     
                                      </Grid>
                                      <FooterDashBoard />    
                                    </Grid>
                                </Stack>
                            </Grid>
                      </Grid>
                    </Fragment>
            </ThemeProvider>
     )
}

export default Home