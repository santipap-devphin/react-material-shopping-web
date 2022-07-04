import React , {useState , useEffect , useContext } from 'react';
import {Grid , Stack , Box , Typography ,Container , TextField , IconButton  
      , InputAdornment , Divider , FormControl ,MenuItem , Select ,InputLabel, FormControlLabel , Checkbox , FormGroup , Slider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import GridOnIcon from '@mui/icons-material/GridOn';
import ProductListFirstRow from '../../component/Product/ProductListFirstRow';
import ProductThreeRow from '../../component/Product/ProductThreeRow';
import DataContext from '../../context/DataContext';
import Pagination from '@mui/material/Pagination';


const ShopList = () => {

    const [listPrice, setListPrice] = useState('');

    const {reData} = useContext(DataContext);

    const [loadData , setLoadData] = useState([]);

    const [value, setValue] = useState([20, 37]);

    const [dataSuccess , setDataSuccess] = useState(false);

    const [gridRow , setGridRow] = useState(true);

    const pages = Math.ceil(reData.length / 10);

    const handleChangeSpin = (event, newValue) => {
        setValue(newValue);
      };

    const handleChange = (event) => {
        setListPrice(event.target.value);
    };

    function valuetext(value) {
        //console.log('event');
        return `${value}`;
    }

    

    useEffect(()=> {

        //console.log("loadfirst")

      const dataPerpage = reData.map((product , indexs) => {

            var newdata = indexs+1;
            let pagee = Math.ceil(newdata / 10)

             //console.log(pagee)
             product["page"] = pagee;
             
            //product[indexs].push(pagee)

            return product;

     })

     setLoadData(dataPerpage)
     setDataSuccess(true)


    },[reData])

    const changePage = (event, value) => {

            
             setDataSuccess(false);

             const dataPerpage = reData.filter((items) => items.page === value)
             console.log(dataPerpage)
             setLoadData(dataPerpage)
             setDataSuccess(true)
     }
    const clkPage = () => {

        
        window.scrollTo({top:10 , behavior: 'smooth'}) 
        
        console.log("clk page")

    }
    const rowGridThree = () => {

        console.log('rowGridThree')
        setGridRow(false);

    }

    const rowGridone = () => {

        console.log('rowGridone')
        setGridRow(true);
        
    }

   return (
       <Box sx={{mt:5}}>
           <Container>
           <Grid container spacing={3}>
                 <Grid item xs={12} md={3} sx={{display: { xs: 'none', md: 'flex' }}}>
                       <Stack sx={{p:2  , height:"550px" ,backgroundColor:"#ffffff", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , color:"#000"}} spacing={1}>
                           
                            <TextField
                                    label="ค้นหาสินค้า"
                                    id="searchshop"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                                    }}
                                    variant="outlined"
                                    size="small"
                                    />
                             <Typography variant='p'>ราคา</Typography>
                             <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={value}
                                    onChange={handleChangeSpin}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                             <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                             <TextField label="ราคาต่ำสุด" color="primary" size="small" value={value[0]} />
                             <TextField label="ราคาสูงสุด" color="primary" size="small" value={value[1]} />
                          
                           
                            </Stack>
                            <Typography variant='p'>ประเภทสินค้า</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                <FormControlLabel control={<Checkbox  />} label="Label" />
                                <FormControlLabel control={<Checkbox  />} label="Label" />
                                <FormControlLabel control={<Checkbox  />} label="Label" />
                               
                            </FormGroup>
                            <Typography variant='p'>ชนิดสินค้า</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                <FormControlLabel control={<Checkbox  />} label="Label" />
                                <FormControlLabel control={<Checkbox  />} label="Label" />
                                <FormControlLabel control={<Checkbox  />} label="Label" />
                             </FormGroup>
                             
                       </Stack>
                       
                 </Grid>
                 <Grid item xs={12} md={9}>
                        <Stack sx={{p:2 , color:"#000"}} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 4, md: 12 }}>
                            <Box sx={{ minWidth: 250 }}>
                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{m:-1 , color:"#000"}}>ค้นหาจาก</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={listPrice}
                                        label="ค้นหาจาก"
                                        onChange={handleChange}
                                        size="small"
                                        >
                                        <MenuItem value={10}>ราคา มาก ไป น้อย</MenuItem>
                                        <MenuItem value={20}>ราคา น้อย ไป มาก</MenuItem>
                                        
                                        </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 250 }}>
                                <Typography variant='h6'>Showing 10 of {reData.length} result</Typography>
                            </Box>
                             <Box sx={{ minWidth: 50 }}>
                                <IconButton onClick={rowGridThree} >
                                    <GridOnIcon sx={{color:"#000"}} />
                                </IconButton>
                                <IconButton onClick={rowGridone} >
                                    <SplitscreenIcon sx={{color:"#000"}} />
                                </IconButton>
                             </Box>
                             
                        </Stack>
                        
                        {
                            dataSuccess ? 

                                    gridRow ?

                                    loadData.slice(0,10).map((lProduct , index) => {


                                        return (<ProductListFirstRow key={index} data={lProduct} />)


                                    })

                                    :
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{p:2}}>
                                    <Grid container spacing={2}>
                                        {
                                            loadData.slice(0,10).map((lProduct , index) => {


                                                return ( <ProductThreeRow data={lProduct} />)


                                            })
                                        }
                                    </Grid>   
                                    </Stack>
                                     
                                     

                           :"Loadding ......"
                           
                        }
                 <Stack spacing={2} justifyContent="center" alignItems="center" sx={{pt:3 , pb:5}}>
                        <Pagination count={pages} color="primary" onChange={changePage} onClick={clkPage} />
                </Stack>   
                 </Grid>

           </Grid>
           </Container>
           
       </Box>
  )
}

export default ShopList