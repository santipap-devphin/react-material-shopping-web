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
import { Line } from 'react-chartjs-2';
import {Typography, Grid , Box , Stack , TextField , Button , InputLabel , MenuItem , FormControl , Select}  from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DataDate from '../../data/dates.json'
const ChartReport = () => {

    const [days , setDays] = useState([]);

    const [monthActive , setMonthActive] = useState('มกราคม');

    const [month , setMonth] = useState(DataDate);

    const [exanData , setExamData] = useState([65, 59, 80, 81, 56 , 100 , 50 , 56 ,80 , 98 , 120 , 55 , 0 , 0 , 0 , 0 , 60 , 58 , 98 , 88 , 120 , 54 , 10 , 50 , 78 ,20 , 65 , 110 , 0 , 0  , 0]);

    const [reLoad , setReload] = useState(false);

    const [selectMonth, setSelectMonth] = useState(monthActive);

    var newMonth = [];


    const countdate = (leh) => {

        var datas = [];

        for(var i = 1; i <= parseInt(leh); i++){

                datas.push(i.toString())
                

        }

        //console.log(datas);
        return datas;

    }

    useEffect(() => {

        newMonth = [];

        for(var i = 0; i < month.length; i++){

            newMonth.push(month[i].namemonth);
            
            
        }
        setMonthActive(newMonth);

        setReload(true)
        
    },[])

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
    const [options , setOptions] = useState({
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
          },
        },
      });
      
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
    
    const [data , setData] = useState({
        labels:countdate(DataDate[0].daylength),
        datasets: [
          {
            label: "",
            data: exanData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            
          },
          /*{
            label: 'รายจ่าย',
            data:  [10, 20, 30, 40, 50 , 60 ,70 , 80 , 90 , 100 , 110 , 120],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },*/
        ],
      });
      
      const handleChange = (event) => {
            setReload(false);
            console.log(data)

            const filterMonth = month.find((list) => list.namemonth === event.target.value);

            const reNewDay = countdate(filterMonth.daylength);
            const reNewData = exanData.slice(0 , parseInt(filterMonth.daylength)).map((vals) => {
                 return vals;
            })
            options.plugins.title.text = "เดือน " +event.target.value;
            //Object.entries(data).forEach(([key, value]) => console.log(`${key}: ${value}`)); // "foo: bar", "baz: 
            const filterData = data.datasets.map((value) => {

                value.label = event.target.value;
                //console.log(value.label)
                return value;

            });
            data.labels = reNewDay;
            //data.datasets[0].label = "test";
            data.datasets[0].data = reNewData;

           
            console.log(filterData);

            //console.log(reNew)
            //setData({...data.labels , reNewDay})
            //setData({...data.datasets[0].data , reNewData})
            setSelectMonth(event.target.value);
            setReload(true);
      };
      const [value, setValue] = useState(0);
      const handleChangeVal = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };
 
    
  return (<><Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                                  <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <Typography variant='h5' sx={{color:"#000"}}>ยอดขายรายเดือน</Typography>   
                                    </Grid>
                                   
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <FormControl variant="filled" size="small" fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">เดือน</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={selectMonth}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                month.length > 0 ? 
                                                month.map((val , index) => {

                                                        return (<MenuItem key={index} value={val.namemonth}>{val.namemonth}</MenuItem>);

                                                })
                                                : setSelectMonth('มกราคม')
                                            }
                                           
                                         
                                            </Select>
                                    </FormControl>
                                    </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={2} >
                                        <Button variant="contained"  sx={{width:195,height:48}}><DownloadForOfflineIcon /> Download CSV</Button>
                                </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={12} >
                                      <Box
                                            sx={{
                                            width: "99%",
                                            backgroundColor: '#ffffff',
                                            boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                                          
                                            }}
                                       >
                                           {
                                               reLoad ? <Line options={options} data={data} /> : null
                                           }
                                          
                                      </Box>
                                  </Grid>
        </Grid>  
            <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                <Grid item xs={12} sm={12} md={12} lg={3} >
                        <Typography variant='h5'>ยอดขาย เดือน {selectMonth}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} >
                        <Typography variant='h5'>5000 บาท</Typography>
                </Grid>
            </Grid>
        </>                        
                                  
  )
}

export default ChartReport