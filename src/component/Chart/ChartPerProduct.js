import React , {useState , useEffect} from 'react';
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
import { Line , Doughnut } from 'react-chartjs-2';
import {Typography, Grid , Box , Stack , TextField , Button , InputLabel , MenuItem , FormControl , Select}  from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const ChartPerProduct = () => {

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
    const dataCircle = {
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
      const [listData , setListData] = useState('');
      const handleChange  = () => {


        
      }
  return (<Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                                  <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <Typography variant='h5' sx={{color:"#000"}}>ยอดขายต่อชิ้น</Typography>   
                                    </Grid>
                                   
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <FormControl variant="filled" size="small" fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">เดือน</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={listData}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                /*month.length > 0 ? 
                                                month.map((val , index) => {

                                                        return (<MenuItem key={index} value={val.namemonth}>{val.namemonth}</MenuItem>);

                                                })
                                                : setSelectMonth('มกราคม')*/
                                            }
                                           
                                         
                                            </Select>
                                    </FormControl>
                                    </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={2} >
                                        <Button variant="contained"  sx={{width:195,height:48}}><DownloadForOfflineIcon /> Download CSV</Button>
                                </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={4} >
                                      <Box
                                            sx={{
                                            width: "99%",
                                            backgroundColor: '#ffffff',
                                            boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                                          
                                            }}
                                       >
                                           
                                                <Doughnut data={dataCircle} />
                                           
                                          
                                      </Box>
                                  </Grid>
        </Grid>   
  )
}

export default ChartPerProduct